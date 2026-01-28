import React from 'react';
import { Player } from '@remotion/player';
import { Copy, Check } from 'lucide-react';
import './ConceptCard.css';
import { useLanguage } from '../i18n/LanguageContext';

interface ConceptCardProps {
    title: string;
    description: string;
    component: React.FC<any>;
    durationInFrames: number;
    controls?: React.ReactNode;
    codeSnippet?: string;
    inputProps?: Record<string, any>;
    height?: number;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
    title,
    description,
    component,
    durationInFrames,
    controls,
    codeSnippet,
    inputProps = {},
    height = 360,
}) => {
    const [copied, setCopied] = React.useState(false);
    const { t } = useLanguage();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="concept-card glass-panel">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>

            <div className="player-container" style={{ height }}>
                <Player
                    component={component}
                    durationInFrames={durationInFrames}
                    compositionWidth={600}
                    compositionHeight={height}
                    fps={30}
                    controls
                    loop
                    inputProps={inputProps}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>

            {codeSnippet && (
                <div className="code-block">
                    <pre><code>{codeSnippet}</code></pre>
                    <button className="copy-button" onClick={() => handleCopy(codeSnippet)} title={t('prompt.copy')}>
                        {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
                    </button>
                </div>
            )}

            {controls && (
                <div className="controls-area">
                    {controls}
                </div>
            )}
        </div>
    );
};
