import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

type TransitionType = 'fade' | 'slide' | 'scale';

export const StaggeredTransitions: React.FC<{
    staggerFrames: number;
    type: TransitionType;
}> = ({ staggerFrames, type }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const items = [
        { title: 'Concept', color: '#3b82f6' },
        { title: 'Design', color: '#8b5cf6' },
        { title: 'Animation', color: '#ec4899' },
        { title: 'Render', color: '#10b981' },
    ];

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0f172a',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 20,
            }}
        >
            <h2 style={{ color: 'white', marginBottom: 30, fontFamily: 'sans-serif' }}>
                Project Flow
            </h2>

            {items.map((item, index) => {
                // Calculate start time for this item
                const delay = index * staggerFrames;

                // Local frame for this item's animation (starts at 0 when frame >= delay)
                const itemFrame = Math.max(0, frame - delay);

                let style: React.CSSProperties = {};

                if (type === 'fade') {
                    const opacity = interpolate(itemFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
                    style = { opacity };
                } else if (type === 'slide') {
                    const opacity = interpolate(itemFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
                    // const x = interpolate(itemFrame, [0, 20], [-100, 0], { extrapolateRight: 'clamp' }); // Slide from left
                    // Using spring for smoother slide
                    const smoothX = spring({ frame: itemFrame, fps, config: { damping: 15 } }) * 100 - 100;

                    style = { opacity, transform: `translateX(${smoothX}px)` };
                } else if (type === 'scale') {
                    const scale = spring({ frame: itemFrame, fps, config: { stiffness: 200, damping: 15 } });
                    style = { transform: `scale(${scale})` };
                }

                return (
                    <div
                        key={index}
                        style={{
                            width: 400,
                            height: 60,
                            backgroundColor: 'rgba(30, 41, 59, 0.8)',
                            borderRadius: 12,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 20px',
                            borderLeft: `4px solid ${item.color}`,
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 500,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            ...style,
                        }}
                    >
                        <span style={{ marginRight: 'auto' }}>{item.title}</span>
                        <span style={{ fontSize: 12, opacity: 0.5 }}>Step {index + 1}</span>
                    </div>
                );
            })}

            <div style={{ position: 'absolute', bottom: 50, color: '#94a3b8', fontSize: 14 }}>
                Stagger delay: {staggerFrames} frames
            </div>
        </AbsoluteFill>
    );
};
