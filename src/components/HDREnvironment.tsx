import { useEffect, useState } from 'react';
import { Environment } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as THREE from 'three';

// Import the HDR file directly
import cityHDRPath from '../assets/city.hdr?url';

export function HDREnvironment() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loader = new RGBELoader();
    setLoading(true);
    
    console.log('Loading HDR from path:', cityHDRPath);
    
    loader.load(
      cityHDRPath,
      (texture) => {
        console.log('Successfully loaded HDR');
        texture.mapping = THREE.EquirectangularReflectionMapping;
        setTexture(texture);
        setLoading(false);
      },
      (progress) => {
        console.log(`Loading HDR: ${Math.round((progress.loaded / progress.total) * 100)}%`);
      },
      (error) => {
        console.error('Error loading HDR:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => {
      if (texture) {
        texture.dispose();
      }
    };
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    console.error('Failed to load HDR environment:', error);
    // Fallback to a preset if loading fails
    return (
      <Environment
        preset="city"
        background
        resolution={1080}
        backgroundIntensity={0.4}
        backgroundBlurriness={0.3}
        environmentIntensity={0.9}
      />
    );
  }

  return texture ? (
    <Environment
      map={texture}
      background
      resolution={1080}
      backgroundIntensity={0.4}
      backgroundBlurriness={0.3}
      environmentIntensity={0.9}
    />
  ) : null;
}
