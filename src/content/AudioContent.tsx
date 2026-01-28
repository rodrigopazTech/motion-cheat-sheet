import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { AudioVisualization } from '../compositions/AudioVisualization';
import { useLanguage } from '../i18n/LanguageContext';

export const AudioContent: React.FC = () => {
    const [volume, setVolume] = useState(0.5);
    const { t } = useLanguage();

    return (
        <div>
            <ConceptCard
                title={t('audio.title')}
                description={t('audio.desc')}
                component={AudioVisualization}
                inputProps={{ volume }}
                durationInFrames={300} // Longer duration for audio
                codeSnippet={`// 1. Get Audio Data
const audioData = useAudioData(src);

// 2. Calculate Amplitude (RMS)
const start = frame * samplesPerFrame;
const sample = audioData.channelWaveforms[0].slice(start, start + window);
const rms = Math.sqrt(sample.reduce((sum, v) => sum + v*v, 0) / window);

// 3. Visualize
<div style={{ height: rms * 500 }} />`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('audio.control.volume')}</span>
                                <span className="control-value">{(volume * 100).toFixed(0)}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                            />
                        </div>
                        <div className="control-group">
                            <p className="control-hint" style={{ marginTop: 10 }}>
                                Note: Visualization uses real-time RMS analysis of the audio track.
                            </p>
                        </div>
                    </>
                }
            />
        </div>
    );
};
