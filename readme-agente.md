# 📋 **GUÍA COMPLETA PARA AGENTES IA: CREACIÓN DE VIDEOS CON REMOTION**
## 🎯 **INTRODUCCIÓN**
Este documento contiene todo el conocimiento esencial para que un agente de IA pueda crear videos profesionales con Remotion. Incluye lecciones aprendidas, errores comunes, mejores prácticas y reglas críticas basadas en experiencia real de producción.
## 🏗️ **CONCEPTOS FUNDAMENTALES DE REMOTION**
### **1. Estructura Base del Proyecto**
```typescript
// Configuración típica de composición
<Composition
  id="VideoName"
  component={ComponentName}
  durationInFrames={1200}    // 40s a 30fps
  fps={30}                   // o 60 para animaciones fluidas
  width={1920}               // o 1080 para vertical
  height={1080}              // o 1920 para vertical
/>
```
### **2. Hooks Esenciales**
- `useCurrentFrame()`: Frame actual para calcular animaciones
- `useVideoConfig()`: Obtener fps, width, height, durationInFrames
- `spring()`: Animaciones elásticas naturales
- `interpolate()`: Mapeo de valores entre rangos
### **3. Timing y Frames**
```typescript
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
// Cálculos temporales
const segundos = frame / fps;
const frameEnSegundo = segundo * fps;
```
## ⚠️ **ERRORES CRÍTICOS Y SOLUCIONES**
### **1. ERROR: Interpolation InputRange No Monótono**
```typescript
// ❌ INCORRECTO - Valores duplicados
const rotation = interpolate(frame, [0, 60, fps * 2, fps * 4], [...]);
// Cuando fps=30: [0, 60, 60, 120] - ¡60 duplicado!
// ✅ CORRECTO - Siempre creciente
const rotation = interpolate(frame, [0, fps * 1, fps * 2, fps * 4], [...]);
// Resultado: [0, 30, 60, 120] - Estrictamente creciente
```
**REGLA CRÍTICA**: Los arrays de `inputRange` SIEMPRE deben ser estrictamente monótono crecientes.
### **2. ERROR: Importación de Assets**
```typescript
// ❌ PROBLEMÁTICO - Archivos pueden corromperse
import logo from './assets/logo.jpg';
// ✅ SOLUCIÓN ROBUSTA - Usar emojis o componentes
const Logo = () => <div style={{fontSize: '40px'}}>🦅</div>;
```
**REGLA**: Preferir emojis, íconos SVG inline o componentes sobre archivos externos para máxima confiabilidad.
### **3. ERROR: Z-Index y Layering**
```typescript
// ❌ PROBLEMÁTICO - Elementos superpuestos
<div style={{ position: 'absolute' }}>
  <ComponenteA />
  <ComponenteB /> {/* Puede quedar detrás */}
</div>
// ✅ SOLUCIÓN - Z-index explícito
<div style={{ position: 'absolute', zIndex: 10 }}>
  <ComponenteA />
</div>
<div style={{ position: 'absolute', zIndex: 20 }}>
  <ComponenteB />
</div>
```
## 🎨 **REGLAS DE DISEÑO PROFESIONAL**
### **1. Timing y Ritmo**
```typescript
// Duración de transiciones estándar
const fadeTransition = 30; // 1 segundo a 30fps
const quickTransition = 15; // 0.5 segundos
const dramaticPause = 60;   // 2 segundos
// Secuenciación escalonada
const elementDelay = 20; // Entre elementos
const phaseTransition = 90; // Entre fases principales
```
### **2. Easing y Suavidad**
```typescript
// Interpolaciones suaves
const smoothMove = interpolate(
  frame,
  [start, end],
  [fromValue, toValue],
  { 
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  }
);
// Spring para entradas naturales
const naturalEntry = spring({
  frame: localFrame,
  fps,
  config: { 
    damping: 10,    // Controla rebote (5-15 típico)
    stiffness: 80   // Controla velocidad (50-100 típico)
  }
});
```
### **3. Jerarquía Visual**
```typescript
// Sistema de colores corporativo
export const BRAND_COLORS = {
  primary: '#1a237e',      // Azul corporativo
  secondary: '#ff6f00',    // Naranja energético  
  accent: '#00bcd4',       // Cyan tecnológico
  background: '#fafafa',   // Gris muy claro
  text: '#212121',         // Gris oscuro
  textLight: '#757575'     // Gris medio
};
// Tipografía jerárquica
export const TEXT_STYLES = {
  hero: { fontSize: 48, fontWeight: 'bold' },
  title: { fontSize: 32, fontWeight: '600' },
  subtitle: { fontSize: 24, fontWeight: '500' },
  body: { fontSize: 16, fontWeight: 'normal' },
  caption: { fontSize: 12, fontWeight: '400' }
};
```
## 🎬 **ESTRUCTURA DE VIDEO PROFESIONAL**
### **1. Arquitectura de Componentes**
```typescript
// Estructura recomendada
src/
├── components/
│   ├── scenes/
│   │   ├── IntroScene.tsx      // 0-10s
│   │   ├── MainContent.tsx     // 10-28s
│   │   ├── FeatureDemo.tsx     // 28-32s
│   │   └── OutroScene.tsx      // 32-40s
│   ├── elements/
│   │   ├── Logo.tsx
│   │   ├── AnimatedText.tsx
│   │   └── ParticleSystem.tsx
│   └── transitions/
│       ├── FadeTransition.tsx
│       └── SlideTransition.tsx
├── assets/
│   ├── colors.ts
│   ├── typography.ts
│   └── animations.ts
└── MainComposition.tsx
```
### **2. Timing Profesional**
```typescript
// Estructura temporal típica (40s total)
const SCENES = {
  intro: { start: 0, end: 300 },        // 0-10s: Branding
  main: { start: 300, end: 840 },       // 10-28s: Contenido
  feature: { start: 840, end: 960 },    // 28-32s: Demo
  transition: { start: 960, end: 1050 }, // 32-35s: Transición
  outro: { start: 1050, end: 1200 }     // 35-40s: Call to action
};
```
## ⚡ **ANIMACIONES 3D AVANZADAS**
### **1. Transformaciones 3D Realistas**
```typescript
const transform3D = `
  perspective(1200px)
  rotateX(${rotX}deg)
  rotateY(${rotY}deg) 
  rotateZ(${rotZ}deg)
  scale3d(${scale}, ${scale}, ${scale})
  translate3d(${x}px, ${y}px, ${z}px)
