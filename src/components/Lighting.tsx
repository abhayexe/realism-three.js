import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, CameraHelper } from "three";
import { useHelper } from "@react-three/drei";

interface LightingProps {
  color?: string;
  intensity?: number;
}

export function Lighting({
  color = "#ffffff",
  intensity = 5.5,
}: LightingProps) {
  const lightRef = useRef<DirectionalLight>(null);

  // Uncomment to debug shadow camera
  // useHelper(lightRef, DirectionalLightHelper, 1, 'red');
  // useHelper(lightRef, CameraHelper);

  return (
    <>
      <directionalLight
        ref={lightRef}
        color={color}
        position={[18, 19, 5]} //5,15,5
        // position={[15, 15, 15]}
        intensity={intensity}
        castShadow
        shadow-bias={-0.001}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      {/* <directionalLight
        position={[-5, 10, -5]}
        intensity={0.2}
        castShadow={true}
      /> */}
      {/* <ambientLight intensity={0.3} color="white"/> */}
      {/* <hemisphereLight
        intensity={1.5}
        color="blue"
        groundColor="red"
      /> */}
    </>
  );
}
