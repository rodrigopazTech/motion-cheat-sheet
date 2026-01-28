import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

export const EasingGraph: React.FC<{
    easingName: string;
}> = ({ easingName }) => {
    const frame = useCurrentFrame();
    const width = 600;
    const height = 300;
    const duration = 60;

    // Resolve easing function
    let easingFn = Easing.linear;
    if (easingName === 'quad') easingFn = Easing.inOut(Easing.quad);
    if (easingName === 'cubic') easingFn = Easing.inOut(Easing.cubic);
    if (easingName === 'elastic') easingFn = Easing.out(Easing.elastic(1));
    if (easingName === 'bounce') easingFn = Easing.out(Easing.bounce);
    if (easingName === 'bezier') easingFn = Easing.bezier(0.17, 0.67, 0.83, 0.67);

    // Calculate current progress
    const progress = interpolate(frame % (duration + 20), [0, duration], [0, 1], {
        extrapolateRight: 'clamp',
        easing: easingFn
    });

    // Calculate Linear progress for X axis
    const linearProgress = interpolate(frame % (duration + 20), [0, duration], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Generate SVG Path
    const points = [];
    for (let i = 0; i <= 100; i++) {
        const p = i / 100;
        const val = easingFn(p); // 0 to 1
        const x = p * width;
        const y = height - (val * height); // Invert Y for SVG
        points.push(`${x},${y}`);
    }
    const pathData = `M ${points.join(' L ')}`;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0f172a',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ position: 'relative', width, height }}>
                {/* Grid / Axes */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 1, background: '#334155' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: '100%', background: '#334155' }} />

                {/* The Curve */}
                <svg width={width} height={height} style={{ overflow: 'visible' }}>
                    <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth={4} />
                </svg>

                {/* The Ball - moves along the curve */}
                <div
                    style={{
                        position: 'absolute',
                        left: linearProgress * width - 10, // Moves linearly in time (X)
                        top: height - (progress * height) - 10, // Moves with easing in value (Y)
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#ec4899',
                        boxShadow: '0 0 20px #ec4899',
                    }}
                />

                {/* Reference: Linear Ball (for comparison) */}
                <div
                    style={{
                        position: 'absolute',
                        right: -50,
                        bottom: linearProgress * height - 10,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#475569',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        right: -80,
                        bottom: progress * height - 10,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#ec4899',
                    }}
                />
            </div>

            <div style={{ marginTop: 40, color: '#94a3b8' }}>
                Frame: {(frame % (duration + 20)).toFixed(0)}/{duration} | Value: {progress.toFixed(2)}
            </div>
        </AbsoluteFill>
    );
};
