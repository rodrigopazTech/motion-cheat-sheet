import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { EasingGraph } from '../compositions/EasingGraph';
import { useLanguage } from '../i18n/LanguageContext';
import { MousePointer2, GitCompare, Settings2 } from 'lucide-react';

export const EasingContent: React.FC = () => {
    const [easingName, setEasingName] = useState('quad');
    const [easingMode, setEasingMode] = useState('inOut'); // in, out, inOut
    const [compareWith, setCompareWith] = useState<string | null>(null);
    
    const { t } = useLanguage();

    const easingOptions = ['linear', 'quad', 'cubic', 'sine', 'expo', 'elastic', 'bounce'];
    const modes = ['in', 'out', 'inOut'];

    const getEasingCode = (name: string, mode: string) => {
        if (name === 'linear') return 'Easing.linear';
        return `Easing.${mode}(Easing.${name})`;
    };

    return (
        <div className="easing-lab">
            <ConceptCard
                title={t('easing.title')}
                description={t('easing.desc')}
                component={EasingGraph}
                inputProps={{ 
                    easingName, 
                    easingMode, 
                    compareWithName: compareWith 
                }}
                durationInFrames={100}
                height={400}
                codeSnippet={`import { Easing } from 'remotion';

// Primaria: ${getEasingCode(easingName, easingMode)}
${compareWith ? `// Comparación: Easing.inOut(Easing.${compareWith})` : ''}

const progress = interpolate(frame, [0, 60], [0, 1], {
  easing: ${getEasingCode(easingName, easingMode)}
});`}
                controls={
                    <div className="advanced-controls">
                        <div className="control-section">
                            <div className="control-label" style={{ marginBottom: '12px' }}>
                                <MousePointer2 size={14} /> <span>Función Principal</span>
                            </div>
                            <div className="button-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                                {easingOptions.map((name) => (
                                    <button
                                        key={name}
                                        onClick={() => setEasingName(name)}
                                        className={`preset-btn ${easingName === name ? 'active' : ''}`}
                                        style={{
                                            background: easingName === name ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                            color: easingName === name ? 'white' : 'var(--text-secondary)',
                                            border: 'none',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {easingName !== 'linear' && (
                            <div className="control-section" style={{ marginTop: '20px' }}>
                                <div className="control-label" style={{ marginBottom: '12px' }}>
                                    <Settings2 size={14} /> <span>Modo de Aceleración</span>
                                </div>
                                <div className="mode-selector" style={{ display: 'flex', gap: '8px' }}>
                                    {modes.map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => setEasingMode(mode)}
                                            style={{
                                                flex: 1,
                                                padding: '8px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                background: easingMode === mode ? '#ec4899' : 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="control-section" style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                            <div className="control-label" style={{ marginBottom: '12px' }}>
                                <GitCompare size={14} /> <span>Comparar con...</span>
                            </div>
                            <select 
                                onChange={(e) => setCompareWith(e.target.value || null)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '6px',
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'white',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                <option value="">Ninguna</option>
                                {easingOptions.filter(n => n !== easingName).map(n => (
                                    <option key={n} value={n}>{n} (InOut)</option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
            />
        </div>
    );
};
