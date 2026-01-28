import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { ThreeDCardFlip } from '../compositions/ThreeDCardFlip';
import { ThreeDOrbital } from '../compositions/ThreeDOrbital';
import { useLanguage } from '../i18n/LanguageContext';

export const ThreeDContent: React.FC = () => {
    const [perspective, setPerspective] = useState(800);
    const [rotation, setRotation] = useState(0);
    const [orbitRadius, setOrbitRadius] = useState(150);
    const [orbitSpeed, setOrbitSpeed] = useState(2);

    const { t } = useLanguage();

    return (
        <div>
            {/* Card Flip - Intro to Perspective */}
            <ConceptCard
                title={t('3d.flip.title')}
                description={t('3d.flip.desc')}
                component={ThreeDCardFlip}
                inputProps={{ perspective, maxRotation: rotation }}
                durationInFrames={120}
                codeSnippet={`<AbsoluteFill style={{ perspective: ${perspective}px }}>
  <div style={{ transform: \`rotateY(\${rotation}deg)\` }}>
    CONTENT
  </div>
</AbsoluteFill>`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('3d.control.perspective')}</span>
                                <span className="control-value">{perspective}px</span>
                            </label>
                            <input
                                type="range"
                                min="200"
                                max="2000"
                                step="50"
                                value={perspective}
                                onChange={(e) => setPerspective(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('3d.control.rotate')}</span>
                                <span className="control-value">{rotation}deg</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                step="10"
                                value={rotation}
                                onChange={(e) => setRotation(Number(e.target.value))}
                            />
                        </div>
                    </>
                }
            />

            {/* Orbital - 3D Space Math */}
            <ConceptCard
                title={t('3d.orbit.title')}
                description={t('3d.orbit.desc')}
                component={ThreeDOrbital}
                inputProps={{ radius: orbitRadius, speed: orbitSpeed }}
                durationInFrames={180}
                codeSnippet={`const x = Math.cos(angle) * ${orbitRadius};
const z = Math.sin(angle) * ${orbitRadius};
const scale = interpolate(z, [-100, 100], [0.8, 1.2]); // Depth`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('3d.control.radius')}</span>
                                <span className="control-value">{orbitRadius}px</span>
                            </label>
                            <input
                                type="range"
                                min="50"
                                max="300"
                                step="10"
                                value={orbitRadius}
                                onChange={(e) => setOrbitRadius(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('3d.control.speed')}</span>
                                <span className="control-value">{orbitSpeed}x</span>
                            </label>
                            <input
                                type="range"
                                min="0.5"
                                max="5"
                                step="0.5"
                                value={orbitSpeed}
                                onChange={(e) => setOrbitSpeed(Number(e.target.value))}
                            />
                        </div>
                    </>
                }
            />
        </div>
    );
};
