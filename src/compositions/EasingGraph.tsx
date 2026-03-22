import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

export const EasingGraph: React.FC<{
    easingName: string;
    easingMode: string;
    compareWithName?: string | null;
}> = ({ easingName, easingMode, compareWithName }) => {
    const frame = useCurrentFrame();
    const width = 500;
    const height = 250;
    const duration = 60;

    const getEasingFn = (name: string, mode: string = 'inOut') => {
        try {
            if (name === 'linear') return Easing.linear;
            
            // Protección: Verificar si el modo existe en la función de Easing seleccionada
            const baseEasing = Easing[name as keyof typeof Easing];
            if (typeof baseEasing === 'function' && mode in Easing) {
                return (Easing as any)[mode](baseEasing);
            }
            
            // Fallback seguro
            return Easing.inOut(Easing.quad);
        } catch (e) {
            console.warn('Invalid easing configuration:', name, mode);
            return Easing.linear;
        }
    };

    const easingFn = getEasingFn(easingName, easingMode);
    const compareFn = compareWithName ? getEasingFn(compareWithName, 'inOut') : null;

    const progress = interpolate(frame % (duration + 20), [0, duration], [0, 1], {
        extrapolateRight: 'clamp',
        easing: easingFn
    });

    const compareProgress = compareFn ? interpolate(frame % (duration + 20), [0, duration], [0, 1], {
        extrapolateRight: 'clamp',
        easing: compareFn
    }) : null;

    const linearX = interpolate(frame % (duration + 20), [0, duration], [0, 1], {
        extrapolateRight: 'clamp',
    });

    const generatePath = (fn: (t: number) => number) => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const p = i / 100;
            const val = fn(p);
            const x = p * width;
            const y = height - (val * height);
            points.push(`${x},${y}`);
        }
        return `M ${points.join(' L ')}`;
    };

    return (
        <AbsoluteFill style={{ backgroundColor: '#020617', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width, height, borderLeft: '2px solid #1e293b', borderBottom: '2px solid #1e293b' }}>
                {/* Gridlines */}
                {[0.25, 0.5, 0.75].map(v => (
                    <React.Fragment key={v}>
                        <div style={{ position: 'absolute', bottom: v * height, width: '100%', height: 1, background: '#1e293b', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', left: v * width, height: '100%', width: 1, background: '#1e293b', opacity: 0.5 }} />
                    </React.Fragment>
                ))}

                <svg width={width} height={height} style={{ overflow: 'visible' }}>
                    {compareFn && (
                        <path d={generatePath(compareFn)} fill="none" stroke="#6366f1" strokeWidth={2} strokeDasharray="4" opacity={0.5} />
                    )}
                    <path d={generatePath(easingFn)} fill="none" stroke="#3b82f6" strokeWidth={4} strokeLinecap="round" />
                </svg>

                {/* Main Marker */}
                <div style={{
                    position: 'absolute',
                    left: linearX * width - 8,
                    top: height - (progress * height) - 8,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#3b82f6',
                    boxShadow: '0 0 15px #3b82f6',
                    zIndex: 10
                }} />

                {/* Compare Marker */}
                {compareProgress !== null && (
                    <div style={{
                        position: 'absolute',
                        left: linearX * width - 6,
                        top: height - (compareProgress * height) - 6,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: '#6366f1',
                        opacity: 0.7
                    }} />
                )}
            </div>

            <div style={{ marginTop: 30, display: 'flex', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, background: '#3b82f6', borderRadius: 2 }} />
                    <span style={{ color: '#f8fafc', fontSize: 12 }}>{easingName} ({easingMode})</span>
                </div>
                {compareWithName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 12, height: 12, background: '#6366f1', borderRadius: 2 }} />
                        <span style={{ color: '#94a3b8', fontSize: 12 }}>{compareWithName} (inOut)</span>
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};
