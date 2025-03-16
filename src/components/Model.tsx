import { useGLTF, useAnimations, PivotControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';

interface ModelProps {
  url: string;
  scaleMultiplier?: number;
  position?: [number, number, number];
  animationIndex?: number;
  autoPlay?: boolean;
  enableCursor?: boolean; // New prop to toggle cursor controls
}

export function Model({
  url,
  scaleMultiplier = 1,
  position = [0, 0, 0],
  animationIndex = 0,
  autoPlay = true,
  enableCursor = true
}: ModelProps) {
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, scene);
  const [modelPosition, setModelPosition] = useState<Vector3>(new Vector3(...position));
  const { camera } = useThree();

  // Enable shadows for all meshes in the model
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Handle animations if they exist
  useEffect(() => {
    if (names.length > 0 && autoPlay) {
      const validIndex = Math.min(animationIndex, names.length - 1);
      const action = actions[names[validIndex]];

      if (action) {
        action.reset().fadeIn(0.5).play();

        return () => {
          action.fadeOut(0.5);
        };
      }
    }
  }, [actions, names, animationIndex, autoPlay]);

  // Apply uniform scaling using the scale multiplier
  const scale = [scaleMultiplier, scaleMultiplier, scaleMultiplier];

  // If cursor controls are disabled, render the model normally
  if (!enableCursor) {
    return <primitive object={scene} scale={scale} position={position} />;
  }

  // Render the model with PivotControls when cursor controls are enabled
  return (
    <PivotControls
      scale={3} // Size of the control gizmo
      anchor={[0, 0, 0]} // Point around which the gizmo will rotate
      onDrag={(matrix) => {
        // Extract the position from the matrix and update state
        const position = new Vector3();
        position.setFromMatrixPosition(matrix);
        setModelPosition(position);
      }}
      activeAxes={[true, true, true]} // Enable movement on all axes
      visible={true} // Always show the controls
    >
      <primitive
        object={scene}
        scale={scale}
        position={modelPosition.toArray()}
      />
    </PivotControls>
  );
}

// Add type safety for the GLTF result
useGLTF.preload = (url: string) => {
  return useGLTF(url);
};