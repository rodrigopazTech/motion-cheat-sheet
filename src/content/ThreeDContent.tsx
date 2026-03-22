import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { ThreeDCardFlip } from '../compositions/ThreeDCardFlip';
import { ThreeDOrbital } from '../compositions/ThreeDOrbital';
import { useLanguage } from '../i18n/LanguageContext';
import { Move3d, Box, Sun, Settings2 } from 'lucide-react';

export const ThreeDContent: React.FC = () => {
    const [perspective, setPerspective] = useState(800);
    const [rotateX, setRotateX] = useState(20);
    const [rotateY, setRotateY] = useState(-20);
    const [materialColor, setMaterialColor] = useState('#ec4899');
    const [glowIntensity, setGlowIntensity] = useState(0.5);
    
    const [orbitRadius, setOrbitRadius] = useState(150);
    const [orbitSpeed, setOrbitSpeed] = useState(2);

    const { t } = useLanguage();

    return (
        <div className="three-d-lab">
            {/* Card Flip - Intro to Perspective */}
            <ConceptCard
                title={t('3d.flip.title')}
                description={t('3d.flip.desc')}
                component={ThreeDCardFlip}
                inputProps={{ 
                    perspective, 
                    rotateX, 
                    rotateY, 
                    color: materialColor,
                    glow: glowIntensity 
                }}
                durationInFrames={120}
                codeSnippet={`<div style={{ 
  perspective: ${perspective}px,
  transform: "rotateX(${rotateX}deg) rotateY(${rotateY}deg)"
}}>
  <div style={{ backgroundColor: "${materialColor}" }} />
</div>`}
                controls={
                    <div className="advanced-controls">
                        <div className="control-section">
                            <div className="control-label" style={{ marginBottom: '12px' }}>
                                <Move3d size={14} /> <span>Joystick de Rotación</span>
                            </div>
                            <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="control-group">
                                    <label className="control-label">
                                        <span>Eje X</span>
                                        <span className="control-value">{rotateX}°</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="-180"
                                        max="180"
                                        step="5"
                                        value={rotateX}
                                        onChange={(e) => setRotateX(Number(e.target.value))}
                                    />
                                </div>
                                <div className="control-group">
                                    <label className="control-label">
                                        <span>Eje Y</span>
                                        <span className="control-value">{rotateY}°</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="-180"
                                        max="180"
                                        step="5"
                                        value={rotateY}
                                        onChange={(e) => setRotateY(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="control-section" style={{ marginTop: '20px' }}>
                            <div className="control-label" style={{ marginBottom: '12px' }}>
                                <Settings2 size={14} /> <span>Cámara y Perspectiva</span>
                            </div>
                            <div className="control-group">
                                <label className="control-label">
                                    <span>Perspective (Z-Depth)</span>
                                    <span className="control-value">{perspective}px</span>
                                </label>
                                <input
                                    type="range"
                                    min="200"
                                    max="2000"
                                    step="50"
                                    value={perspective}
                                    style={{ width: '100%' }}
                                    onChange={(e) => setPerspective(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="control-section" style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                            <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="control-group">
                                    <label className="control-label">
                                        <Sun size={14} /> <span>Brillo (Glow)</span>
                                        <span className="control-value">{(glowIntensity * 100).toFixed(0)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={glowIntensity}
                                        onChange={(e) => setGlowIntensity(Number(e.target.value))}
                                    />
                                </div>
                                <div className="control-group">
                                    <label className="control-label">
                                        <Box size={14} /> <span>Material</span>
                                    </label>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                        {['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ffffff'].map(c => (
                                            <button 
                                                key={c}
                                                onClick={() => setMaterialColor(c)}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '4px',
                                                    background: c,
                                                    border: materialColor === c ? '2px solid white' : 'none',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <div className="advanced-controls">
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
                                style={{ width: '100%' }}
                                onChange={(e) => setOrbitRadius(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-group" style={{ marginTop: '12px' }}>
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
                                style={{ width: '100%' }}
                                onChange={(e) => setOrbitSpeed(Number(e.target.value))}
                            />
                        </div>
                    </div>
                }
            />
        </div>
    );
};
