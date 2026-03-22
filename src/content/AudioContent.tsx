import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { AudioVisualization } from '../compositions/AudioVisualization';
import { useLanguage } from '../i18n/LanguageContext';
import { Music, BarChart3, Palette, Activity } from 'lucide-react';

export const AudioContent: React.FC = () => {
    const [volume, setVolume] = useState(0.5);
    const [sensitivity, setSensitivity] = useState(1);
    const [bars, setBars] = useState(32);
    const [color, setColor] = useState('#3b82f6');
    
    const { t } = useLanguage();

    return (
        <div className="audio-lab">
            <ConceptCard
                title={t('audio.title')}
                description={t('audio.desc')}
                component={AudioVisualization}
                inputProps={{ volume, sensitivity, bars, color }}
                durationInFrames={300}
                codeSnippet={`// 1. Get Data & Sensitivity
const sensitivity = ${sensitivity};
const height = rms * 500 * sensitivity;

// 2. Styling
<div style={{ backgroundColor: "${color}", width: 100 / ${bars} }} />`}
                controls={
                    <div className="advanced-controls">
                        <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="control-group">
                                <label className="control-label">
                                    <Music size={14} /> <span>Volumen</span>
                                    <span className="control-value">{(volume * 100).toFixed(0)}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={volume}
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                />
                            </div>
                            <div className="control-group">
                                <label className="control-label">
                                    <Activity size={14} /> <span>Sensibilidad</span>
                                    <span className="control-value">{sensitivity}x</span>
                                </label>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="3"
                                    step="0.1"
                                    value={sensitivity}
                                    onChange={(e) => setSensitivity(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                            <div className="control-group">
                                <label className="control-label">
                                    <BarChart3 size={14} /> <span>Densidad (Barras)</span>
                                    <span className="control-value">{bars}</span>
                                </label>
                                <input
                                    type="range"
                                    min="16"
                                    max="128"
                                    step="8"
                                    value={bars}
                                    onChange={(e) => setBars(Number(e.target.value))}
                                />
                            </div>
                            <div className="control-group">
                                <label className="control-label">
                                    <Palette size={14} /> <span>Color del Tema</span>
                                </label>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                    {['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'].map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => setColor(c)}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: c,
                                                border: color === c ? '2px solid white' : 'none',
                                                cursor: 'pointer',
                                                boxShadow: color === c ? `0 0 10px ${c}` : 'none'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};
