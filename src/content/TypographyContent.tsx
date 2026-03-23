import React, { useState } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { TypewriterEffect } from '../compositions/TypewriterEffect';
import { WordHighlight } from '../compositions/WordHighlight';
import { GlitchText } from '../compositions/GlitchText';
import { MaskRevealText } from '../compositions/MaskRevealText';
import { useLanguage } from '../i18n/LanguageContext';
import { Type, Settings2, Palette, Activity, Layers, MousePointer2, Zap, Eye } from 'lucide-react';

export const TypographyContent: React.FC = () => {
    // Shared State for Lab
    const [text, setText] = useState("MOTION STUDIO");
    const [fontSize, setFontSize] = useState(80);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [speed, setSpeed] = useState(3);
    const [color, setColor] = useState('#10b981');
    const [fontWeight, setFontWeight] = useState('900');
    
    // Highlight specific state
    const [highlightSpeed, setHighlightSpeed] = useState(10);
    const [decorationHeight, setDecorationHeight] = useState(100);

    // Glitch specific state
    const [glitchIntensity, setGlitchIntensity] = useState(0.5);
    const [rgbOffset, setRgbOffset] = useState(5);

    // Mask specific state
    const [revealDir, setRevealDir] = useState<'up' | 'down'>('up');

    const { t } = useLanguage();

    return (
        <div className="typography-lab">
            {/* Cinematic Mask Reveal */}
            <ConceptCard
                title="Cinematic Mask Reveal"
                description="Revelación de texto elegante mediante máscaras geométricas y física de muelles."
                component={MaskRevealText}
                inputProps={{ 
                    text: text || "CINEMATIC", 
                    fontSize, 
                    color, 
                    revealDirection: revealDir 
                }}
                durationInFrames={90}
                codeSnippet={`// 1. Mask CSS
<div style={{ overflow: 'hidden' }}>
  <h1 style={{ transform: "translateY(\${y}px)" }}>
    {text}
  </h1>
</div>

// 2. Direction: ${revealDir}`}
                controls={
                    <div className="advanced-controls">
                        <div className="control-section">
                            <div className="control-label" style={{ marginBottom: '12px' }}>
                                <Eye size={14} /> <span>Dirección de Revelación</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['up', 'down'].map((dir) => (
                                    <button
                                        key={dir}
                                        onClick={() => setRevealDir(dir as 'up' | 'down')}
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: revealDir === dir ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        Hacia {dir === 'up' ? 'Arriba' : 'Abajo'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Glitch & RGB Split Studio */}
            <ConceptCard
                title="Glitch & RGB Split Studio"
                description="Efecto de distorsión digital con separación de canales cromáticos y desplazamientos aleatorios."
                component={GlitchText}
                inputProps={{ 
                    text: text || "GLITCH", 
                    fontSize, 
                    glitchIntensity, 
                    rgbOffset 
                }}
                durationInFrames={120}
                codeSnippet={`// 1. RGB Split Layers
<div style={{ color: '#ff0000', transform: "translateX(${-rgbOffset}px)" }} />
<div style={{ color: '#00ffff', transform: "translateX(${rgbOffset}px)" }} />

// 2. Random Glitch Trigger
const isGlitching = random(frame) < ${glitchIntensity.toFixed(2)};`}
                controls={
                    <div className="advanced-controls">
                        <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="control-group">
                                <label className="control-label">
                                    <Zap size={14} /> <span>Intensidad Glitch</span>
                                    <span className="control-value">{(glitchIntensity * 100).toFixed(0)}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={glitchIntensity}
                                    onChange={(e) => setGlitchIntensity(Number(e.target.value))}
                                />
                            </div>
                            <div className="control-group">
                                <label className="control-label">
                                    <Palette size={14} /> <span>RGB Split</span>
                                    <span className="control-value">{rgbOffset}px</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    step="1"
                                    value={rgbOffset}
                                    onChange={(e) => setRgbOffset(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Typewriter Studio */}
            <ConceptCard
                title={t('typography.typewriter.title')}
                description={t('typography.typewriter.desc')}
                component={TypewriterEffect}
                inputProps={{ 
                    text, 
                    speed, 
                    fontSize, 
                    letterSpacing, 
                    color,
                    fontWeight 
                }}
                durationInFrames={150}
                codeSnippet={`// 1. Calculate Progression
const chars = Math.floor(frame / ${speed});

// 2. Apply Custom Styling
<div style={{ 
  fontSize: "${fontSize}px",
  letterSpacing: "${letterSpacing}px",
  color: "${color}"
}}>
  {text.substring(0, chars)}
</div>`}
                controls={
                    <div className="advanced-controls">
                        <div className="control-section">
                            <div className="control-label" style={{ marginBottom: '12px' }}>
                                <Type size={14} /> <span>Texto de Entrada</span>
                            </div>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value.toUpperCase())}
                                placeholder="Escribe algo..."
                                style={{
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--border)',
                                    color: 'white',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    width: '100%',
                                    fontSize: '14px',
                                    marginBottom: '16px',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="control-group">
                                <label className="control-label">
                                    <Settings2 size={14} /> <span>Tamaño</span>
                                    <span className="control-value">{fontSize}px</span>
                                </label>
                                <input
                                    type="range"
                                    min="40"
                                    max="160"
                                    step="2"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                />
                            </div>
                            <div className="control-group">
                                <label className="control-label">
                                    <Layers size={14} /> <span>Espaciado</span>
                                    <span className="control-value">{letterSpacing}px</span>
                                </label>
                                <input
                                    type="range"
                                    min="-10"
                                    max="50"
                                    step="1"
                                    value={letterSpacing}
                                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                            <div className="control-group">
                                <label className="control-label">
                                    <Activity size={14} /> <span>Velocidad</span>
                                    <span className="control-value">{speed}f/char</span>
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
                            <div className="control-group">
                                <label className="control-label">
                                    <Palette size={14} /> <span>Color</span>
                                </label>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                    {['#10b981', '#3b82f6', '#ec4899', '#ffffff', '#f59e0b'].map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => setColor(c)}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: c,
                                                border: color === c ? '2px solid white' : 'none',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Word Highlight & Underline Studio */}
            <ConceptCard
                title={t('typography.highlight.title')}
                description={t('typography.highlight.desc')}
                component={WordHighlight}
                inputProps={{
                    words: text || "MOTION STUDIO",
                    highlightSpeed,
                    fontSize: fontSize - 20,
                    color,
                    decorationHeight
                }}
                durationInFrames={120}
                height={300}
                codeSnippet={`// decorationHeight: ${decorationHeight}%
<span style={{ 
  height: "${decorationHeight}%",
  backgroundColor: "${color}",
  bottom: 0 
}} />`}
                controls={
                    <div className="advanced-controls">
                        <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="control-group">
                                <label className="control-label">
                                    <Activity size={14} /> <span>Velocidad</span>
                                    <span className="control-value">{highlightSpeed}f/word</span>
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
                            <div className="control-group">
                                <label className="control-label">
                                    <MousePointer2 size={14} /> <span>Grosor (Marca)</span>
                                    <span className="control-value">{decorationHeight}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="10"
                                    value={decorationHeight}
                                    onChange={(e) => setDecorationHeight(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            Tip: Ajusta el grosor al 10-20% para <strong>Subrayado</strong> o al 100% para <strong>Resaltado</strong> completo.
                        </div>
                    </div>
                }
            />
        </div>
    );
};
