import React, { useState, useMemo } from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { SpringConfigurable } from '../compositions/SpringConfigurable';
import { SpringSequence } from '../compositions/SpringSequence';
import { useLanguage } from '../i18n/LanguageContext';
import { Zap, Activity, FastForward, Wind } from 'lucide-react';

const SpringCurveVisualizer: React.FC<{ mass: number, damping: number, stiffness: number }> = ({ mass, damping, stiffness }) => {
    // Función simplificada para previsualizar la curva en el gráfico
    const points = useMemo(() => {
        const pts = [];
        const fps = 30;
        // Simulamos la física para 60 frames
        let val = 0;
        let vel = 0;
        const target = 1;
        
        for (let i = 0; i < 60; i++) {
            const force = (target - val) * stiffness;
            const damp = vel * damping;
            const acc = (force - damp) / mass;
            vel += acc / fps;
            val += vel / fps;
            pts.push(`${(i / 60) * 100},${50 - (val * 30)}`);
        }
        return pts.join(' ');
    }, [mass, damping, stiffness]);

    return (
        <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={12} /> Curva de Respuesta Físiса
            </div>
            <svg viewBox="0 0 100 60" style={{ width: '100%', height: '40px', overflow: 'visible' }}>
                <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
                <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    points={points}
                />
            </svg>
        </div>
    );
};

export const SpringsContent: React.FC = () => {
    const [mass, setMass] = useState(1);
    const [damping, setDamping] = useState(10);
    const [stiffness, setStiffness] = useState(100);
    const [holdDuration, setHoldDuration] = useState(30);

    const { t } = useLanguage();

    const setPreset = (m: number, d: number, s: number) => {
        setMass(m);
        setDamping(d);
        setStiffness(s);
    };

    return (
        <div className="springs-lab">
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
                    <div className="advanced-controls">
                        <div className="preset-buttons" style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                            <button className="preset-btn" onClick={() => setPreset(1, 10, 100)} title="Standard">
                                <Zap size={14} /> Estándar
                            </button>
                            <button className="preset-btn" onClick={() => setPreset(0.5, 5, 200)} title="Snappy">
                                <FastForward size={14} /> Elástico
                            </button>
                            <button className="preset-btn" onClick={() => setPreset(2, 40, 50)} title="Heavy">
                                <Wind size={14} /> Pesado
                            </button>
                            <button className="preset-btn" onClick={() => setPreset(1, 2, 150)} title="Jelly">
                                <Activity size={14} /> Gelatina
                            </button>
                        </div>

                        <div className="control-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="control-group">
                                <label className="control-label">
                                    <span>Masa</span>
                                    <span className="control-value">{mass}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="5"
                                    step="0.1"
                                    value={mass}
                                    onChange={(e) => setMass(Math.max(0.1, Number(e.target.value)))}
                                />
                            </div>
                            <div className="control-group">
                                <label className="control-label">
                                    <span>Amortiguación</span>
                                    <span className="control-value">{damping}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="50"
                                    step="0.5"
                                    value={damping}
                                    onChange={(e) => setDamping(Math.max(0.1, Number(e.target.value)))}
                                />
                            </div>
                        </div>

                        <div className="control-group" style={{ marginTop: '12px' }}>
                            <label className="control-label">
                                <span>Rigidez (Stiffness)</span>
                                <span className="control-value">{stiffness}</span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="500"
                                step="10"
                                value={stiffness}
                                style={{ width: '100%' }}
                                onChange={(e) => setStiffness(Number(e.target.value))}
                            />
                        </div>

                        <SpringCurveVisualizer mass={mass} damping={damping} stiffness={stiffness} />
                    </div>
                }
            />

            <ConceptCard
                title={t('springs.seq.title')}
                description={t('springs.seq.desc')}
                component={SpringSequence}
                inputProps={{ delay: 0, duration: holdDuration }}
                durationInFrames={120}
                codeSnippet={`const entrance = spring({ frame });
const exit = spring({ frame: frame - ${holdDuration} - 30 });

// Result: entrance - exit;`}
                controls={
                    <div className="control-group">
                        <label className="control-label">
                            <span>Duración de espera (Frames)</span>
                            <span className="control-value">{holdDuration}f</span>
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="60"
                            step="5"
                            value={holdDuration}
                            style={{ width: '100%' }}
                            onChange={(e) => setHoldDuration(Number(e.target.value))}
                        />
                    </div>
                }
            />
        </div>
    );
};
