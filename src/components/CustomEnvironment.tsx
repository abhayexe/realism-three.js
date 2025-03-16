import React from 'react';
import { Environment } from '@react-three/drei';

// This component is safe to use directly in the Canvas
export function CustomEnvironment() {
  return (
    <Environment 
      preset="city"  // Use a preset as a fallback
      background
      resolution={1080}
      backgroundIntensity={0.4}
      backgroundBlurriness={0.3}
      environmentIntensity={0.9}
    />
  );
}
