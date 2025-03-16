import React from 'react';
import * as THREE from 'three'; // Import THREE for accessing fog
import { useThree } from '@react-three/fiber';

interface FogProps {
  color?: string; // Default: "white"
  near?: number;  // Default: 1
  far?: number;   // Default: 15
}

const Fog: React.FC<FogProps> = ({ color = 'white', near = 1, far = 15 }) => {
  const { scene } = useThree();

  React.useEffect(() => {
    // Apply fog to the scene
    scene.fog = new THREE.Fog(color, near, far);

    // Clean up fog when the component unmounts
    return () => {
      scene.fog = null;
    };
  }, [scene, color, near, far]);

  return null;
};

export default Fog;
