import React, { useState, useMemo, useEffect } from 'react';
import type { VocabularyItem } from '../types';
import PronunciationButton from './PronunciationButton';

interface VocabularyPracticeProps {
  vocabularyList: VocabularyItem[];
  languageCode: string;
  onFinish: () => void;
  onNext: () => void;
  onSaveItem: (item: VocabularyItem) => void;
  savedVocabulary: VocabularyItem[];
}

type PracticeStage = 'learn' | 'quiz' | 'results';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};


const VocabularyPractice: React.FC<VocabularyPracticeProps> = ({ vocabularyList, languageCode, onFinish, onNext, onSaveItem, savedVocabulary }) => {
  const [stage, setStage] = useState<PracticeStage>('learn');
  const [quizQuestions, setQuizQuestions] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const isSaved = (item: VocabularyItem) => savedVocabulary.some(savedItem => savedItem.word_target_language === item.word_target_language);

  useEffect(() => {
    if (stage === 'quiz') {
      const shuffled = shuffleArray(vocabularyList);
      setQuizQuestions(shuffled);
      setUserAnswers(Array(shuffled.length).fill(null));
      setCurrentIndex(0);
    }
  }, [stage, vocabularyList]);

  useEffect(() => {
    if (stage === 'quiz' && quizQuestions.length > 0) {
      const currentQuestion = quizQuestions[currentIndex];
      const correctAnswer = currentQuestion.word_target_language;
      
      const incorrectAnswers = vocabularyList
        .filter(item => item.word_target_language !== correctAnswer)
        .map(item => item.word_target_language);
        
      const shuffledIncorrect = shuffleArray(incorrectAnswers).slice(0, 3);
      
      setOptions(shuffleArray([correctAnswer, ...shuffledIncorrect]));
    }
  }, [stage, currentIndex, quizQuestions, vocabularyList]);


  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = answer;
    setUserAnswers(newAnswers);

    // Automatically move to the next question after a short delay
    setTimeout(() => {
      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setStage('results');
      }
    }, 1000);
  };

  const score = useMemo(() => {
    return userAnswers.reduce((correctCount, answer, index) => {
        if (index < quizQuestions.length && answer === quizQuestions[index].word_target_language) {
            return correctCount + 1;
        }
        return correctCount;
    }, 0)
  }, [userAnswers, quizQuestions]);
  
  const progress = ((currentIndex + 1) / (quizQuestions.length || 1)) * 100;


  if (stage === 'learn') {
    return (
      <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--color-text-accent)] text-center">Learn these words!</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {vocabularyList.map((item, index) => {
                const alreadySaved = isSaved(item);
                return (
                    <div key={index} className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--color-accent-secondary)]">
                        <div className="flex justify-between items-start">
                             <div className="flex items-center gap-3 mb-2">
                                <PronunciationButton textToSpeak={item.word_target_language} langCode={languageCode} />
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--color-accent-secondary)]">{item.word_target_language}</h3>
                                    <span className="text-[var(--color-text-secondary)] italic">({item.pronunciation_guide})</span>
                                </div>
                             </div>
                            <button
                                onClick={() => onSaveItem(item)}
                                disabled={alreadySaved}
                                className="px-3 py-1 text-sm font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-white disabled:bg-[var(--color-accent-secondary)] disabled:text-black"
                                >
                                {alreadySaved ? 'Saved' : 'Save'}
                            </button>
                        </div>
                        <p className="text-lg text-[var(--color-text-primary)] mb-2 ml-11">{item.meaning_myanmar}</p>
                        <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-2 mt-2">
                            <PronunciationButton textToSpeak={item.example_sentence} langCode={languageCode} />
                            <span>"{item.example_sentence}"</span>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="text-center">
             <button
                onClick={() => setStage('quiz')}
                className="px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
             >
                Start Quiz
             </button>
        </div>
      </section>
    );
  }

  if (stage === 'quiz' && quizQuestions.length > 0) {
    const currentQuestion = quizQuestions[currentIndex];
    const userAnswer = userAnswers[currentIndex];
    
    return (
       <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Vocabulary Quiz</h2>
                <div className="text-sm font-semibold bg-[var(--color-bg-primary)]/50 px-3 py-1 rounded-full border border-[var(--color-border)]">
                    {currentIndex + 1} / {quizQuestions.length}
                </div>
            </div>

            <div className="w-full bg-[var(--color-bg-tertiary)]/50 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>

            <div className="bg-[var(--color-bg-primary)]/50 p-6 rounded-lg text-center">
                <p className="text-[var(--color-text-secondary)] text-sm">What is the word for:</p>
                <p className="text-2xl font-bold text-[var(--color-accent-secondary)] mt-1">{currentQuestion.meaning_myanmar}</p>
            </div>
            
            <div className="practice-grid">
                {options.map(option => {
                    const isCorrect = option === currentQuestion.word_target_language;
                    let buttonClass = 'bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent)]';

                    if (userAnswer) {
                        if (isCorrect) {
                            buttonClass = 'bg-green-500/50 border-green-400 text-white';
                        } else if (userAnswer === option) {
                            buttonClass = 'bg-red-500/50 border-red-400 text-white';
                        }
                    }

                    return (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            disabled={!!userAnswer}
                            className={`p-4 border rounded-lg text-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed ${buttonClass}`}
                        >
                            {option}
                        </button>
                    )
                })}
            </div>
       </section>
    )
  }

  if (stage === 'results') {
    return (
        <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 text-center space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-[var(--color-text-accent)]">Quiz Complete!</h2>
            <p className="text-lg text-[var(--color-text-primary)]">Your Score:</p>
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)]">
                {score} / {quizQuestions.length}
            </p>
             <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-[var(--color-bg-primary)]/50 rounded-lg">
                {quizQuestions.map((q, index) => {
                    const isCorrect = userAnswers[index] === q.word_target_language;
                    return (
                         <div key={index} className={`p-2 rounded-md text-left text-sm ${isCorrect ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                            <p className="text-[var(--color-text-secondary)]">{q.meaning_myanmar}</p>
                            <p className={isCorrect ? 'text-green-300' : 'text-red-300'}>
                                {isCorrect ? '✓' : '✗'} Correct: {q.word_target_language}
                                {!isCorrect && <span className="line-through ml-2">{userAnswers[index]}</span>}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={onFinish} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors"> Start New Practice </button>
                <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"> Next Topic </button>
            </div>
        </div>
    )
  }

  return null;
};

export default VocabularyPractice;