import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { EasingGraph } from '../compositions/EasingGraph';
import { useLanguage } from '../i18n/LanguageContext';

export const EasingContent: React.FC = () => {
    const [easingName, setEasingName] = useState('quad');
    const { t } = useLanguage();

    return (
        <div>
            <ConceptCard
                title={t('easing.title')}
                description={t('easing.desc')}
                component={EasingGraph}
                inputProps={{ easingName }}
                durationInFrames={80}
                height={450}
                codeSnippet={`import { Easing } from 'remotion';

// Selected: ${easingName}
const options = {
  easing: ${getEasingCode(easingName)}
};

interpolate(frame, [0, 60], [0, 1], options);`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('easing.control.func')}</span>
                                <span className="control-value" style={{ textTransform: 'capitalize' }}>{easingName}</span>
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                                {['linear', 'quad', 'cubic', 'elastic', 'bounce', 'bezier'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setEasingName(t)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border)',
                                            background: easingName === t ? 'var(--accent)' : 'transparent',
                                            color: easingName === t ? 'white' : 'var(--text-secondary)',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ marginTop: 16, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                            <strong>{t('easing.analysis')}</strong><br />
                            {t(`easing.desc.${easingName}`)}
                        </div>
                    </>
                }
            />
        </div>
    );
};

function getEasingCode(name: string): string {
    switch (name) {
        case 'quad': return 'Easing.inOut(Easing.quad)';
        case 'cubic': return 'Easing.inOut(Easing.cubic)';
        case 'elastic': return 'Easing.out(Easing.elastic(1))';
        case 'bounce': return 'Easing.out(Easing.bounce)';
        case 'bezier': return 'Easing.bezier(0.17, 0.67, 0.83, 0.67)';
        default: return 'Easing.linear';
    }
}