`;
// Orden importa: perspective primero, transforms después
```
### **2. Sistema de Partículas**
```typescript
interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  velocity: { x: number; y: number; z: number };
  life: number;
  maxLife: number;
  color: string;
  size: number;
}
const createParticleSystem = (count: number, behavior: 'orbit' | 'explosion' | 'flow') => {
  // Implementación basada en comportamiento deseado
};
```
### **3. Movimiento Orbital Suave**
```typescript
const createOrbitalMotion = (frame: number, radius: number, speed: number) => {
  const angle = (frame * speed) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.3, // Elipse para perspectiva
    z: Math.sin(angle) * radius * 0.1   // Profundidad sutil
  };
};
```
## 📱 **FORMATOS Y ESPECIFICACIONES**
### **1. Formato Vertical (Mobile-First)**
```typescript
// Configuración móvil
const MOBILE_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 60,          // Para máxima fluidez
  aspectRatio: '9:16'
};
```
### **2. Formato Horizontal (Desktop/Corporate)**
```typescript
// Configuración corporativa
const CORPORATE_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,          // Estándar corporativo
  aspectRatio: '16:9'
};
```
## 🎵 **EFECTOS AUDIOVISUALES**
### **1. Visualización de Audio**
```typescript
const audioVisualization = {
  waveform: interpolate(frame, [0, 60], [0, 100]),
  pulse: Math.sin((frame * 4) * Math.PI / 180),
  beat: frame % 30 === 0 ? 1.2 : 1.0 // Pulso cada segundo
};
// Aplicar a elementos
const pulseScale = 1 + (audioVisualization.pulse * 0.1);
```
### **2. Partículas con Trails**
```typescript
const particleWithTrail = {
  current: { x: currentX, y: currentY },
  history: positions.slice(-10), // Últimas 10 posiciones
  opacity: interpolate(index, [0, 9], [1, 0.1]) // Fade trail
};
```
## 🌍 **INTERNACIONALIZACIÓN**
### **1. Texto Dinámico en Español**
```typescript
const SPANISH_TEXTS = {
  llm: {
    title: "LLM",
    subtitle: "Modelo de Lenguaje",
    description: "Responde preguntas"
  },
  agent: {
    title: "Agente IA", 
    subtitle: "Inteligencia Activa",
    description: "Ejecuta acciones"
  },
  transition: {
    versus: "vs",
    evolution: "Evolución",
    breakthrough: "Ruptura de límites"
  }
};
```
## 🔧 **DEBUGGING Y OPTIMIZACIÓN**
### **1. Performance Tips**
```typescript
// Evitar cálculos costosos en cada frame
const memoizedCalculation = useMemo(() => {
  return heavyCalculation(parameters);
}, [parameters]);
// Limitar partículas basado en performance
const particleCount = frame < 600 ? 100 : 200; // Menos al inicio
```
### **2. Error Handling**
```typescript
const SafeComponent = ({ startFrame, endFrame }: Props) => {
  const frame = useCurrentFrame();
  
  // Validación de rango
  if (frame < startFrame || frame > endFrame) {
    return null;
  }
  
  // Validación de valores
  const safeValue = isNaN(calculatedValue) ? 0 : calculatedValue;
  
  return <div>{/* Contenido */}</div>;
};
```
## 📋 **CHECKLIST DE CALIDAD**
### **✅ Pre-Production**
- [ ] Configuración de formato definida (vertical/horizontal)
- [ ] Paleta de colores documentada
- [ ] Timing de escenas planificado
- [ ] Assets necesarios identificados
### **✅ Durante Development**
- [ ] InputRanges siempre monótono crecientes
- [ ] Z-index explícito para layering
- [ ] Performance testing con partículas
- [ ] Transiciones suaves entre escenas
### **✅ Post-Production**
- [ ] Render test completo sin errores
- [ ] Verificación de timing en frames clave
- [ ] Calidad visual en resolución objetivo
- [ ] Export en formato correcto (MP4 H.264)
## 🎯 **PROMPTS EFECTIVOS PARA AGENTES**
### **Para Animaciones 3D:**
```
"Crear esfera wireframe con 200 partículas orbitales, 
radio 150px, rotación Y completa en 4 segundos, 
partículas con trails de 8 frames, 
gradiente azul-cyan, perspective 1200px"
```
### **Para Timing:**
```
"Secuencia escalonada: elemento 1 aparece frame 60, 
elemento 2 frame 80 (+20), elemento 3 frame 100 (+20), 
cada entrada con spring damping 10 stiffness 80, 
duración 30 frames"
```
### **Para Transiciones:**
```
"Fade crossfade entre escenas: escena A opacity 1→0 frames 280-300, 
escena B opacity 0→1 frames 290-310, 
overlap de 20 frames para transición suave"
```
## 🚨 **REGLAS ABSOLUTAS - NUNCA VIOLAR**
1. **InputRange monótono**: Siempre verificar que arrays sean estrictamente crecientes
2. **Frame bounds**: Validar que componentes no rendericen fuera de su rango temporal
3. **Performance first**: Limitar partículas y cálculos complejos
4. **Fallback assets**: Siempre tener backup (emojis) si assets externos fallan
5. **Z-index explicit**: Nunca confiar en orden DOM para layering
6. **Timing validation**: Testear transiciones en frames específicos
7. **Mobile-first**: Si es formato vertical, optimizar para móvil primero
---
**Este documento debe ser la referencia principal para cualquier agente IA que trabaje con Remotion. Actualizar con nuevos aprendizajes conforme se descubran patrones o problemas adicionales.**