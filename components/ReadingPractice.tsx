import React, { useState, useMemo } from 'react';
import type { ReadingPassage } from '../types';
import PronunciationButton from './PronunciationButton';

interface ReadingPracticeProps {
  passageData: ReadingPassage;
  languageCode: string;
  onFinish: () => void;
  onNext: () => void;
}

const ReadingPractice: React.FC<ReadingPracticeProps> = ({ passageData, languageCode, onFinish, onNext }) => {
  const { title, passage, questions } = passageData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isAnswered = userAnswers[currentIndex] !== null;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const score = useMemo(() => {
    return userAnswers.filter((answer, index) => answer === questions[index].correct_answer).length;
  }, [userAnswers, questions]);

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (isFinished) {
    return (
      <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--color-text-accent)]">Reading Complete!</h2>
        <p className="text-lg text-[var(--color-text-primary)]">Your Score:</p>
        <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)]">
          {score} / {questions.length}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={onFinish} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors"> Start New Practice </button>
            <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"> Next Topic </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-accent)] mb-2">{title}</h2>
        <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg max-h-48 overflow-y-auto space-y-4">
          <div className="flex items-start gap-2">
            <PronunciationButton textToSpeak={passage} langCode={languageCode} />
            <p className="text-[var(--color-text-primary)] whitespace-pre-wrap leading-relaxed">{passage}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Question {currentIndex + 1} of {questions.length}</h3>
        </div>
         <div className="w-full bg-[var(--color-bg-tertiary)]/50 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
        <p className="font-semibold text-center text-[var(--color-text-primary)] bg-[var(--color-bg-primary)]/50 p-4 rounded-lg">{currentQuestion.question}</p>
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => {
             let buttonClass = 'bg-[var(--color-bg-secondary)]/50 border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]/70 hover:border-[var(--color-accent)]';
             if (isAnswered) {
                 if (option === currentQuestion.correct_answer) {
                     buttonClass = 'bg-green-500/50 border-green-400 text-white';
                 } else if (option === userAnswers[currentIndex]) {
                     buttonClass = 'bg-red-500/50 border-red-400 text-white';
                 }
             }
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`p-3 border rounded-lg text-left font-medium transition-colors duration-200 disabled:cursor-not-allowed ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 w-48 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish'}
          </button>
        </div>
      )}
    </section>
  );
};

export default ReadingPractice;