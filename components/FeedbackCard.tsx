import React, { useState } from 'react';
import type { WritingFeedback } from '../types';
import PronunciationButton from './PronunciationButton';

interface FeedbackCardProps {
  feedback: WritingFeedback;
  languageCode: string;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  let strokeColor = 'var(--color-success)';
  if (score < 75) strokeColor = 'var(--color-warning)';
  if (score < 50) strokeColor = 'var(--color-danger)';

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-[var(--color-bg-tertiary)]"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={`transition-all duration-1000 ease-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={strokeColor}
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-[var(--color-text-primary)]">{score}</span>
      </div>
    </div>
  );
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, languageCode }) => {
  const [lang, setLang] = useState<'my' | 'en'>('my');

  const ExplanationToggle: React.FC = () => (
    <div className="flex justify-end mb-2">
      <div className="bg-[var(--color-bg-secondary)] p-1 rounded-lg flex text-sm">
        <button
          onClick={() => setLang('my')}
          className={`px-3 py-1 rounded-md transition-colors ${lang === 'my' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)]'}`}
        >
          မြန်မာ
        </button>
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 rounded-md transition-colors ${lang === 'en' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-secondary)]'}`}
        >
          English
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-[var(--color-text-accent)]">Feedback from Yui-sensei</h2>
      
      <div className="feedback-layout bg-[var(--color-bg-primary)]/50 p-4 rounded-lg">
        <ScoreCircle score={feedback.score} />
        <div>
          <p className="text-[var(--color-text-primary)]">
            {lang === 'my' ? feedback.overall_feedback.myanmar : feedback.overall_feedback.english}
          </p>
        </div>
      </div>
      
      <div>
        <ExplanationToggle />
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Corrections & Suggestions</h3>
        <div className="space-y-4">
          {feedback.corrections.length > 0 ? (
            feedback.corrections.map((correction, index) => (
              <div key={index} className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg border-l-4 border-[var(--color-border)]">
                <div className="line-through text-[var(--color-danger)] mb-1">{correction.original}</div>
                <div className="flex items-center gap-2">
                  <PronunciationButton textToSpeak={correction.corrected} langCode={languageCode} />
                  <div className="text-[var(--color-success)] font-medium">{correction.corrected}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]">
                  {lang === 'my' ? correction.explanation.myanmar : correction.explanation.english}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg text-center text-[var(--color-text-secondary)]">
                {lang === 'my' ? 'အမှားအယွင်းမရှိပါ၊ ကောင်းမွန်စွာလုပ်ဆောင်နိုင်ခဲ့သည်။' : 'No mistakes found, great job!'}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Example Sentence</h3>
        <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg flex items-center gap-3">
          <PronunciationButton textToSpeak={feedback.example_sentence} langCode={languageCode} />
          <p className="text-[var(--color-accent-secondary)] italic">"{feedback.example_sentence}"</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;