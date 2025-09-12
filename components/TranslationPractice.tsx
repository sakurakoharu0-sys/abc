import React, { useState, useMemo } from 'react';
import type { TranslationExercise } from '../types';
import PronunciationButton from './PronunciationButton';

interface TranslationPracticeProps {
  exercises: TranslationExercise[];
  targetLanguageName: string;
  targetLanguageCode: string;
  onFinish: () => void;
  onNext: () => void;
}

const TranslationPractice: React.FC<TranslationPracticeProps> = ({ exercises, targetLanguageName, targetLanguageCode, onFinish, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState<(boolean | null)[]>(Array(exercises.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  const currentExercise = exercises[currentIndex];
  const isChecked = results[currentIndex] !== null;

  const normalizeAnswer = (str: string) => {
    return str.trim().toLowerCase().replace(/[.,!?;:"]/g, '');
  };

  const handleCheck = () => {
    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(currentExercise.target_language_sentence);
    const newResults = [...results];
    newResults[currentIndex] = isCorrect;
    setResults(newResults);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
    } else {
      setIsFinished(true);
    }
  };

  const score = useMemo(() => results.filter(r => r === true).length, [results]);
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  if (isFinished) {
    return (
      <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--color-text-accent)]">Practice Complete!</h2>
        <p className="text-lg text-[var(--color-text-primary)]">Your Score:</p>
        <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)]">
          {score} / {exercises.length}
        </p>
        <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-[var(--color-bg-primary)]/50 rounded-lg">
          {exercises.map((ex, index) => (
            <div key={index} className={`p-2 rounded-md text-left text-sm ${results[index] ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
              <p className="text-[var(--color-text-secondary)]">{ex.myanmar_sentence}</p>
              <p className={results[index] ? 'text-green-300' : 'text-red-300'}>
                {results[index] ? '✓' : '✗'} {ex.target_language_sentence}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={onFinish} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors"> Start New Practice </button>
            <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"> Next Topic </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Translate the Sentence</h2>
        <div className="text-sm font-semibold bg-[var(--color-bg-primary)]/50 px-3 py-1 rounded-full border border-[var(--color-border)]">
          {currentIndex + 1} / {exercises.length}
        </div>
      </div>
      
      <div className="w-full bg-[var(--color-bg-tertiary)]/50 rounded-full h-2.5">
        <div className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
      </div>

      <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg space-y-3">
        <p className="text-[var(--color-text-secondary)] text-sm">From Burmese:</p>
        <div className="flex items-center gap-3">
            <PronunciationButton textToSpeak={currentExercise.myanmar_sentence} langCode="my" />
            <p className="text-lg font-semibold text-[var(--color-text-primary)]">{currentExercise.myanmar_sentence}</p>
        </div>
      </div>
      
      <div>
        <p className="text-[var(--color-text-secondary)] text-sm mb-2">Your translation in {targetLanguageName}:</p>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your translation here..."
          rows={3}
          disabled={isChecked}
          className="w-full bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors disabled:opacity-70"
        />
      </div>

      {isChecked && (
        <div className={`p-4 rounded-lg animate-fade-in ${results[currentIndex] ? 'bg-green-900/40 border-[var(--color-success)]' : 'bg-red-900/40 border-[var(--color-danger)]'} border`}>
          <h3 className={`text-lg font-bold ${results[currentIndex] ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
            {results[currentIndex] ? 'Correct!' : 'Not quite...'}
          </h3>
          <p className="text-[var(--color-text-primary)] mt-1">The correct answer is:</p>
          <div className="flex items-center gap-3 mt-1">
            <PronunciationButton textToSpeak={currentExercise.target_language_sentence} langCode={targetLanguageCode} />
            <p className="font-semibold text-white">{currentExercise.target_language_sentence}</p>
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={isChecked ? handleNext : handleCheck}
          disabled={!userAnswer.trim()}
          className="px-8 py-3 w-48 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform"
        >
          {isChecked ? (currentIndex < exercises.length - 1 ? 'Next →' : 'Finish') : 'Check Answer'}
        </button>
      </div>
    </section>
  );
};

export default TranslationPractice;