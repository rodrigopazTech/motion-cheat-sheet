import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { TypewriterEffect } from '../compositions/TypewriterEffect';
import { WordHighlight } from '../compositions/WordHighlight';
import { useLanguage } from '../i18n/LanguageContext';

export const TypographyContent: React.FC = () => {
    const [speed, setSpeed] = useState(3);
    const [highlightSpeed, setHighlightSpeed] = useState(10);
    const [text, setText] = useState("Hello World_");

    const { t } = useLanguage();

    return (
        <div>
            {/* Typewriter */}
            <ConceptCard
                title={t('typography.typewriter.title')}
                description={t('typography.typewriter.desc')}
                component={TypewriterEffect}
                inputProps={{ text: text.replace('_', ''), speed }}
                durationInFrames={150}
                codeSnippet={`const charsToShow = Math.floor(frame / ${speed});
const currentText = text.substring(0, charsToShow);

// Blinking cursor
const visible = Math.floor(frame / 15) % 2 === 0;`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('typography.control.text')}</span>
                            </label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                style={{
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--border)',
                                    color: 'white',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    width: '100%',
                                    marginBottom: '10px'
                                }}
                            />
                        </div>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('typography.control.speed')}</span>
                                <span className="control-value">{speed} frames/char</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={speed}
                                onChange={(e) => setSpeed(Number(e.target.value))}
                            />
                        </div>
                    </>
                }
            />

            {/* Word Highlight */}
            <ConceptCard
                title={t('typography.highlight.title')}
                description={t('typography.highlight.desc')}
                component={WordHighlight}
                inputProps={{
                    words: "Motion Graphics are Awesome",
                    highlightSpeed
                }}
                durationInFrames={120}
                height={300}
                codeSnippet={`const startFrame = wordIndex * ${highlightSpeed};
const progress = interpolate(
  frame, 
  [startFrame, startFrame + 5], // 5 frame fade-in
  [0, 1], 
  { extrapolateRight: 'clamp' }
);`}
                controls={
                    <>
                        <div className="control-group">
                            <label className="control-label">
                                <span>{t('typography.control.readSpeed')}</span>
                                <span className="control-value">{highlightSpeed} frames/word</span>
                            </label>
                            <input
                                type="range"
                                min="5"
                                max="30"
                                step="5"
                                value={highlightSpeed}
                                onChange={(e) => setHighlightSpeed(Number(e.target.value))}
                            />
                        </div>
                    </>
                }
            />
        </div>
    );
};
