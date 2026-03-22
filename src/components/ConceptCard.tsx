import React from 'react';
import { Player } from '@remotion/player';
import { Copy, Check, Download } from 'lucide-react';
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

    const handleExport = () => {
        const fullCode = `
import React from 'react';
import { AbsoluteFill } from 'remotion';

const MyCustomComposition = () => {
  const props = ${JSON.stringify(inputProps, null, 2)};
  return (
    <AbsoluteFill>
      {/* Implementación basada en: ${title} */}
    </AbsoluteFill>
  );
};

export default MyCustomComposition;
        `.trim();

        const blob = new Blob([fullCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-template.tsx`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="concept-card glass-panel">
            {/* Split Column Left (Player) */}
            <div className="card-left">
                <div className="card-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3 className="card-title">{title}</h3>
                            <p className="card-description">{description}</p>
                        </div>
                        <button 
                            className="export-button" 
                            onClick={handleExport}
                            title="Exportar como Plantilla TSX"
                            style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid var(--accent)',
                                color: 'var(--accent)',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                cursor: 'pointer'
                            }}
                        >
                            <Download size={14} /> Exportar
                        </button>
                    </div>
                </div>

                <div className="player-container">
                    <Player
                        component={component}
                        durationInFrames={durationInFrames}
                        compositionWidth={1200}
                        compositionHeight={height * 2}
                        fps={30}
                        controls
                        loop
                        inputProps={inputProps}
                        style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            height: 'auto'
                        }}
                    />
                </div>
            </div>

            {/* Split Column Right (Controls & Code) */}
            <div className="card-right">
                {controls && (
                    <div className="controls-area">
                        {controls}
                    </div>
                )}

                {codeSnippet && (
                    <div className="code-block">
                        <pre><code>{codeSnippet}</code></pre>
                        <button className="copy-button" onClick={() => handleCopy(codeSnippet)} title={t('prompt.copy')}>
                            {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
