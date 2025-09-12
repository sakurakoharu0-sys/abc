import React, { useState } from 'react';
import type { ListeningExercise } from '../types';
import PronunciationButton from './PronunciationButton';

interface ListeningPracticeProps {
  exercise: ListeningExercise;
  languageCode: string;
  onFinish: () => void;
  onNext: () => void;
}

const ListeningPractice: React.FC<ListeningPracticeProps> = ({ exercise, languageCode, onFinish, onNext }) => {
  const [userTranscription, setUserTranscription] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(true);
  };
  
 const renderFeedback = () => {
    const original = exercise.audio_text;
    const user = userTranscription;
    const diff = [];
    const maxLength = Math.max(original.length, user.length);

    for (let i = 0; i < maxLength; i++) {
        if (original[i] === user[i]) {
            diff.push(<span key={`correct-${i}`} className="text-green-400">{original[i]}</span>);
        } else if (user[i] === undefined) {
            diff.push(<span key={`missing-${i}`} className="text-red-400 bg-red-900/50 underline">{original[i]}</span>);
        } else if (original[i] === undefined) {
            diff.push(<span key={`extra-${i}`} className="text-red-400 bg-red-900/50 line-through">{user[i]}</span>);
        } else {
            diff.push(<span key={`wrong-${i}`} className="text-yellow-400 bg-yellow-900/50">{original[i]}</span>);
        }
    }

    const userDiff = user.split('').map((char, i) => {
        if (char === original[i]) {
            return <span key={`user-correct-${i}`} className="text-green-400">{char}</span>;
        } else if (original[i] !== undefined) {
            return <span key={`user-wrong-${i}`} className="text-yellow-400 bg-yellow-900/50">{char}</span>;
        } else {
             return <span key={`user-extra-${i}`} className="text-red-400 bg-red-900/50 line-through">{char}</span>;
        }
    })

    return (
        <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg space-y-4">
             <div>
                <p className="text-[var(--color-text-secondary)] text-sm mb-1">Your attempt:</p>
                <p className="font-mono break-words text-lg">{userTranscription ? userDiff : <span className="italic text-base text-[var(--color-text-secondary)]">You didn't write anything.</span>}</p>
             </div>
             <hr className="border-[var(--color-border)]" />
             <div>
                 <p className="text-[var(--color-text-secondary)] text-sm mb-1">Correct sentence:</p>
                 <p className="font-mono text-lg break-words">{diff}</p>
             </div>
             <div className="text-xs pt-2 border-t border-[var(--color-border)]/50 text-[var(--color-text-secondary)]">
                <span className="text-green-400">Green</span> = Correct. <span className="text-yellow-400">Yellow</span> = Incorrect Substitution. <span className="text-red-400 underline">Underline</span> = Missing. <span className="text-red-400 line-through">Strikethrough</span> = Extra character.
             </div>
        </div>
    )
  };


  return (
    <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Listening Practice</h2>
        
        {!isChecked ? (
            <>
                <div className="text-center space-y-4">
                    <p className="text-[var(--color-text-secondary)]">Click the button to listen, then type what you hear.</p>
                    <PronunciationButton textToSpeak={exercise.audio_text} langCode={languageCode} />
                    <p className="text-xs text-[var(--color-text-secondary)] italic">({exercise.difficulty_description})</p>
                </div>
                
                <textarea
                    value={userTranscription}
                    onChange={(e) => setUserTranscription(e.target.value)}
                    placeholder="Type what you hear..."
                    rows={4}
                    className="w-full bg-[var(--color-bg-primary)]/70 border border-[var(--color-border)] rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"
                />

                <div className="text-center">
                    <button
                    onClick={handleCheck}
                    disabled={!userTranscription.trim()}
                    className="px-8 py-3 w-48 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-transform"
                    >
                    Check Answer
                    </button>
                </div>
            </>
        ) : (
             <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[var(--color-text-accent)] text-center">Result</h3>
                {renderFeedback()}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button onClick={onFinish} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors"> Start New Practice </button>
                    <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"> Next Topic </button>
                </div>
             </div>
        )}

    </section>
  );
};

export default ListeningPractice;