import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface PanoramaSphereProps {
  imagePath: string;
}

export function PanoramaSphere({ imagePath }: PanoramaSphereProps) {
  const texture = useTexture(imagePath);
  const meshRef = useRef<THREE.Mesh>(null);

  // Configure texture for panorama
  texture.mapping = THREE.EquirectangularReflectionMapping;

  // Make sure the sphere always follows the camera
  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.position.copy(camera.position);
    }
  });

  return (
    <mesh ref={meshRef} renderOrder={-1000}>
      {/* Use a large sphere and flip it inside out with negative scale */}
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        depthWrite={false} // Prevent z-fighting with other objects
        toneMapped={false} // Preserve HDR values for better lighting
      />
    </mesh>
  );
}
