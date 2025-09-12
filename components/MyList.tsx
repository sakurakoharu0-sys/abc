import React from 'react';
import type { VocabularyItem, GrammarRule } from '../types';
import PronunciationButton from './PronunciationButton';

interface MyListProps {
    savedVocabulary: VocabularyItem[];
    savedGrammarRules: GrammarRule[];
    onRemoveVocabulary: (word: string) => void;
    onRemoveGrammar: (ruleName: string) => void;
    onClose: () => void;
    languageCode: string;
}

const MyList: React.FC<MyListProps> = ({
    savedVocabulary,
    savedGrammarRules,
    onRemoveVocabulary,
    onRemoveGrammar,
    onClose,
    languageCode
}) => {
    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-center items-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-[var(--color-bg-secondary)]/80 border border-[var(--color-border)] rounded-xl w-full max-w-2xl h-[80vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
                    <h2 className="text-xl font-bold text-[var(--color-text-accent)]">My Saved List</h2>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                        aria-label="Close my list"
                    >
                        &times;
                    </button>
                </header>

                <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    {/* Saved Vocabulary Section */}
                    <section>
                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">📚 Saved Vocabulary</h3>
                        {savedVocabulary.length > 0 ? (
                            <div className="space-y-3">
                                {savedVocabulary.map(item => (
                                    <div key={item.word_target_language} className="bg-[var(--color-bg-primary)]/50 p-3 rounded-lg flex justify-between items-start">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-1">
                                                <PronunciationButton textToSpeak={item.word_target_language} langCode={languageCode} />
                                                <div>
                                                     <h4 className="font-bold text-[var(--color-accent-secondary)]">{item.word_target_language}</h4>
                                                     <span className="text-sm text-[var(--color-text-secondary)] italic">({item.pronunciation_guide})</span>
                                                </div>
                                            </div>
                                            <p className="text-md text-[var(--color-text-primary)] mb-2 ml-11">{item.meaning_myanmar}</p>
                                            <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-2 mt-2">
                                                <PronunciationButton textToSpeak={item.example_sentence} langCode={languageCode} />
                                                <span>"{item.example_sentence}"</span>
                                            </div>
                                        </div>
                                         <button 
                                            onClick={() => onRemoveVocabulary(item.word_target_language)}
                                            className="text-xs text-red-400 hover:text-red-300 font-semibold flex-shrink-0 ml-2"
                                            title="Remove item"
                                         >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-sm text-center text-[var(--color-text-secondary)] p-4 bg-[var(--color-bg-primary)]/50 rounded-lg">You haven't saved any vocabulary words yet.</p>
                        )}
                    </section>

                    {/* Saved Grammar Rules Section */}
                    <section>
                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">🧐 Saved Grammar Rules</h3>
                         {savedGrammarRules.length > 0 ? (
                            <div className="space-y-3">
                                {savedGrammarRules.map(rule => (
                                    <div key={rule.rule_name} className="bg-[var(--color-bg-primary)]/50 p-3 rounded-lg flex justify-between items-start">
                                        <div className="flex-grow space-y-2">
                                            <h4 className="font-bold text-[var(--color-accent-secondary)]">{rule.rule_name}</h4>
                                            <p className="text-sm text-[var(--color-text-primary)]">{rule.explanation_target_language}</p>
                                            <p className="text-xs text-[var(--color-text-secondary)]">({rule.explanation_myanmar})</p>
                                        </div>
                                        <button 
                                            onClick={() => onRemoveGrammar(rule.rule_name)}
                                            className="text-xs text-red-400 hover:text-red-300 font-semibold flex-shrink-0 ml-2"
                                            title="Remove rule"
                                         >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-sm text-center text-[var(--color-text-secondary)] p-4 bg-[var(--color-bg-primary)]/50 rounded-lg">You haven't saved any grammar rules yet.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default MyList;
