import React, { useState } from 'react';
import type { Lesson } from '../types';
import PronunciationButton from './PronunciationButton';

interface LessonPracticeProps {
    lesson: Lesson;
    languageCode: string;
    onFinish: () => void;
    onNext: () => void;
}

type LessonTab = 'vocabulary' | 'grammar' | 'reading' | 'writing';

const LessonPractice: React.FC<LessonPracticeProps> = ({ lesson, languageCode, onFinish, onNext }) => {
    const [activeTab, setActiveTab] = useState<LessonTab>('vocabulary');

    const TabButton: React.FC<{ tabId: LessonTab; label: string; emoji: string }> = ({ tabId, label, emoji }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex-1 p-3 font-semibold rounded-t-lg transition-colors flex items-center justify-center gap-2 ${activeTab === tabId ? 'bg-[var(--color-bg-primary)]/50 text-[var(--color-accent-secondary)] border-b-2 border-[var(--color-accent-secondary)]' : 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/30'}`}
        >
            <span>{emoji}</span>
            <span>{label}</span>
        </button>
    );

    return (
        <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-0 md:p-0 space-y-4 animate-fade-in">
            <header className="p-4 md:p-6 border-b border-[var(--color-border)]">
                <h2 className="text-2xl font-bold text-[var(--color-text-accent)]">{lesson.title}</h2>
                <p className="text-[var(--color-text-secondary)]">A lesson on "{lesson.reading.title}"</p>
            </header>
            
            <div className="px-4 md:px-6">
                <div className="flex border-b border-[var(--color-border)]">
                    <TabButton tabId="vocabulary" label="Vocabulary" emoji="📚" />
                    <TabButton tabId="grammar" label="Grammar" emoji="🧐" />
                    <TabButton tabId="reading" label="Reading" emoji="📖" />
                    <TabButton tabId="writing" label="Writing" emoji="✍️" />
                </div>

                <div className="py-6 min-h-[40vh] bg-[var(--color-bg-primary)]/20 p-4 rounded-b-lg">
                    {activeTab === 'vocabulary' && (
                        <div className="space-y-4 animate-fade-in">
                            {lesson.vocabulary.map((item, index) => (
                                <div key={index} className="bg-[var(--color-bg-primary)]/50 p-3 rounded-lg border-l-4 border-[var(--color-accent-secondary)]">
                                    <div className="flex items-center gap-3 mb-1">
                                        <PronunciationButton textToSpeak={item.word_target_language} langCode={languageCode} />
                                        <div>
                                            <h3 className="text-lg font-bold text-[var(--color-accent-secondary)]">{item.word_target_language}</h3>
                                            <span className="text-sm text-[var(--color-text-secondary)] italic">({item.pronunciation_guide})</span>
                                        </div>
                                    </div>
                                    <p className="text-md text-[var(--color-text-primary)] mb-1 ml-11">{item.meaning_myanmar}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'grammar' && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-xl font-semibold text-[var(--color-accent-secondary)]">{lesson.grammar.rule_name}</h3>
                            <p className="text-[var(--color-text-primary)]">{lesson.grammar.explanation_target_language}</p>
                            <p className="text-sm text-[var(--color-text-secondary)]">({lesson.grammar.explanation_myanmar})</p>
                            <div className="border-t border-[var(--color-border)] pt-3 mt-3">
                                <p className="text-sm font-semibold text-[var(--color-text-secondary)]">EXAMPLE:</p>
                                <div className="flex items-center gap-2">
                                    <PronunciationButton textToSpeak={lesson.grammar.example_sentence} langCode={languageCode} />
                                    <p className="text-[var(--color-text-primary)] italic">"{lesson.grammar.example_sentence}"</p>
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)] italic">({lesson.grammar.example_translation_myanmar})</p>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'reading' && (
                         <div className="space-y-4 animate-fade-in">
                             <h3 className="text-xl font-semibold text-[var(--color-accent-secondary)]">{lesson.reading.title}</h3>
                             <div className="max-h-48 overflow-y-auto pr-2">
                                <p className="text-[var(--color-text-primary)] whitespace-pre-wrap leading-relaxed">{lesson.reading.passage}</p>
                             </div>
                             <div className="space-y-3 pt-3 border-t border-[var(--color-border)]">
                                {lesson.reading.questions.map((q, i) => (
                                    <div key={i}>
                                        <p className="font-semibold text-[var(--color-text-secondary)]">{i + 1}. {q.question}</p>
                                        <p className="text-sm text-[var(--color-success)] mt-1">Answer: {q.correct_answer}</p>
                                    </div>
                                ))}
                             </div>
                         </div>
                    )}

                    {activeTab === 'writing' && (
                         <div className="space-y-4 animate-fade-in">
                             <h3 className="text-xl font-semibold text-[var(--color-accent-secondary)]">Writing Prompt</h3>
                             <p className="text-lg text-[var(--color-text-primary)]">{lesson.writingPrompt.prompt_target}</p>
                             <p className="text-sm text-[var(--color-text-secondary)]">[English]: {lesson.writingPrompt.prompt_english}</p>
                             <p className="text-sm text-[var(--color-text-secondary)]">[မြန်မာ]: {lesson.writingPrompt.prompt_myanmar}</p>
                             <p className="mt-4 text-center text-sm text-[var(--color-text-secondary)] italic">You can practice this prompt in the 'Writing' mode!</p>
                         </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center p-4">
                <button onClick={onFinish} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors"> Start New Practice </button>
                <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"> Next Topic </button>
            </div>
        </section>
    );
};

export default LessonPractice;
