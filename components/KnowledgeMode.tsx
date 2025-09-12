import React from 'react';
import type { KnowledgeArticle } from '../types';
import PronunciationButton from './PronunciationButton';

interface KnowledgeModeProps {
    article: KnowledgeArticle;
    onFinish: () => void;
    onNext: () => void;
}

const KnowledgeMode: React.FC<KnowledgeModeProps> = ({ article, onFinish, onNext }) => {
    return (
        <section className="bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-4 md:p-6 space-y-6 animate-fade-in">
            <header>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] mb-2">
                    {article.title}
                </h2>
            </header>
            
            <div className="bg-[var(--color-bg-primary)]/50 p-4 rounded-lg max-h-[50vh] overflow-y-auto space-y-4">
                <div className="flex items-start gap-2">
                    <PronunciationButton textToSpeak={article.content} langCode={article.languageBcp47Code} />
                    <p className="text-[var(--color-text-primary)] whitespace-pre-wrap leading-relaxed">
                        {article.content}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={onFinish} className="w-full sm:w-auto px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:bg-[var(--color-border)] transition-colors">
                    Start Over
                </button>
                <button onClick={onNext} className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                    New Random Topic
                </button>
            </div>
        </section>
    );
};

export default KnowledgeMode;
