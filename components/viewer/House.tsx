"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useViewerStore } from "@/store/useViewerStore";

// Room labels & positions for the procedural house
const rooms = [
  { name: "Living Room", position: [0, 0, 0] as [number, number, number], size: [6, 3, 5] as [number, number, number] },
  { name: "Kitchen", position: [7, 0, 0] as [number, number, number], size: [4, 3, 5] as [number, number, number] },
  { name: "Bedroom 1", position: [0, 0, -6] as [number, number, number], size: [4, 3, 4] as [number, number, number] },
  { name: "Bedroom 2", position: [5, 0, -6] as [number, number, number], size: [4, 3, 4] as [number, number, number] },
  { name: "Bathroom", position: [10, 0, -6] as [number, number, number], size: [3, 3, 4] as [number, number, number] },
  { name: "Hallway", position: [4.5, 0, -3] as [number, number, number], size: [2, 3, 2] as [number, number, number] },
];

function Wall({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Floor({
  position,
  size,
  material,
}: {
  position: [number, number, number];
  size: [number, number];
  material: string;
}) {
  const colors: Record<string, string> = {
    wood: "#8B6914",
    marble: "#e8e0d4",
    tile: "#c0bab0",
    concrete: "#999999",
  };

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={size} />
      <meshStandardMaterial
        color={colors[material] || colors.wood}
        roughness={material === "marble" ? 0.2 : 0.6}
        metalness={material === "marble" ? 0.1 : 0.02}
      />
    </mesh>
  );
}

function Window({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 1, 0.08]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Glass */}
      <mesh>
        <boxGeometry args={[1, 0.8, 0.04]} />
        <meshStandardMaterial
          color="#88aaee"
          transparent
          opacity={0.25}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

function FurnitureItem({
  position,
  size,
  color,
  name,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  name: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const setActiveRoom = useViewerStore((s) => s.setActiveRoom);

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
      onClick={() => setActiveRoom(name)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  );
}

export default function House() {
  const wallColor = useViewerStore((s) => s.wallColor);
  const floorMaterial = useViewerStore((s) => s.floorMaterial);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* === LIVING ROOM === */}
      <group position={[0, 0, 0]}>
        {/* Floor */}
        <Floor position={[0, 0, 0]} size={[6, 5]} material={floorMaterial} />
        {/* Walls */}
        <Wall position={[-3, 1.5, 0]} size={[0.15, 3, 5]} color={wallColor} />
        <Wall position={[3, 1.5, 0]} size={[0.15, 3, 5]} color={wallColor} />
        <Wall position={[0, 1.5, -2.5]} size={[6, 3, 0.15]} color={wallColor} />
        <Wall position={[0, 1.5, 2.5]} size={[6, 3, 0.15]} color={wallColor} />
        {/* Ceiling */}
        <Floor position={[0, 3, 0]} size={[6, 5]} material="concrete" />
        {/* Windows */}
        <Window position={[-3.05, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Window position={[0, 1.8, 2.55]} />
        {/* Furniture - Sofa */}
        <FurnitureItem
          position={[-1.5, 0.35, 0]}
          size={[2.5, 0.7, 1]}
          color="#4a3f5e"
          name="Sofa"
        />
        {/* Coffee Table */}
        <FurnitureItem
          position={[0, 0.25, 1]}
          size={[1.2, 0.5, 0.6]}
          color="#5c4a28"
          name="Coffee Table"
        />
        {/* TV Unit */}
        <FurnitureItem
          position={[2.5, 0.4, 0]}
          size={[0.3, 0.8, 1.5]}
          color="#2a2a3a"
          name="TV Unit"
        />
      </group>

      {/* === KITCHEN === */}
      <group position={[7, 0, 0]}>
        <Floor position={[0, 0, 0]} size={[4, 5]} material="tile" />
        <Wall position={[-2, 1.5, 0]} size={[0.15, 3, 5]} color={wallColor} />
        <Wall position={[2, 1.5, 0]} size={[0.15, 3, 5]} color={wallColor} />
        <Wall position={[0, 1.5, -2.5]} size={[4, 3, 0.15]} color={wallColor} />
        <Wall position={[0, 1.5, 2.5]} size={[4, 3, 0.15]} color={wallColor} />
        <Floor position={[0, 3, 0]} size={[4, 5]} material="concrete" />
        <Window position={[2.05, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} />
        {/* Counter */}
        <FurnitureItem
          position={[0, 0.5, -2]}
          size={[3.5, 1, 0.6]}
          color="#e8dcc8"
          name="Kitchen Counter"
        />
        {/* Island */}
        <FurnitureItem
          position={[0, 0.5, 0.5]}
          size={[2, 1, 1]}
          color="#d4c4a0"
          name="Kitchen Island"
        />
      </group>

      {/* === BEDROOM 1 === */}
      <group position={[0, 0, -6]}>
        <Floor position={[0, 0, 0]} size={[4, 4]} material={floorMaterial} />
        <Wall position={[-2, 1.5, 0]} size={[0.15, 3, 4]} color={wallColor} />
        <Wall position={[2, 1.5, 0]} size={[0.15, 3, 4]} color={wallColor} />
        <Wall position={[0, 1.5, -2]} size={[4, 3, 0.15]} color={wallColor} />
        <Wall position={[0, 1.5, 2]} size={[4, 3, 0.15]} color={wallColor} />
        <Floor position={[0, 3, 0]} size={[4, 4]} material="concrete" />
        <Window position={[-2.05, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} />
        {/* Bed */}
        <FurnitureItem
          position={[0, 0.3, -0.5]}
          size={[2, 0.6, 2.2]}
          color="#6b5b7b"
          name="Bed"
        />
        {/* Nightstand */}
        <FurnitureItem
          position={[1.5, 0.3, -0.5]}
          size={[0.5, 0.6, 0.5]}
          color="#5c4a28"
          name="Nightstand"
        />
      </group>

      {/* === BEDROOM 2 === */}
      <group position={[5, 0, -6]}>
        <Floor position={[0, 0, 0]} size={[4, 4]} material={floorMaterial} />
        <Wall position={[-2, 1.5, 0]} size={[0.15, 3, 4]} color={wallColor} />
        <Wall position={[2, 1.5, 0]} size={[0.15, 3, 4]} color={wallColor} />
        <Wall position={[0, 1.5, -2]} size={[4, 3, 0.15]} color={wallColor} />
        <Wall position={[0, 1.5, 2]} size={[4, 3, 0.15]} color={wallColor} />
        <Floor position={[0, 3, 0]} size={[4, 4]} material="concrete" />
        <Window position={[0, 1.8, -2.05]} />
        {/* Bed */}
        <FurnitureItem
          position={[0, 0.3, 0]}
          size={[1.8, 0.6, 2]}
          color="#4a5e3f"
          name="Bed 2"
        />
        {/* Wardrobe */}
        <FurnitureItem
          position={[-1.5, 1, 0]}
          size={[0.6, 2, 1.5]}
          color="#3a3020"
          name="Wardrobe"
        />
      </group>

      {/* === BATHROOM === */}
      <group position={[10, 0, -6]}>
        <Floor position={[0, 0, 0]} size={[3, 4]} material="tile" />
        <Wall position={[-1.5, 1.5, 0]} size={[0.15, 3, 4]} color="#d8e0e8" />
        <Wall position={[1.5, 1.5, 0]} size={[0.15, 3, 4]} color="#d8e0e8" />
        <Wall position={[0, 1.5, -2]} size={[3, 3, 0.15]} color="#d8e0e8" />
        <Wall position={[0, 1.5, 2]} size={[3, 3, 0.15]} color="#d8e0e8" />
        <Floor position={[0, 3, 0]} size={[3, 4]} material="tile" />
        <Window position={[1.55, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} />
        {/* Bathtub */}
        <FurnitureItem
          position={[0, 0.35, -0.8]}
          size={[1.8, 0.7, 0.8]}
          color="#e8e8f0"
          name="Bathtub"
        />
        {/* Sink */}
        <FurnitureItem
          position={[-0.8, 0.45, 1.2]}
          size={[0.6, 0.9, 0.5]}
          color="#e8e8f0"
          name="Sink"
        />
      </group>

      {/* === GROUND PLANE === */}
      <mesh
        position={[4, -0.01, -2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0a0a14"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}
