import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Color, Mesh, MeshStandardMaterial } from "three";

interface ParticleProps {
  position: Vector3;
  color: Color;
}

const particleColors = [
  new Color("#4FC3F7"), // Light Blue
  new Color("#81C784"), // Light Green
  new Color("#9575CD"), // Light Purple
  new Color("#FF8A65"), // Light Red
  new Color("#FFF176"), // Light Yellow
];

function Particle({ position, color }: ParticleProps) {
  const mesh = useRef<Mesh>(null);
  const time = useRef<number>(Math.random() * 100);
  const originalY = useRef<number>(position.y);
  
  const [rotationSpeed] = useState(() => ({
    x: Math.random() * 0.02,
    y: Math.random() * 0.02,
    z: Math.random() * 0.02
  }));
  
  const [scale] = useState(() => Math.random() * 0.3 + 0.1);
  const [waveSpeed] = useState(() => Math.random() * 0.5 + 0.5);
  const [waveHeight] = useState(() => Math.random() * 0.5 + 0.5);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    time.current += delta;

    // Wave motion
    const waveY = Math.sin(time.current * waveSpeed + position.x) * waveHeight;
    mesh.current.position.y = originalY.current + waveY;

    // Gentle spiral motion
    const spiralRadius = 0.2;
    const spiralSpeed = 0.5;
    mesh.current.position.x = position.x + Math.cos(time.current * spiralSpeed) * spiralRadius;
    mesh.current.position.z = position.z + Math.sin(time.current * spiralSpeed) * spiralRadius;

    // Rotation
    mesh.current.rotation.x += rotationSpeed.x;
    mesh.current.rotation.y += rotationSpeed.y;
    mesh.current.rotation.z += rotationSpeed.z;

    // Pulse scale
    const pulseFactor = 1 + Math.sin(time.current * 2) * 0.1;
    mesh.current.scale.setScalar(scale * pulseFactor);

    // Update material properties
    const material = mesh.current.material as MeshStandardMaterial;
    material.emissiveIntensity = 0.5 + Math.sin(time.current * 2) * 0.2;
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      castShadow
      receiveShadow
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.2}
        roughness={0.4}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

export function WaveParticles() {
  const [particles] = useState(() => {
    const items: ParticleProps[] = [];
    const gridSize = 15;
    const spacing = 1;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const position = new Vector3(
          (x - gridSize / 2) * spacing,
          Math.random() * 2 - 1,
          (z - gridSize / 2) * spacing
        );

        const color = particleColors[
          Math.floor(Math.random() * particleColors.length)
        ].clone();

        items.push({ position, color });
      }
    }

    return items;
  });

  return (
    <group position={[0, 0, 0]}>
      {particles.map((props, i) => (
        <Particle key={i} {...props} />
      ))}
    </group>
  );
}

// Optional configuration interface if you want to make it more customizable
export interface WaveParticlesConfig {
  gridSize?: number;
  spacing?: number;
  colors?: Color[];
  waveIntensity?: number;
  rotationSpeed?: number;
}