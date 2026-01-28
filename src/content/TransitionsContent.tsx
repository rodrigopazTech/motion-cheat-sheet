import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { StaggeredTransitions } from '../compositions/StaggeredTransitions';
import { useLanguage } from '../i18n/LanguageContext';

export const TransitionsContent: React.FC = () => {
    const [staggerFrames, setStaggerFrames] = useState(3);
    const [type, setType] = useState<'slide' | 'fade' | 'scale'>('slide');

    const { t } = useLanguage();

    return (
        <div>
            <ConceptCard
                title={t('transitions.stagger.title')}
                description={t('transitions.stagger.desc')}
                component={StaggeredTransitions}
                inputProps={{ staggerFrames, type }}
                durationInFrames={120}
                codeSnippet={`const delay = index * ${staggerFrames};
const itemFrame = frame - delay;

const progress = spring({ 
    frame: itemFrame,
    config: { damping: 12 }
});`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('transitions.control.stagger')}</span>
                                <span className="control-value">{staggerFrames} frames</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={staggerFrames}
                                onChange={(e) => setStaggerFrames(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('transitions.control.type')}</span>
                                <span className="control-value" style={{ textTransform: 'capitalize' }}>{type}</span>
                            </label>
                            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                                {(['slide', 'fade', 'scale'] as const).map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setType(mode)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border)',
                                            background: type === mode ? 'var(--accent)' : 'transparent',
                                            color: type === mode ? 'white' : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            flex: 1
                                        }}
                                    >
                                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
};
