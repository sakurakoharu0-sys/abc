import React, { useState, useEffect, useMemo } from 'react';
import type { VocabularyItem } from '../types';
import PronunciationButton from './PronunciationButton';

interface SpeakingPracticeProps {
  exercises: VocabularyItem[];
  languageCode: string;
  onFinish: () => void;
  onNext: () => void;
}

// FIX: Cast window to any to access non-standard SpeechRecognition APIs
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const langCodeMap: { [key: string]: string } = {
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  th: 'th-TH',
  de: 'de-DE',
  fr: 'fr-FR',
};

const normalizeString = (str: string) => str.trim().toLowerCase().replace(/[.,!?;:"']/g, '');

const SpeakingPractice: React.FC<SpeakingPracticeProps> = ({ exercises, languageCode, onFinish, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<(boolean | null)[]>(Array(exercises.length).fill(null));
  const [userTranscription, setUserTranscription] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentExercise = exercises[currentIndex];
  const isChecked = results[currentIndex] !== null;

  useEffect(() => {
    if (!recognition) {
      setError("Speech recognition is not supported in your browser. Please try Chrome or Safari.");
      return;
    }
    
    recognition.lang = langCodeMap[languageCode] || 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserTranscription(transcript);
      const isCorrect = normalizeString(transcript) === normalizeString(currentExercise.word_target_language);
      const newResults = [...results];
      newResults[currentIndex] = isCorrect;
      setResults(newResults);
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError("Microphone permission denied. Please allow microphone access in your browser settings.");
      } else {
        setError(`An error occurred: ${event.error}`);
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
    
    return () => {
        if (recognition) {
            recognition.stop();
        }
    }
  }, [languageCode, currentIndex, exercises, results]);

  const handleRecord = async () => {
    if (!recognition) return;
    setError(null);
    setUserTranscription(null);
    if (isRecording) {
      recognition.stop();
    } else {
        try {
            // A common pattern is to request permission on a user gesture.
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // We don't need the stream, just the permission.
            setIsRecording(true);
            recognition.start();
        } catch (err) {
            setError("Microphone access is required for speaking practice. Please allow microphone access.");
        }
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserTranscription(null);
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={onFinish} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors">Start New Practice</button>
          <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">Next Topic</button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Speaking Practice</h2>
        <div className="text-sm font-semibold bg-[var(--color-bg-primary)]/50 px-3 py-1 rounded-full border border-[var(--color-border)]">
          {currentIndex + 1} / {exercises.length}
        </div>
      </div>
      <div className="w-full bg-[var(--color-bg-tertiary)]/50 rounded-full h-2.5">
        <div className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
      </div>
      
      <div className="bg-[var(--color-bg-primary)]/50 p-6 rounded-lg text-center space-y-3">
        <p className="text-sm text-[var(--color-text-secondary)]">Listen and say the word:</p>
        <div className="flex items-center justify-center gap-4">
            <PronunciationButton textToSpeak={currentExercise.word_target_language} langCode={languageCode} />
            <div>
                 <h3 className="text-3xl font-bold text-[var(--color-accent-secondary)]">{currentExercise.word_target_language}</h3>
                 <p className="text-[var(--color-text-secondary)]">({currentExercise.pronunciation_guide})</p>
            </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={handleRecord}
          disabled={!recognition}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 border-4 shadow-lg ${isRecording ? 'bg-red-500/50 border-red-400 animate-pulse' : 'bg-[var(--color-accent)]/50 border-[var(--color-accent)] hover:scale-105'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>

      {error && <div className="text-center text-sm text-[var(--color-danger)] bg-red-900/30 p-2 rounded-md">{error}</div>}
      
      {isChecked && (
        <div className={`p-4 rounded-lg animate-fade-in text-center ${results[currentIndex] ? 'bg-green-900/40' : 'bg-red-900/40'}`}>
          <h3 className={`text-lg font-bold ${results[currentIndex] ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
            {results[currentIndex] ? 'Correct!' : 'Not quite...'}
          </h3>
          <p className="text-[var(--color-text-primary)] mt-1">You said: <span className="font-semibold text-white">"{userTranscription}"</span></p>
        </div>
      )}

      {isChecked && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 w-48 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            {currentIndex < exercises.length - 1 ? 'Next →' : 'Finish'}
          </button>
        </div>
      )}
    </section>
  );
};

export default SpeakingPractice;
