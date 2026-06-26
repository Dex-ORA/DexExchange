import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, AdaptiveDpr, AdaptiveEvents, PointMaterial, Points } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from './useMousePosition'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const count = window.innerWidth < 768 ? 150 : 300

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4 + Math.random() * 6
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * 0.15
    ref.current.rotation.y = t
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.1
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D4A843"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function BlueParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = window.innerWidth < 768 ? 80 : 150

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * 0.1
    ref.current.rotation.y = -t
    ref.current.rotation.z = Math.cos(t) * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E8C260"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

function FloatingGeometries() {
  const geometries = useMemo(() => [
    { position: [-5, 2, -3] as [number, number, number], geometry: 'octahedron', scale: 0.8, color: '#D4A843', speed: 1 },
    { position: [5, -1, -2] as [number, number, number], geometry: 'icosahedron', scale: 0.6, color: '#E8C260', speed: 1.5 },
    { position: [-3, -3, -4] as [number, number, number], geometry: 'dodecahedron', scale: 0.5, color: '#C8962A', speed: 0.8 },
    { position: [4, 3, -5] as [number, number, number], geometry: 'octahedron', scale: 0.7, color: '#F0D070', speed: 1.2 },
    { position: [0, -4, -3] as [number, number, number], geometry: 'icosahedron', scale: 0.4, color: '#D4A843', speed: 1.8 },
    { position: [-6, 0, -6] as [number, number, number], geometry: 'dodecahedron', scale: 0.9, color: '#E8C260', speed: 0.6 },
    { position: [6, 1, -4] as [number, number, number], geometry: 'octahedron', scale: 0.5, color: '#C8962A', speed: 1.4 },
    { position: [2, 4, -7] as [number, number, number], geometry: 'icosahedron', scale: 0.6, color: '#D4A843', speed: 1.0 },
  ], [])

  return (
    <>
      {geometries.map((g, i) => (
        <Float key={i} speed={g.speed} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.3, 0.3]}>
          <mesh position={g.position} scale={g.scale}>
            {g.geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
            {g.geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
            {g.geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
            <meshBasicMaterial color={g.color} wireframe transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.scale.setScalar(1.8 + Math.sin(t * 0.5) * 0.2)
    ref.current.rotation.y = t * 0.1
    ref.current.rotation.z = t * 0.05
  })

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#D4A843" transparent opacity={0.03} />
    </mesh>
  )
}

function CameraController() {
  const mouse = useMousePosition()

  useFrame((state) => {
    state.camera.position.x += (mouse.x * 0.5 - state.camera.position.x) * 0.02
    state.camera.position.y += (mouse.y * 0.3 - state.camera.position.y) * 0.02
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <CameraController />
      <ParticleField />
      <BlueParticles />
      <FloatingGeometries />
      <GlowOrb />
    </Canvas>
  )
}
