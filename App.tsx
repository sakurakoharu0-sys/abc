import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { LANGUAGES, LEVELS, TOPICS, THEMES, GRAMMAR_TOPICS, JAPANESE_GRAMMAR_TOPICS, CHINESE_GRAMMAR_TOPICS, THAI_GRAMMAR_TOPICS, TRANSLATION_TOPICS, READING_TOPICS, KNOWLEDGE_TOPICS } from './constants';
import type { Language, Level, Topic, Theme, WritingPrompt, WritingFeedback, TranslationExercise, VocabularyItem, GrammarRule, GrammarExercise, ReadingPassage, ListeningExercise, Lesson, LayoutMode, PracticeMode, KnowledgeArticle } from './types';
import { generateWritingPrompt, getWritingFeedback, generateTranslationExercises, generateVocabularyList, generateGrammarRuleAndExercises, generateReadingPassage, generateListeningExercise, generateLesson, generateKnowledgeArticle } from './services/geminiService';

import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import FeedbackCard from './components/FeedbackCard';
import TranslationPractice from './components/TranslationPractice';
import VocabularyPractice from './components/VocabularyPractice';
import GrammarPractice from './components/GrammarPractice';
import ReadingPractice from './components/ReadingPractice';
import ListeningPractice from './components/ListeningPractice';
import SpeakingPractice from './components/SpeakingPractice';
import ChatPractice from './components/ChatPractice';
import MyList from './components/MyList';
import IntroScreen from './components/IntroScreen';
import LessonPractice from './components/LessonPractice';
import Settings from './components/Settings';
import Notepad from './components/Notepad';
import KnowledgeMode from './components/KnowledgeMode';
import SakuraPetals from './components/SakuraPetals';


type AppState = 'intro' | 'setup' | 'practice';
type SetupStep = 'mode' | 'language' | 'level' | 'topic';
type ThemeId = typeof THEMES[number]['id'];

