import React, { useState, useMemo } from 'react';
import type { GrammarRule, GrammarExercise } from '../types';
import PronunciationButton from './PronunciationButton';

interface GrammarPracticeProps {
  grammarData: {
    rule: GrammarRule;
    exercises: GrammarExercise[];
  };
  languageCode: string;
  onFinish: () => void;
  onNext: () => void;
  onSaveRule: (rule: GrammarRule) => void;
  savedGrammarRules: GrammarRule[];
}

type PracticeStage = 'learn' | 'practice' | 'results';

const GrammarPractice: React.FC<GrammarPracticeProps> = ({ grammarData, languageCode, onFinish, onNext, onSaveRule, savedGrammarRules }) => {
  const { rule, exercises } = grammarData;
  const [stage, setStage] = useState<PracticeStage>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(exercises.length).fill(null));

  const isRuleSaved = savedGrammarRules.some(savedRule => savedRule.rule_name === rule.rule_name);
  
  const currentExercise = exercises[currentIndex];
  const isChecked = userAnswers[currentIndex] !== null;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStage('results');
    }
  };

  const score = useMemo(() => {
    return userAnswers.filter((answer, index) => answer === exercises[index].correct_answer).length;
  }, [userAnswers, exercises]);
  
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  if (stage === 'learn') {
    return (
      <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[var(--color-text-accent)]">New Grammar Rule</h2>
             <button
                onClick={() => onSaveRule(rule)}
                disabled={isRuleSaved}
                className="px-4 py-2 text-sm font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-white disabled:bg-[var(--color-accent-secondary)] disabled:text-black"
             >
                {isRuleSaved ? 'Saved' : 'Save Rule'}
            </button>
        </div>
        <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-[var(--color-accent-secondary)]">{rule.rule_name}</h3>
          <p className="text-[var(--color-text-primary)]">{rule.explanation_target_language}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">({rule.explanation_myanmar})</p>
          <div className="border-t border-[var(--color-border)] pt-3 space-y-2">
            <p className="text-sm font-semibold text-[var(--color-text-secondary)]">EXAMPLE:</p>
            <div className="flex items-center gap-2">
              <PronunciationButton textToSpeak={rule.example_sentence} langCode={languageCode} />
              <p className="text-[var(--color-text-primary)] italic">"{rule.example_sentence}"</p>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] italic">({rule.example_translation_myanmar})</p>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => setStage('practice')}
            className="px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Start Practice
          </button>
        </div>
      </section>
    );
  }

  if (stage === 'practice') {
    const isCorrect = userAnswers[currentIndex] === currentExercise.correct_answer;
    return (
       <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Grammar Practice</h2>
                <div className="text-sm font-semibold bg-[var(--color-bg-primary)]/50 px-3 py-1 rounded-full border border-[var(--color-border)]">
                    {currentIndex + 1} / {exercises.length}
                </div>
            </div>
            <div className="w-full bg-[var(--color-bg-tertiary)]/50 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
            <div className="bg-[var(--color-bg-primary)]/50 p-6 rounded-lg text-center">
                <p className="text-[var(--color-text-secondary)] text-sm mb-2">Fill in the blank:</p>
                <p className="text-xl font-semibold text-[var(--color-text-primary)]">
                    {currentExercise.sentence_template.replace('___', '_____')}
                </p>
            </div>
            <div className="practice-grid">
                {currentExercise.options.map(option => {
                    let buttonClass = 'bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent)]';
                    if (isChecked) {
                        if (option === currentExercise.correct_answer) {
                            buttonClass = 'bg-green-500/50 border-green-400 text-white';
                        } else if (option === userAnswers[currentIndex]) {
                            buttonClass = 'bg-red-500/50 border-red-400 text-white';
                        }
                    }
                    return (
                        <button key={option} onClick={() => handleAnswer(option)} disabled={isChecked} className={`p-3 border rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed ${buttonClass}`}>
                            {option}
                        </button>
                    )
                })}
            </div>
             {isChecked && (
                <div className="text-center">
                    <button onClick={handleNext} className="px-8 py-3 w-48 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                       {currentIndex < exercises.length - 1 ? 'Next →' : 'Finish'}
                    </button>
                </div>
            )}
       </section>
    );
  }

  if (stage === 'results') {
    return (
       <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 text-center space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-[var(--color-text-accent)]">Practice Complete!</h2>
            <p className="text-lg text-[var(--color-text-primary)]">Your Score:</p>
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)]">
                {score} / {exercises.length}
            </p>
             <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-[var(--color-bg-primary)]/50 rounded-lg">
                {exercises.map((ex, index) => {
                    const isCorrect = userAnswers[index] === ex.correct_answer;
                    return (
                         <div key={index} className={`p-2 rounded-md text-left text-sm ${isCorrect ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                            <p className="text-[var(--color-text-secondary)]">{ex.sentence_template.replace('___', `[${ex.correct_answer}]`)}</p>
                            {!isCorrect && <p className="text-red-300">Your answer: {userAnswers[index]}</p>}
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

export default GrammarPractice;