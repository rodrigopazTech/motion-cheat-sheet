export type Language = 'en' | 'es';

export const translations = {
    en: {
        // Navigation
        'nav.basics': 'Basics & Timing',
        'nav.3d': '3D Transforms',
        'nav.springs': 'Spring Physics',
        'nav.transitions': 'Transitions',
        'nav.typography': 'Typography',
        'nav.easing': 'Easing Functions',
        'nav.audio': 'Audio & Rhythm',
        'nav.footer': 'For Remotion',

        // App Header
        'app.subtitle': 'Interactive reference for Remotion animations.',
        'app.construction': 'Content for this category is under construction.',

        // Basics
        'basics.title': 'Interpolation (The Core)',
        'basics.desc': 'Map values from one range to another. This is the fundamental building block of most animations.',
        'basics.control.extrapolate': 'Extrapolate (Extend)',

        // 3D
        '3d.flip.title': '3D Card Flip',
        '3d.flip.desc': 'Uses `perspective` and `rotateY` to create depth. Crucial for "flat" elements feeling physical.',
        '3d.orbit.title': '3D Orbital Movement',
        '3d.orbit.desc': 'Simulates 3D space using `Math.sin/cos` for X/Z positions and scaling/opacity for Depth.',
        '3d.control.perspective': 'Perspective',
        '3d.control.rotate': 'Rotation',
        '3d.control.radius': 'Orbit Radius',
        '3d.control.speed': 'Speed',

        // Springs
        'springs.config.title': 'Spring Configuration',
        'springs.config.desc': 'Spring animations feel natural because they are based on physics. Adjust the properties to see how the feel changes.',
        'springs.seq.title': 'Spring Sequence (In & Out)',
        'springs.seq.desc': 'Combine two springs (math subtraction!) to create seamless entrance and exit animations without complex timelines.',
        'springs.control.mass': 'Mass (Weight)',
        'springs.control.damping': 'Damping (Bounciness)',
        'springs.control.stiffness': 'Stiffness (Speed)',
        'springs.control.hold': 'Hold Duration',
        'springs.hint.damping': 'Lower = More Bouncy. Higher = No Bounce.',

        // Transitions
        'transitions.stagger.title': 'Staggered Transitions',
        'transitions.stagger.desc': 'Animate a list of items with a delay between each. The key is `delay = index * staggerFrames`.',
        'transitions.control.stagger': 'Stagger Delay',
        'transitions.control.type': 'Type',

        // Typography
        'typography.typewriter.title': 'Typewriter Effect',
        'typography.typewriter.desc': 'Classic terminal style typing. Uses substring based on frame count.',
        'typography.highlight.title': 'Word Highlight (Karaoke)',
        'typography.highlight.desc': 'Highlights words sequentially. Perfect for captions or emphasizing key points.',
        'typography.control.text': 'Text',
        'typography.control.speed': 'Typing Speed',
        'typography.control.readSpeed': 'Read Speed',

        // Easing
        'easing.title': 'Easing Functions Visualizer',
        'easing.desc': 'Visualize how different easing curves affect motion. The graph shows Value (Y) over Time (X).',
        'easing.control.func': 'Easing Function',
        'easing.analysis': 'Analysis:',
        'easing.desc.linear': 'Constant speed. Mechanical and unnatural.',
        'easing.desc.quad': 'Standard "smooth" motion. Accelerates then decelerates.',
        'easing.desc.cubic': 'Sharper acceleration than Quad. Feels more aggressive.',
        'easing.desc.elastic': 'Overshoots the target and snaps back. Rubber band effect.',
        'easing.desc.bounce': 'Bounces against the target value like a ball dropping.',
        'easing.desc.bezier': 'Custom curve. This examples starts fast and slows down (Ease Out).',

        // Audio
        'audio.title': 'Audio Visualization',
        'audio.desc': 'Drive animations using audio frequency data. Perfect for music videos or podcasts.',
        'audio.control.volume': 'Volume',
    },
    es: {
        // Navigation
        'nav.basics': 'Básicos y Tiempo',
        'nav.3d': 'Transformaciones 3D',
        'nav.springs': 'Físicas (Springs)',
        'nav.transitions': 'Transiciones',
        'nav.typography': 'Tipografía',
        'nav.easing': 'Curvas de Easing',
        'nav.audio': 'Audio y Ritmo',
        'nav.footer': 'Para Remotion',

        // App Header
        'app.subtitle': 'Referencia interactiva para animaciones en Remotion.',
        'app.construction': 'El contenido de esta categoría está en construcción.',

        // Basics
        'basics.title': 'Interpolación (El Núcleo)',
        'basics.desc': 'Mapea valores de un rango a otro. Es el bloque fundamental de la mayoría de las animaciones.',
        'basics.control.extrapolate': 'Extrapolar (Extender)',

        // 3D
        '3d.flip.title': 'Giro de Tarjeta 3D',
        '3d.flip.desc': 'Usa `perspective` y `rotateY` para crear profundidad. Crucial para que elementos planos se sientan físicos.',
        '3d.orbit.title': 'Movimiento Orbital 3D',
        '3d.orbit.desc': 'Simula espacio 3D usando `Math.sin/cos` para posiciones X/Z y escala/opacidad para profundidad.',
        '3d.control.perspective': 'Perspectiva',
        '3d.control.rotate': 'Rotación',
        '3d.control.radius': 'Radio de Órbita',
        '3d.control.speed': 'Velocidad',

        // Springs
        'springs.config.title': 'Configuración de Spring',
        'springs.config.desc': 'Las animaciones Spring se sienten naturales porque se basan en física. Ajusta las propiedades para sentir el cambio.',
        'springs.seq.title': 'Secuencia Spring (Entrada y Salida)',
        'springs.seq.desc': 'Combina dos springs (resta matemática) para crear entradas y salidas fluidas sin líneas de tiempo complejas.',
        'springs.control.mass': 'Masa (Peso)',
        'springs.control.damping': 'Amortiguación (Rebote)',
        'springs.control.stiffness': 'Rigidez (Velocidad)',
        'springs.control.hold': 'Duración de Espera',
        'springs.hint.damping': 'Menor = Más Rebote. Mayor = Sin Rebote.',

        // Transitions
        'transitions.stagger.title': 'Transiciones Escalonadas',
        'transitions.stagger.desc': 'Anima una lista de elementos con retraso entre cada uno. La clave es `delay = index * staggerFrames`.',
        'transitions.control.stagger': 'Retraso (Stagger)',
        'transitions.control.type': 'Tipo',

        // Typography
        'typography.typewriter.title': 'Efecto Máquina de Escribir',
        'typography.typewriter.desc': 'Estilo clásico de terminal. Usa substring basado en el conteo de frames.',
        'typography.highlight.title': 'Resaltado de Palabras (Karaoke)',
        'typography.highlight.desc': 'Resalta palabras secuencialmente. Perfecto para subtítulos o enfatizar puntos clave.',
        'typography.control.text': 'Texto',
        'typography.control.speed': 'Velocidad de Escritura',
        'typography.control.readSpeed': 'Velocidad de Lectura',

        // Easing
        'easing.title': 'Visualizador de Easing',
        'easing.desc': 'Visualiza cómo diferentes curvas afectan el movimiento. El gráfico muestra Valor (Y) vs Tiempo (X).',
        'easing.control.func': 'Función de Easing',
        'easing.analysis': 'Análisis:',
        'easing.desc.linear': 'Velocidad constante. Mecánico y poco natural.',
        'easing.desc.quad': 'Movimiento "suave" estándar. Acelera y luego desacelera.',
        'easing.desc.cubic': 'Aceleración más brusca que Quad. Se siente más agresivo.',
        'easing.desc.elastic': 'Se pasa del objetivo y regresa. Efecto de liga elástica.',
        'easing.desc.bounce': 'Rebota contra el valor objetivo como una pelota cayendo.',
        'easing.desc.bezier': 'Curva personalizada. Este ejemplo comienza rápido y frena (Ease Out).',

        // Audio
        'audio.title': 'Visualización de Audio',
        'audio.desc': 'Controla animaciones usando datos de frecuencia de audio. Perfecto para videos musicales o podcasts.',
        'audio.control.volume': 'Volumen',
    }
};
