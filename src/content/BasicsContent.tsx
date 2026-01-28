import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { InterpolationBasic } from '../compositions/InterpolationBasic';
import { useLanguage } from '../i18n/LanguageContext';

export const BasicsContent: React.FC = () => {
    const [extrapolate, setExtrapolate] = useState(true);
    const { t } = useLanguage();

    return (
        <div>
            <ConceptCard
                title={t('basics.title')}
                description={t('basics.desc')}
                component={InterpolationBasic}
                inputProps={{ extrapolate }}
                durationInFrames={120}
                codeSnippet={`const rotation = interpolate(
  frame, 
  [0, 60], 
  [0, 360],
  { extrapolateRight: '${extrapolate ? 'extend' : 'clamp'}' }
);`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={extrapolate}
                                    onChange={(e) => setExtrapolate(e.target.checked)}
                                />
                                {t('basics.control.extrapolate')}
                            </label>
                        </div>
                    </>
                }
            />
        </div>
    );
};
