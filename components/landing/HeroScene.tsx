"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useDetectGPU } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ─── Wireframe house geometry ─── */
function WireframeHouse({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Build house as THREE.Line objects (imperative to avoid JSX SVG conflict)
  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = [];

    const addLine = (pts: [number, number, number][], opacity: number) => {
      const geo = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(...p))
      );
      const mat = new THREE.LineBasicMaterial({
        color: "#60a5fa",
        transparent: true,
        opacity,
      });
      objects.push(new THREE.Line(geo, mat));
    };

    const main = (pts: [number, number, number][]) => addLine(pts, 0.4);
    const subtle = (pts: [number, number, number][]) => addLine(pts, 0.15);

    // Floor outline
    main([[-2, 0, -2], [2, 0, -2]]);
    main([[2, 0, -2], [2, 0, 2]]);
    main([[2, 0, 2], [-2, 0, 2]]);
    main([[-2, 0, 2], [-2, 0, -2]]);

    // Vertical edges
    main([[-2, 0, -2], [-2, 2, -2]]);
    main([[2, 0, -2], [2, 2, -2]]);
    main([[2, 0, 2], [2, 2, 2]]);
    main([[-2, 0, 2], [-2, 2, 2]]);

    // Upper floor outline
    main([[-2, 2, -2], [2, 2, -2]]);
    main([[2, 2, -2], [2, 2, 2]]);
    main([[2, 2, 2], [-2, 2, 2]]);
    main([[-2, 2, 2], [-2, 2, -2]]);

    // Roof ridge
    main([[-2, 2, -2], [0, 3.2, -2]]);
    main([[2, 2, -2], [0, 3.2, -2]]);
    main([[-2, 2, 2], [0, 3.2, 2]]);
    main([[2, 2, 2], [0, 3.2, 2]]);
    main([[0, 3.2, -2], [0, 3.2, 2]]);

    // Internal wall (centre)
    main([[0, 0, -2], [0, 2, -2]]);
    main([[0, 0, 2], [0, 2, 2]]);
    main([[0, 2, -2], [0, 2, 2]]);

    // Door opening (front face)
    main([[-0.4, 0, -2], [-0.4, 1.4, -2]]);
    main([[0.4, 0, -2], [0.4, 1.4, -2]]);
    main([[-0.4, 1.4, -2], [0.4, 1.4, -2]]);

    // Windows
    main([[2, 0.8, -0.5], [2, 1.6, -0.5]]);
    main([[2, 0.8, 0.5], [2, 1.6, 0.5]]);
    main([[2, 0.8, -0.5], [2, 0.8, 0.5]]);
    main([[2, 1.6, -0.5], [2, 1.6, 0.5]]);
    main([[-2, 0.8, -0.5], [-2, 1.6, -0.5]]);
    main([[-2, 0.8, 0.5], [-2, 1.6, 0.5]]);
    main([[-2, 0.8, -0.5], [-2, 0.8, 0.5]]);
    main([[-2, 1.6, -0.5], [-2, 1.6, 0.5]]);

    // Floor grid (subtle interior lines)
    subtle([[-1, 0.001, -2], [-1, 0.001, 2]]);
    subtle([[1, 0.001, -2], [1, 0.001, 2]]);
    subtle([[-2, 0.001, -1], [2, 0.001, -1]]);
    subtle([[-2, 0.001, 0], [2, 0.001, 0]]);
    subtle([[-2, 0.001, 1], [2, 0.001, 1]]);

    return objects;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !mouse.current) return;

    // Smooth mouse following (±5° range)
    targetRotation.current.y = mouse.current.x * 0.08;
    targetRotation.current.x = -mouse.current.y * 0.04;

    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * delta * 2;
    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * delta * 2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, -0.3, 0]}>
        {lineObjects.map((obj, i) => (
          <primitive key={i} object={obj} />
        ))}

        {/* Subtle glow planes for glass panels */}
        <mesh position={[0, 1, -2]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.75, 1.35]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[2, 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1, 0.8]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.03} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Floating particles ─── */
function Particles({ count = 60 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const [data, setData] = useState<{ geometry: THREE.BufferGeometry; velocities: Float32Array } | null>(null);

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      vels[i * 3] = (Math.random() - 0.5) * 0.003;
      vels[i * 3 + 1] = Math.random() * 0.004 + 0.001;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({ geometry: geo, velocities: vels });
  }, [count]);

  useFrame(() => {
    if (!points.current || !data) return;
    const pos = points.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += data.velocities[i * 3];
      arr[i * 3 + 1] += data.velocities[i * 3 + 1];
      arr[i * 3 + 2] += data.velocities[i * 3 + 2];
      if (arr[i * 3 + 1] > 5) {
        arr[i * 3 + 1] = -4;
        arr[i * 3] = (Math.random() - 0.5) * 12;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
    }
    pos.needsUpdate = true;
  });

  if (!data) return null;

  return (
    <points ref={points} geometry={data.geometry}>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Scene wrapper ─── */
function SceneContent({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const gpu = useDetectGPU();
  const particleCount = gpu?.tier && gpu.tier < 2 ? 30 : 60;

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#60a5fa" />
      <pointLight position={[-5, 3, -3]} intensity={0.15} color="#a78bfa" />
      <fog attach="fog" args={["#050508", 8, 20]} />
      <WireframeHouse mouse={mouse} />
      <Particles count={particleCount} />
    </>
  );
}

/* ─── Exported component ─── */
export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  };

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{
          position: [0, 2, 7],
          fov: 45,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