const MODES: { id: PracticeMode, name: string, emoji: string }[] = [
    { id: 'lessons', name: 'Lessons', emoji: '🧑‍🏫' },
    { id: 'writing', name: 'Writing', emoji: '✍️' },
    { id: 'translation', name: 'Translation', emoji: '↔️' },
    { id: 'vocabulary', name: 'Vocabulary', emoji: '📚' },
    { id: 'grammar', name: 'Grammar', emoji: '🧐' },
    { id: 'reading', name: 'Reading', emoji: '📖' },
    { id: 'listening', name: 'Listening', emoji: '🎧' },
    { id: 'speaking', name: 'Speaking', emoji: '🎙️' },
    { id: 'chat', name: 'Chat', emoji: '💬' },
    { id: 'knowledge', name: 'Knowledge', emoji: '💡' },
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('intro');
  const [setupStep, setSetupStep] = useState<SetupStep>('mode');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('lessons');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(LANGUAGES[0]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(LEVELS[0]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [customTopic, setCustomTopic] = useState<string>('');
  const [topicSearch, setTopicSearch] = useState('');
  
  // State for all practice modes
  const [writingPrompt, setWritingPrompt] = useState<WritingPrompt | null>(null);
  const [userText, setUserText] = useState<string>('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [translationExercises, setTranslationExercises] = useState<TranslationExercise[]>([]);
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>([]);
  const [grammarData, setGrammarData] = useState<{ rule: GrammarRule; exercises: GrammarExercise[] } | null>(null);
  const [readingPassage, setReadingPassage] = useState<ReadingPassage | null>(null);
  const [listeningExercise, setListeningExercise] = useState<ListeningExercise | null>(null);
  const [speakingExercises, setSpeakingExercises] = useState<VocabularyItem[]>([]);
  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [knowledgeArticle, setKnowledgeArticle] = useState<KnowledgeArticle | null>(null);
  const [customKnowledgeLanguage, setCustomKnowledgeLanguage] = useState('');

  // State for saved items
  const [savedVocabulary, setSavedVocabulary] = useState<VocabularyItem[]>([]);
  const [savedGrammar, setSavedGrammar] = useState<GrammarRule[]>([]);
  
  // Modals and settings state
  const [isMyListOpen, setIsMyListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [notes, setNotes] = useState<string>('');
  
  // Settings
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('sakura');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('auto');
  const [showPetals, setShowPetals] = useState(true);
  const [itemCount, setItemCount] = useState(10);


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRequestingNext, setIsRequestingNext] = useState(false);
  
  // Load settings, lists, and session from localStorage
  useEffect(() => {
    // Load Theme
    const savedTheme = localStorage.getItem('lingopad-theme') as ThemeId | null;
    const themeToSet = savedTheme && THEMES.some(t => t.id === savedTheme) ? savedTheme : 'sakura';
    setCurrentTheme(themeToSet);
    document.body.setAttribute('data-theme', themeToSet);
    
    // Load Layout
    const savedLayout = localStorage.getItem('lingopad-layout') as LayoutMode | null;
    if (savedLayout) setLayoutMode(savedLayout);
    
    // Load Petal Setting
    const savedPetals = localStorage.getItem('lingopad-petals');
    if (savedPetals !== null) setShowPetals(JSON.parse(savedPetals));
    
    // Load Item Count
    const savedItemCount = localStorage.getItem('lingopad-itemCount');
    if (savedItemCount !== null) setItemCount(parseInt(savedItemCount, 10));

    // Load Notes
    const savedNotes = localStorage.getItem('lingopad-notes');
    if (savedNotes) setNotes(savedNotes);

    // Load Saved Lists
    const savedVocab = localStorage.getItem('lingopad-vocab');
    if (savedVocab) setSavedVocabulary(JSON.parse(savedVocab));
    const savedGrammarRules = localStorage.getItem('lingopad-grammar');
    if (savedGrammarRules) setSavedGrammar(JSON.parse(savedGrammarRules));

    // Load Session
    const savedSessionRaw = localStorage.getItem('lingopad-session');
    if (savedSessionRaw) {
        try {
            const savedSession = JSON.parse(savedSessionRaw);
            if (savedSession.appState === 'practice') {
                setPracticeMode(savedSession.practiceMode);
                setSelectedLanguage(savedSession.selectedLanguage);
                setSelectedLevel(savedSession.selectedLevel);
                setSelectedTopic(savedSession.selectedTopic);
                setCustomTopic(savedSession.customTopic);
                setItemCount(savedSession.itemCount || 10);
                setWritingPrompt(savedSession.writingPrompt);
                setUserText(savedSession.userText);
                setFeedback(savedSession.feedback);
                setTranslationExercises(savedSession.translationExercises);
                setVocabularyList(savedSession.vocabularyList);
                setGrammarData(savedSession.grammarData);
                setReadingPassage(savedSession.readingPassage);
                setListeningExercise(savedSession.listeningExercise);
                setSpeakingExercises(savedSession.speakingExercises);
                setLessonData(savedSession.lessonData);
                setKnowledgeArticle(savedSession.knowledgeArticle);
                setCustomKnowledgeLanguage(savedSession.customKnowledgeLanguage);
                setAppState('practice');
            }
        } catch (e) {
            console.error("Failed to parse saved session:", e);
            localStorage.removeItem('lingopad-session');
        }
    }
  }, []);
  
  // Effect to handle dynamic layout
  useEffect(() => {
    const handleResize = () => {
      const mode = layoutMode === 'auto'
        ? (window.innerWidth < 768 || (window.innerWidth < 1024 && window.innerHeight > window.innerWidth)) ? 'compact' : 'comfortable'
        : layoutMode;
      document.body.dataset.layoutMode = mode;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layoutMode]);


  const handleThemeChange = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('lingopad-theme', themeId);
    document.body.setAttribute('data-theme', themeId);
  }
  
  const handleLayoutModeChange = (mode: LayoutMode) => {
      setLayoutMode(mode);
      localStorage.setItem('lingopad-layout', mode);
  }

  const handleShowPetalsChange = (show: boolean) => {
    setShowPetals(show);
    localStorage.setItem('lingopad-petals', JSON.stringify(show));
  };

  const handleItemCountChange = (count: number) => {
    setItemCount(count);
    localStorage.setItem('lingopad-itemCount', String(count));
  };
  
  const handleNotesChange = (newNotes: string) => {
      setNotes(newNotes);
      localStorage.setItem('lingopad-notes', newNotes);
  }
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all saved vocabulary and grammar rules? This action cannot be undone.')) {
        setSavedVocabulary([]);
        setSavedGrammar([]);
        localStorage.removeItem('lingopad-vocab');
        localStorage.removeItem('lingopad-grammar');
    }
  };

  // --- Save/Remove List Functions ---
  const handleSaveVocabulary = (itemToSave: VocabularyItem) => {
    setSavedVocabulary(prev => {
      if (prev.some(item => item.word_target_language === itemToSave.word_target_language)) {
        return prev; // Already exists
      }
      const newList = [...prev, itemToSave];
      localStorage.setItem('lingopad-vocab', JSON.stringify(newList));
      return newList;
    });
  };

  const handleRemoveVocabulary = (word: string) => {
    setSavedVocabulary(prev => {
        const newList = prev.filter(item => item.word_target_language !== word);
        localStorage.setItem('lingopad-vocab', JSON.stringify(newList));
        return newList;
    });
  };

  const handleSaveGrammar = (ruleToSave: GrammarRule) => {
      setSavedGrammar(prev => {
          if (prev.some(rule => rule.rule_name === ruleToSave.rule_name)) {
              return prev; // Already exists
          }
          const newList = [...prev, ruleToSave];
          localStorage.setItem('lingopad-grammar', JSON.stringify(newList));
          return newList;
      });
  };

  const handleRemoveGrammar = (ruleName: string) => {
    setSavedGrammar(prev => {
        const newList = prev.filter(rule => rule.rule_name !== ruleName);
        localStorage.setItem('lingopad-grammar', JSON.stringify(newList));
        return newList;
    });
  };


  const resetStateForNewPractice = () => {
    setError(null);
    setWritingPrompt(null);
    setFeedback(null);
    setUserText('');
    setTranslationExercises([]);
    setVocabularyList([]);
    setGrammarData(null);
    setReadingPassage(null);
    setListeningExercise(null);
    setSpeakingExercises([]);
    setLessonData(null);
    setKnowledgeArticle(null);
  }
  
  const resetSetup = () => {
      setSetupStep('mode');
      setSelectedTopic(null);
      setCustomTopic('');
      setTopicSearch('');
      setAppState('setup');
      setCustomKnowledgeLanguage('');
      resetStateForNewPractice();
      localStorage.removeItem('lingopad-session');
  }

  const handleGoBack = () => {
      switch (setupStep) {
          case 'topic':
              if (practiceMode === 'knowledge') {
                  setSetupStep('language');
              } else {
                  setSetupStep('level');
              }
              break;
          case 'level':
              setSetupStep('language');
              break;
          case 'language':
              setSetupStep('mode');
              break;
          default:
              break;
      }
  }

  const handleModeChange = (mode: PracticeMode) => {
    setPracticeMode(mode);
    setSetupStep('language');
  }

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setSetupStep('level');
  };

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setSetupStep('topic');
  }

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCustomTopic(''); // Clear custom topic if a preset is chosen
  }

  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTopic(e.target.value);
    setSelectedTopic(null); // Clear preset topic if custom is being typed
  }
  
  const activeTopicName = useMemo(() => {
      if (practiceMode === 'grammar') {
          return selectedTopic?.name.en || '';
      }
      return customTopic.trim() || selectedTopic?.name.en || '';
  }, [customTopic, selectedTopic, practiceMode]);

  const startPractice = useCallback(async (topicOverride?: Topic) => {
    const finalTopic = topicOverride || selectedTopic;
    const finalTopicName = customTopic.trim() || finalTopic?.name.en || '';
    
    if ((practiceMode !== 'knowledge' && (!selectedLanguage || !selectedLevel)) || !finalTopicName) return;
    if (practiceMode === 'knowledge' && !customKnowledgeLanguage.trim()) return;

    if (practiceMode === 'chat') {
      setAppState('practice');
      return;
    }

    setIsLoading(true);
    resetStateForNewPractice();
    
    let practiceData: any = {};

    try {
      let result;
      switch (practiceMode) {
        case 'knowledge':
          result = await generateKnowledgeArticle(customKnowledgeLanguage, finalTopicName);
          if (result) { setKnowledgeArticle(result); practiceData.knowledgeArticle = result; }
          break;
        case 'writing':
          result = await generateWritingPrompt(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName);
          if (result) { setWritingPrompt(result); practiceData.writingPrompt = result; }
          break;
        case 'translation':
          result = await generateTranslationExercises(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName, itemCount);
          if (result) { setTranslationExercises(result); practiceData.translationExercises = result; }
          break;
        case 'vocabulary':
          result = await generateVocabularyList(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName, itemCount);
          if (result) { setVocabularyList(result); practiceData.vocabularyList = result; }
          break;
        case 'grammar':
            result = await generateGrammarRuleAndExercises(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName, itemCount);
            if (result) { setGrammarData(result); practiceData.grammarData = result; }
            break;
        case 'reading':
            result = await generateReadingPassage(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName);
            if (result) { setReadingPassage(result); practiceData.readingPassage = result; }
            break;
        case 'listening':
            result = await generateListeningExercise(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName);
            if(result) { setListeningExercise(result); practiceData.listeningExercise = result; }
            break;
        case 'speaking':
            result = await generateVocabularyList(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName, itemCount);
            if(result) { setSpeakingExercises(result); practiceData.speakingExercises = result; }
            break;
        case 'lessons':
            result = await generateLesson(selectedLanguage!.name, selectedLevel!.name.en, finalTopicName);
            if(result) { setLessonData(result); practiceData.lessonData = result; }
            break;
      }
      if (!result || (Array.isArray(result) && result.length === 0)) {
        setError(`Could not generate ${practiceMode} content. Please try again.`);
        setSetupStep('topic');
      } else {
        setAppState('practice');
        // Save session
        const sessionData = {
            appState: 'practice', practiceMode, selectedLanguage, selectedLevel,
            selectedTopic: finalTopic, customTopic, itemCount, customKnowledgeLanguage,
            userText: '', feedback: null,
            ...practiceData
        };
        localStorage.setItem('lingopad-session', JSON.stringify(sessionData));
      }
    } catch (e) {
      setError(`An unexpected error occurred while generating ${practiceMode} content.`);
      setSetupStep('topic');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLanguage, selectedLevel, selectedTopic, customTopic, practiceMode, itemCount, customKnowledgeLanguage]);

  useEffect(() => {
    if (isRequestingNext) {
      startPractice();
      setIsRequestingNext(false);
    }
  }, [isRequestingNext, startPractice]);


  const handleNextPractice = () => {
    if (practiceMode !== 'knowledge' && !selectedLevel) return;
    
    const topicList = practiceMode === 'grammar' ? filteredGrammarTopics : filteredTopics;
    if (topicList.length > 0) {
        let newTopic = topicList[Math.floor(Math.random() * topicList.length)];
        // Simple de-dupe
        if (topicList.length > 1 && newTopic.id === selectedTopic?.id) {
           newTopic = topicList[Math.floor(Math.random() * topicList.length)];
        }
        
        startPractice(newTopic);
    }
  };

  const handleGetFeedback = useCallback(async () => {
    if (!writingPrompt || !userText.trim()) return;
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const result = await getWritingFeedback(selectedLanguage!.name, writingPrompt.prompt_target, userText);
      if (result) {
        setFeedback(result);
        const session = JSON.parse(localStorage.getItem('lingopad-session') || '{}');
        session.feedback = result;
        localStorage.setItem('lingopad-session', JSON.stringify(session));
      }
      else setError('Could not get feedback. Please try again.');
    } catch (e) {
      setError('An unexpected error occurred while getting feedback.');
    } finally {
      setIsLoading(false);
    }
  }, [writingPrompt, userText, selectedLanguage]);

  const handleUserTextChange = (text: string) => {
      setUserText(text);
      try {
        const session = JSON.parse(localStorage.getItem('lingopad-session') || '{}');
        if(session.appState === 'practice') {
            session.userText = text;
            localStorage.setItem('lingopad-session', JSON.stringify(session));
        }
      } catch (e) {
          console.error("Could not update userText in session", e);
      }
  }

  const activeTopicList = useMemo(() => {
    if (practiceMode === 'knowledge') {
        return KNOWLEDGE_TOPICS;
    }
    if (practiceMode === 'translation') {
        return TRANSLATION_TOPICS;
    }
    if (practiceMode === 'reading') {
        return READING_TOPICS;
    }
    return TOPICS;
  }, [practiceMode]);

  const filteredTopics = useMemo(() => {
    return activeTopicList.filter(topic => 
      (practiceMode === 'knowledge' || !topic.levels || topic.levels.includes(selectedLevel?.id ?? '')) &&
      (topic.name.en.toLowerCase().includes(topicSearch.toLowerCase()) ||
       topic.name.native.toLowerCase().includes(topicSearch.toLowerCase()))
    );
  }, [topicSearch, selectedLevel, activeTopicList, practiceMode]);

  const activeGrammarList = useMemo(() => {
      if (selectedLanguage?.code === 'ja') return JAPANESE_GRAMMAR_TOPICS;
      if (selectedLanguage?.code === 'zh') return CHINESE_GRAMMAR_TOPICS;
      if (selectedLanguage?.code === 'th') return THAI_GRAMMAR_TOPICS;
      return GRAMMAR_TOPICS;
  }, [selectedLanguage]);

  const filteredGrammarTopics = useMemo(() => {
    return activeGrammarList.filter(topic => 
      (topic.levels?.includes(selectedLevel?.id ?? '')) &&
      (topic.name.en.toLowerCase().includes(topicSearch.toLowerCase()) ||
       topic.name.native.toLowerCase().includes(topicSearch.toLowerCase()))
    );
  }, [topicSearch, selectedLevel, activeGrammarList]);

  const renderCurrentPractice = () => {
    if (isLoading && appState === 'practice' && !feedback) return <LoadingSpinner />;

    switch (practiceMode) {
      case 'writing':
        return writingPrompt && (
          <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Your Writing Prompt</h2>
            <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg space-y-3">
                <p className="text-lg font-semibold text-[var(--color-accent-secondary)]">{writingPrompt.prompt_target}</p>
                <p className="text-sm text-[var(--color-text-primary)]"><span className="font-semibold text-[var(--color-text-secondary)]">[English]:</span> {writingPrompt.prompt_english}</p>
                <p className="text-sm text-[var(--color-text-primary)]"><span className="font-semibold text-[var(--color-text-secondary)]">[မြန်မာ]:</span> {writingPrompt.prompt_myanmar}</p>
            </div>
            <textarea value={userText} onChange={(e) => handleUserTextChange(e.target.value)} placeholder="Start writing here..." rows={8} className="w-full bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"/>
            <div className="text-center"> <button onClick={handleGetFeedback} disabled={isLoading || !userText.trim()} className="px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform"> {isLoading ? 'Analyzing...' : 'Get Feedback'} </button> </div>
          </section>
        );
      case 'translation':
        return translationExercises.length > 0 && <TranslationPractice exercises={translationExercises} targetLanguageName={selectedLanguage!.name} targetLanguageCode={selectedLanguage!.code} onFinish={resetSetup} onNext={handleNextPractice} />;
      case 'vocabulary':
        return vocabularyList.length > 0 && <VocabularyPractice vocabularyList={vocabularyList} languageCode={selectedLanguage!.code} onFinish={resetSetup} onNext={handleNextPractice} onSaveItem={handleSaveVocabulary} savedVocabulary={savedVocabulary} />;
      case 'grammar':
        return grammarData && <GrammarPractice grammarData={grammarData} languageCode={selectedLanguage!.code} onFinish={resetSetup} onNext={handleNextPractice} onSaveRule={handleSaveGrammar} savedGrammarRules={savedGrammar} />;
      case 'reading':
        return readingPassage && <ReadingPractice passageData={readingPassage} languageCode={selectedLanguage!.code} onFinish={resetSetup} onNext={handleNextPractice} />;
      case 'listening':
        return listeningExercise && <ListeningPractice exercise={listeningExercise} languageCode={selectedLanguage!.code} onFinish={resetSetup} onNext={handleNextPractice} />;
      case 'speaking':
        return speakingExercises.length > 0 && <SpeakingPractice exercises={speakingExercises} languageCode={selectedLanguage!.code} onFinish={resetSetup} onNext={handleNextPractice} />;
      case 'chat':
        return <ChatPractice languageName={selectedLanguage!.name} levelName={selectedLevel!.name.en} topic={activeTopicName} onFinish={resetSetup} />;
      case 'lessons':
        return lessonData && <LessonPractice lesson={lessonData} languageCode={selectedLanguage!.code} onFinish={resetSetup} onNext={handleNextPractice} />;
      case 'knowledge':
        return knowledgeArticle && <KnowledgeMode article={knowledgeArticle} onFinish={resetSetup} onNext={handleNextPractice} />;
      default:
        return null;
    }
  }

  const SetupStepTitle: React.FC<{ title: string; onBack?: () => void }> = ({ title, onBack }) => (
    <div className="flex items-center gap-4 mb-3">
        {onBack && (
            <button onClick={onBack} title="Go Back" className="w-8 h-8 flex items-center justify-center bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-full transition-colors" aria-label="Go to previous step">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
        )}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>
    </div>
  );

  if (appState === 'intro') {
      return <IntroScreen onStart={() => setAppState('setup')} />;
  }

  return (
    <div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] min-h-screen">
      {showPetals && <SakuraPetals />}
      <div className="absolute inset-0 bg-grid-slate-800/20 [mask-image:linear-gradient(to_bottom,white_5%,transparent_95%)]" style={{ backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[var(--color-accent)]/10 blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[var(--color-accent-secondary)]/10 blur-[150px]"></div>

      <div className="relative isolate">
        <Header 
            onHomeClick={resetSetup} 
            onMyListClick={() => setIsMyListOpen(true)}
            onNotepadClick={() => setIsNotepadOpen(true)}
            onSettingsClick={() => setIsSettingsOpen(true)}
        />

        {isMyListOpen && (
            <MyList 
                savedVocabulary={savedVocabulary}
                savedGrammarRules={savedGrammar}
                onRemoveVocabulary={handleRemoveVocabulary}
                onRemoveGrammar={handleRemoveGrammar}
                onClose={() => setIsMyListOpen(false)}
                languageCode={selectedLanguage?.code || 'en'}
            />
        )}
        
        {isSettingsOpen && (
            <Settings
                currentTheme={currentTheme}
                onThemeChange={handleThemeChange}
                currentLayoutMode={layoutMode}
                onLayoutModeChange={handleLayoutModeChange}
                showPetals={showPetals}
                onShowPetalsChange={handleShowPetalsChange}
                defaultItemCount={itemCount}
                onDefaultItemCountChange={handleItemCountChange}
                onClearData={handleClearData}
                onClose={() => setIsSettingsOpen(false)}
            />
        )}
        
        {isNotepadOpen && (
            <Notepad
                notes={notes}
                onNotesChange={handleNotesChange}
                onClose={() => setIsNotepadOpen(false)}
            />
        )}

        <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
          {appState === 'setup' ? (
            <div className="space-y-8">
              {setupStep === 'mode' && (
                <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-4 animate-slide-in-right">
                    <SetupStepTitle title="Step 1: Choose a Mode" />
                    <div className="selection-grid">
                        {MODES.map(mode => (
                            <button key={mode.id} onClick={() => handleModeChange(mode.id)} className={`p-3 rounded-lg transition-all duration-200 font-semibold flex flex-col items-center justify-center gap-2 text-center border bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent)] hover:scale-105`}>
                              <span className="text-2xl">{mode.emoji}</span> <span>{mode.name}</span>
                            </button>
                        ))}
                    </div>
                </section>
              )}
              {setupStep === 'language' && (
                <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-4 animate-slide-in-right">
                  {practiceMode === 'knowledge' ? (
                    <>
                      <SetupStepTitle title="Step 2: Enter a Language" onBack={handleGoBack} />
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <input
                            type="text"
                            value={customKnowledgeLanguage}
                            onChange={(e) => setCustomKnowledgeLanguage(e.target.value)}
                            placeholder="e.g., Spanish, Japanese, Klingon..."
                            className="flex-grow w-full bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"
                        />
                        <button
                            onClick={() => setSetupStep('topic')}
                            disabled={!customKnowledgeLanguage.trim()}
                            className="px-8 py-3 w-full sm:w-auto bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform"
                        >
                            Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <SetupStepTitle title="Step 2: Choose a Language" onBack={handleGoBack} />
                       <div className="selection-grid-languages">
                          {LANGUAGES.map((lang) => (
                            <button key={lang.code} onClick={() => handleLanguageSelect(lang)} className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-all duration-200 bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent)] hover:scale-105`}>
                              <span className="text-2xl">{lang.flag}</span> <span className="text-sm font-medium mt-1 text-[var(--color-text-primary)]">{lang.nativeName}</span> <span className="text-xs text-[var(--color-text-secondary)]">{lang.name}</span>
                            </button>
                          ))}
                        </div>
                    </>
                  )}
                </section>
              )}
              {setupStep === 'level' && practiceMode !== 'knowledge' && (
                  <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-4 animate-slide-in-right">
                    <SetupStepTitle title="Step 3: Select Your Level" onBack={handleGoBack} />
                     <div className="selection-grid-levels">
                        {LEVELS.map((level) => (
                        <button key={level.id} onClick={() => handleLevelSelect(level)} className={`px-4 py-3 border rounded-lg flex items-center justify-center gap-3 transition-all duration-200 text-sm bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent)] hover:scale-105`}>
                            <span className="text-lg">{level.emoji}</span>
                            <div className="text-left"> <span className="font-bold">{level.cefr}</span> <span className="block text-xs">{level.name.my} / {level.name.en}</span> </div>
                        </button>
                        ))}
                    </div>
                  </section>
              )}
              {setupStep === 'topic' && (
                  <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-4 animate-slide-in-right">
                    <SetupStepTitle title="Step 3: Select a Topic" onBack={handleGoBack} />
                    {practiceMode === 'grammar' ? (
                        <>
                           <input type="text" value={topicSearch} onChange={(e) => setTopicSearch(e.target.value)} placeholder="🔎 Search for a grammar rule..." className="w-full bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"/>
                            <div className="flex flex-wrap gap-3 justify-center max-h-60 overflow-y-auto pr-2">
                                {filteredGrammarTopics.map((topic) => (
                                    <button key={topic.id} onClick={() => handleTopicSelect(topic)} className={`px-4 py-2 border rounded-full flex items-center gap-2 transition-all duration-200 text-sm ${selectedTopic?.id === topic.id ? 'bg-[var(--color-accent-secondary)] border-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold scale-105 shadow-lg' : 'bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent-secondary)]'}`}>
                                    <span>{topic.emoji}</span> <span>{topic.name.native} / {topic.name.en}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                             <div className="space-y-4">
                                <input type="text" value={topicSearch} onChange={(e) => setTopicSearch(e.target.value)} placeholder="🔎 Search for a topic..." className="w-full bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"/>
                                <input type="text" value={customTopic} onChange={handleCustomTopicChange} placeholder="✨ Or type your own custom topic..." className={`w-full bg-[var(--color-bg-primary)]/70 border rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors ${customTopic ? 'border-[var(--color-accent-secondary)]' : 'border-[var(--color-border)]'}`}/>
                             </div>
                            <div className="flex flex-wrap gap-3 justify-center max-h-60 overflow-y-auto pr-2">
                              {filteredTopics.map((topic) => (
                                <button key={topic.id} onClick={() => handleTopicSelect(topic)} className={`px-4 py-2 border rounded-full flex items-center gap-2 transition-all duration-200 text-sm ${selectedTopic?.id === topic.id ? 'bg-[var(--color-accent-secondary)] border-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold scale-105 shadow-lg' : 'bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent-secondary)]'}`}>
                                  <span>{topic.emoji}</span> <span>{topic.name.native} / {topic.name.en}</span>
                                </button>
                              ))}
                            </div>
                        </>
                    )}
                     {(practiceMode === 'vocabulary' || practiceMode === 'translation' || practiceMode === 'grammar' || practiceMode === 'speaking') && (
                        <div className="flex items-center justify-center gap-3 pt-2">
                          <label htmlFor="item-count" className="font-semibold text-[var(--color-text-secondary)]">Number of Items:</label>
                          <input 
                            type="number" 
                            id="item-count"
                            value={itemCount} 
                            onChange={e => setItemCount(Math.max(5, Math.min(25, parseInt(e.target.value) || 5)))} 
                            min="5" 
                            max="25"
                            className="w-20 bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-2 text-center font-bold focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"
                          />
                        </div>
                     )}
                     <div className="text-center pt-4">
                        <button onClick={() => startPractice()} disabled={isLoading || !activeTopicName} className="px-8 py-3 bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] text-white font-bold rounded-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform">
                        {isLoading ? "Generating..." : "Start Learning"}
                        </button>
                    </div>
                  </section>
              )}
            </div>
          ) : (
            <>
              {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}
              {renderCurrentPractice()}
              {feedback && <FeedbackCard feedback={feedback} languageCode={selectedLanguage?.code || 'en'}/>}
              {practiceMode === 'writing' && feedback && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button onClick={resetSetup} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors"> Start New Practice </button>
                      <button onClick={handleNextPractice} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"> Next Topic </button>
                  </div>
              )}
            </>
          )}
        </main>

        <footer className="text-center p-6 text-[var(--color-text-secondary)] text-sm space-y-4">
            <p>&copy; {new Date().getFullYear()} LingoPad AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;