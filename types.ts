export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Level {
  id: string;
  cefr: string;
  name: {
    en: string;
    my: string;
  };
  emoji: string;
}

export interface Topic {
  id:string;
  name: {
    en: string;
    native: string; // Changed from 'my' to 'native' for language neutrality
  };
  emoji: string;
  levels?: string[]; // e.g., ['a1', 'a2']
}

export interface Theme {
    id: string;
    name: string;
    emoji: string;
}

export interface WritingPrompt {
  prompt_target: string;
  prompt_myanmar: string;
  prompt_english: string;
}

export interface Correction {
  original: string;
  corrected: string;
  explanation: {
    myanmar: string;
    english: string;
  };
}

export interface WritingFeedback {
  score: number;
  overall_feedback: {
    myanmar: string;
    english: string;
  };
  corrections: Correction[];
  example_sentence: string;
}

export interface TranslationExercise {
  myanmar_sentence: string;
  target_language_sentence: string;
}

export interface VocabularyItem {
  word_target_language: string;
  pronunciation_guide: string;
  meaning_myanmar: string;
  example_sentence: string;
}

export interface GrammarRule {
  rule_name: string;
  explanation_myanmar: string;
  explanation_target_language: string;
  example_sentence: string;
  example_translation_myanmar: string;
}

export interface GrammarExercise {
  sentence_template: string; // e.g., "She ___ (to go) to the store."
  correct_answer: string;
  options: string[];
}

export interface ReadingPassage {
  title: string;
  passage: string;
  questions: {
    question: string;
    options: string[];
    correct_answer: string;
  }[];
}

export interface ListeningExercise {
  audio_text: string;
  difficulty_description: string;
}

export interface Lesson {
  title: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarRule;
  reading: ReadingPassage;
  writingPrompt: WritingPrompt;
}

export interface KnowledgeArticle {
  title: string;
  content: string;
  languageBcp47Code: string; // For text-to-speech
}

export type LayoutMode = 'auto' | 'compact' | 'comfortable';
export type PracticeMode = 'lessons' | 'writing' | 'translation' | 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'chat' | 'knowledge';
