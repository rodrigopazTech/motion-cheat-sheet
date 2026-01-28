import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { SpringConfigurable } from '../compositions/SpringConfigurable';
import { SpringSequence } from '../compositions/SpringSequence';
import { useLanguage } from '../i18n/LanguageContext';

export const SpringsContent: React.FC = () => {
    const [mass, setMass] = useState(1);
    const [damping, setDamping] = useState(10);
    const [stiffness, setStiffness] = useState(100);
    const [holdDuration, setHoldDuration] = useState(30);

    const { t } = useLanguage();

    return (
        <div>
            <ConceptCard
                title={t('springs.config.title')}
                description={t('springs.config.desc')}
                component={SpringConfigurable}
                inputProps={{ mass, damping, stiffness }}
                durationInFrames={90}
                codeSnippet={`spring({
  frame,
  fps,
  config: {
    mass: ${mass},
    damping: ${damping},
    stiffness: ${stiffness}
  }
})`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('springs.control.mass')}</span>
                                <span className="control-value">{mass}</span>
                            </label>
                            <input
                                type="range"
                                min="0.1"
                                max="5"
                                step="0.1"
                                value={mass}
                                onChange={(e) => setMass(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('springs.control.damping')}</span>
                                <span className="control-value">{damping}</span>
                            </label>
                            <p className="control-hint">{t('springs.hint.damping')}</p>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                step="1"
                                value={damping}
                                onChange={(e) => setDamping(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('springs.control.stiffness')}</span>
                                <span className="control-value">{stiffness}</span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="500"
                                step="10"
                                value={stiffness}
                                onChange={(e) => setStiffness(Number(e.target.value))}
                            />
                        </div>
                    </>
                }
            />

            <ConceptCard
                title={t('springs.seq.title')}
                description={t('springs.seq.desc')}
                component={SpringSequence}
                inputProps={{ delay: 0, duration: holdDuration }}
                durationInFrames={120}
                codeSnippet={`const entrance = spring({ frame });
const exit = spring({ frame: frame - ${holdDuration} - 30 }); // 30 is entrance length

// Math Trick: 
const scale = entrance - exit;`}
                controls={
                    <div className="control-group">
                        <label className="control-label">
                            <span>{t('springs.control.hold')}</span>
                            <span className="control-value">{holdDuration} frames</span>
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="60"
                            step="5"
                            value={holdDuration}
                            onChange={(e) => setHoldDuration(Number(e.target.value))}
                        />
                    </div>
                }
            />
        </div>
    );
};
