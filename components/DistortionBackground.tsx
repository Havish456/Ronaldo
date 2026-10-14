'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '@/lib/store'

// ─── Shader source ─────────────────────────────────────────────────────
// Adapted from Codrops' "Pixel Distortion Effect with Three.js"
// https://tympanus.net/codrops/2022/01/12/pixel-distortion-effect-with-three-js/

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 371.0)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  void main() {
    vUv = uv;
    // Subtle noise-driven vertex displacement from cursor
    vec2 h = hash(uv * 3.0 + uTime * 0.2 + uMouse * 5.0);
    vec3 displaced = position;
    displaced.x += h.x * 0.015 * uIntensity;
    displaced.y += h.y * 0.015 * uIntensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec2 uResolution;
  uniform float uProgress;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.5823, 71.2347))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Cursor-based displacement — smoothed & subtle
    vec2 mouse = uMouse - 0.5;
    vec2 mouseDisplace = mouse * 0.03 * uIntensity;

    float timeFlow = uTime * 0.3;
    vec2 distortedUv = vUv;
    distortedUv.x += sin(timeFlow + vUv.y * 10.0) * 0.01 * uIntensity;
    distortedUv.y += cos(timeFlow + vUv.x * 10.0) * 0.01 * uIntensity;
    distortedUv += mouseDisplace;

    // Layered FBM noise for organic texture
    float noiseValue = fbm(distortedUv * 3.0 + timeFlow * 0.5);
    noiseValue = smoothstep(-0.1, 0.9, noiseValue);

    // Smooth cinematic base: deep charcoal with subtle blue-red shift
    // Shifts hue smoothly with scroll progress for era transitions
    float t = uProgress;
    vec3 baseColor = mix(
      vec3(0.02, 0.02, 0.025),
      vec3(0.035, 0.02, 0.025),
      t
    );

    // Scroll-driven accent shift: red → amber → gold
    float hueShift = t * 0.12;
    vec3 accentShift = vec3(
      0.04 + 0.03 * sin(t * 3.14159 * 0.5),
      0.03 + 0.015 * cos(t * 3.14159),
      0.04 + 0.02 * sin(t * 3.14159 * 1.3)
    );

    vec3 color = mix(baseColor, accentShift, 0.25 + noiseValue * 0.12);

    // Subtle radial highlight at cursor
    vec2 dist = vUv - uMouse;
    float radial = exp(-length(dist) * 3.5) * 0.015 * uIntensity;
    color += vec3(radial * 0.8, radial * 0.4, radial * 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`

const useMouse = () => {
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const target = useRef(new THREE.Vector2(0.5, 0.5))

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight // flip Y for shader space
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return { mouse, target }
}

/** DistortionPlane — full-screen quad with the displacement shader */
function DistortionPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { mouse, target } = useMouse()
  const scrollProgress = useScrollProgress()

  // Lerp mouse & sync scroll-driven uniforms every frame.
  useFrame(({ clock, viewport }) => {
    if (!materialRef.current) return

    // Smoothly lerp the cursor position for a natural trail feel
    mouse.current.lerp(target.current, 0.08)

    // Scroll progress feeds both intensity and color shift
    const intensity = scrollProgress * 0.5

    materialRef.current.uniforms.uMouse.value.copy(mouse.current)
    materialRef.current.uniforms.uIntensity.value = intensity
    materialRef.current.uniforms.uTime.value = clock.elapsedTime
    materialRef.current.uniforms.uProgress.value = scrollProgress
    materialRef.current.uniforms.uResolution.value.set(
      viewport.width,
      viewport.height
    )
  })

  return (
    <mesh ref={meshRef as any}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef as any}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uIntensity: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(
              typeof window !== 'undefined' ? window.innerWidth : 1,
              typeof window !== 'undefined' ? window.innerHeight : 1
            ),
          },
          uProgress: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── CSS Gradient Fallback ─────────────────────────────────────────────
function CSSFallbackBackground({ scrollProgress }: { scrollProgress: number }) {
  const hueShift = scrollProgress * 12

  return (
    <div
      className="fixed inset-0 -z-10 transition-colors duration-500"
      style={{
        backgroundImage: `
          radial-gradient(
            circle at 50% 50%,
            hsla(220, 25%, 8%, 0.8),
            hsla(240, 20%, 3%, 0.95)
          ),
          linear-gradient(
            to bottom,
            hsl(220, 18%, 3%),
            hsl(${220 + hueShift}, 20%, 5%)
          )
        `,
      }}
    />
  )
}

type DistortionBackgroundProps = {
  enabled?: boolean
}

/**
 * DistortionBackground
 *
 * Fullscreen WebGL distortion plane (adapted from Codrops'
 * pixel-distortion-effect) that reacts to cursor position and
 * global scroll progress. Falls back to a CSS gradient if WebGL
 * or the Canvas fails to initialise.
 */
export function DistortionBackground({
  enabled = true,
}: DistortionBackgroundProps) {
  const [hasWebGL, setHasWebGL] = useState(true)
  const scrollProgress = useScrollProgress()

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    if (!gl) setHasWebGL(false)
  }, [])

  if (!enabled || !hasWebGL) {
    return <CSSFallbackBackground scrollProgress={scrollProgress} />
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1] }}
      >
        <DistortionPlane />
      </Canvas>
    </div>
  )
}
