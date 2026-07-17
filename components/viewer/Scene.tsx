"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Grid,
} from "@react-three/drei";
import { Suspense } from "react";
import House from "./House";

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight
        position={[-5, 8, -5]}
        intensity={0.3}
        color="#a78bfa"
      />
      <pointLight position={[0, 2.5, 0]} intensity={0.6} color="#ffd700" distance={8} decay={2} />
      <pointLight position={[7, 2.5, 0]} intensity={0.4} color="#ffffff" distance={6} decay={2} />

      {/* Environment */}
      <Environment preset="apartment" background={false} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#050510", 25, 60]} />

      {/* House */}
      <House />

      {/* Contact Shadows */}
      <ContactShadows
        position={[4, -0.01, -2]}
        opacity={0.5}
        scale={30}
        blur={2}
        far={10}
        frames={1}
        resolution={256}
      />

      {/* Grid */}
      <Grid
        position={[4, -0.005, -2]}
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.3}
        cellColor="#1a1a3a"
        sectionSize={5}
        sectionThickness={0.6}
        sectionColor="#2a2a4a"
        fadeDistance={40}
        fadeStrength={1.5}
        infiniteGrid
      />

      {/* Controls */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.1}
        target={[4, 1, -2]}
      />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [15, 12, 15],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      className="!absolute inset-0"
      style={{ background: "#050510" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
