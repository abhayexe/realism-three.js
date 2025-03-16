import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Color, Mesh, MeshStandardMaterial } from "three";

interface ShapeProps {
  shape: "sphere" | "torus" | "octahedron";
  baseColor: [number, number, number];
  pathRadius?: number;
}

const glowColors: Color[] = [
  new Color("#FF1493"),  // Deep Pink
  new Color("#4169E1"),  // Royal Blue
  new Color("#FFD700"),  // Gold
  new Color("#7B68EE"),  // Medium Slate Blue
  new Color("#00FA9A"),  // Medium Spring Green
];

function Shape({ shape, baseColor, pathRadius = 5 }: ShapeProps) {
  const mesh = useRef<Mesh>(null);
  const time = useRef<number>(0);
  
  // Initial random properties
  const [rotationSpeed] = useState(() => ({
    x: (Math.random() - 0.5) * 0.2,
    y: (Math.random() - 0.5) * 0.2,
    z: (Math.random() - 0.5) * 0.2
  }));
  const [scale] = useState(() => Math.random() * 0.4 + 0.2);
  const [verticalOffset] = useState(() => Math.random() * 4 - 2);
  const [phase] = useState(() => Math.random() * Math.PI * 2);
  const [glowColor] = useState(() => 
    glowColors[Math.floor(Math.random() * glowColors.length)].clone()
  );
  const [pulseSpeed] = useState(() => Math.random() * 2 + 1);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    time.current += delta;

    // Circular motion
    const angle = time.current * 0.5 + phase;
    const x = Math.cos(angle) * pathRadius;
    const z = Math.sin(angle) * pathRadius;
    const y = verticalOffset + Math.sin(time.current * 0.5) * 0.5;

    mesh.current.position.set(x, y, z);

    // Rotation
    mesh.current.rotation.x += rotationSpeed.x * delta;
    mesh.current.rotation.y += rotationSpeed.y * delta;
    mesh.current.rotation.z += rotationSpeed.z * delta;

    // Pulsing glow effect
    const material = mesh.current.material as MeshStandardMaterial;
    material.emissiveIntensity = 
      0.5 + Math.sin(time.current * pulseSpeed) * 0.3;
  });

  const Geometry = () => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[1, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[1]} />;
    }
  };

  return (
    <mesh
      ref={mesh}
      scale={scale}
      castShadow
      receiveShadow
    >
      <Geometry />
      <meshStandardMaterial
        color={new Color(baseColor[0], baseColor[1], baseColor[2])}
        emissive={glowColor}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  // Create arrays for different shape types
  const [shapes] = useState(() => {
    const shapeTypes: ShapeProps[] = [];
    
    // Add spheres
    for (let i = 0; i < 15; i++) {
      shapeTypes.push({
        shape: "sphere",
        baseColor: [0.7, 0.3, 0.5],
        pathRadius: 3 + Math.random() * 4
      });
    }
    
    // Add toruses
    for (let i = 0; i < 10; i++) {
      shapeTypes.push({
        shape: "torus",
        baseColor: [0.3, 0.5, 0.7],
        pathRadius: 5 + Math.random() * 4
      });
    }
    
    // Add octahedrons
    for (let i = 0; i < 8; i++) {
      shapeTypes.push({
        shape: "octahedron",
        baseColor: [0.5, 0.7, 0.3],
        pathRadius: 7 + Math.random() * 4
      });
    }
    
    return shapeTypes;
  });

  return (
    <>
      {shapes.map((props, i) => (
        <Shape key={i} {...props} />
      ))}
    </>
  );
}