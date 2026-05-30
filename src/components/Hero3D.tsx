import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Blob({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 16]} />
        {/* @ts-ignore */}
        <MeshDistortMaterial color={color} distort={0.45} speed={2} roughness={0.1} metalness={0.6} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -3, -2]} intensity={0.6} color="#22d3ee" />
          <Blob position={[-2.2, 0.6, 0]} color="#a855f7" scale={1.3} />
          <Blob position={[2.4, -0.4, -1]} color="#22d3ee" scale={1.1} />
          <Blob position={[0.4, -1.2, 1]} color="#ec4899" scale={0.7} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
