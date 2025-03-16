import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as THREE from 'three';

// This component must be used inside the Canvas
export function EnvironmentLoader() {
  const { gl, scene } = useThree();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create a new RGBE loader
    const loader = new RGBELoader();
    
    // Try multiple possible paths to find the HDR file
    const possiblePaths = [
      './city.hdr',
      '/city.hdr',
      'city.hdr',
      '../city.hdr',
      '/public/city.hdr',
      '../public/city.hdr'
    ];
    
    let currentPathIndex = 0;
    
    const tryLoadHDR = () => {
      if (currentPathIndex >= possiblePaths.length) {
        console.error('Failed to load HDR from any path');
        setError('Failed to load HDR from any path');
        // Fallback to a solid color background
        scene.background = new THREE.Color('#121212');
        return;
      }
      
      const currentPath = possiblePaths[currentPathIndex];
      console.log(`Trying to load HDR from: ${currentPath}`);
      
      // Load the HDR file
      loader.load(
        currentPath,
        (texture) => {
          console.log(`Successfully loaded HDR from: ${currentPath}`);
          // Configure the texture
          const pmremGenerator = new THREE.PMREMGenerator(gl);
          pmremGenerator.compileEquirectangularShader();
          
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;
          
          // Set the scene environment and background
          scene.environment = envMap;
          scene.background = envMap;
          scene.backgroundIntensity = 0.4;
          scene.backgroundBlurriness = 0.3;
          
          // Clean up
          texture.dispose();
          pmremGenerator.dispose();
          
          setLoaded(true);
        },
        undefined,
        (error) => {
          console.error(`Error loading HDR from ${currentPath}:`, error);
          // Try the next path
          currentPathIndex++;
          tryLoadHDR();
        }
      );
    };
    
    // Start trying to load the HDR file
    tryLoadHDR();
    
    // Clean up function
    return () => {
      scene.environment = null;
      scene.background = new THREE.Color('#121212');
    };
  }, [gl, scene]);
  
  // This component doesn't render anything
  return null;
}
