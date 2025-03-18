import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

interface PanoramaEnvironmentProps {
  imagePath: string;
}

export function PanoramaEnvironment({ imagePath }: PanoramaEnvironmentProps) {
  const { scene } = useThree();
  const texture = useTexture(imagePath);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!texture) return;

    // Configure texture for panorama
    texture.mapping = THREE.EquirectangularReflectionMapping;

    // Store original background and environment
    const originalBackground = scene.background;
    const originalEnvironment = scene.environment;

    // Set the scene background and environment
    if (isActive) {
      scene.background = texture;
      scene.environment = texture;
    }

    return () => {
      // Only reset if we were the ones who set it
      if (scene.background === texture) {
        scene.background = originalBackground;
      }
      if (scene.environment === texture) {
        scene.environment = originalEnvironment;
      }

      // Don't dispose the texture here as it might be reused
    };
  }, [texture, scene, isActive]);

  // When the image path changes, update the texture
  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, [imagePath]);

  // This component doesn't render anything directly
  return null;
}
