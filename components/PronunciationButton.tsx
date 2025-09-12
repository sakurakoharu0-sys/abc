import React from 'react';

interface PronunciationButtonProps {
  textToSpeak: string;
  langCode: string;
}

const langCodeMap: { [key: string]: string } = {
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  th: 'th-TH',
  de: 'de-DE',
  fr: 'fr-FR',
  my: 'my-MM',
};

const PronunciationButton: React.FC<PronunciationButtonProps> = ({ textToSpeak, langCode }) => {

  const handleSpeak = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      // If langCode is a full BCP 47 code (like 'es-ES'), use it directly.
      // Otherwise, look it up in the map.
      utterance.lang = langCode.includes('-') ? langCode : (langCodeMap[langCode] || 'en-US');
      utterance.rate = 0.9;
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  return (
    <button
      onClick={handleSpeak}
      title="Listen to pronunciation"
      className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-accent)] rounded-full transition-colors"
      aria-label="Listen to pronunciation"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export default PronunciationButton;
