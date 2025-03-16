import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import { Model } from "./Model";
import { Lighting } from "./Lighting";
import { PostProcessing } from "./PostProcessing";
import { PostProcessing2 } from "./PostProcessing2";
import Fog from "./Fog";
import { DropZone } from "./DropZone";
import { Lightformers } from "./Lightformers";
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import {
  Environment,
  BakeShadows,
  AccumulativeShadows,
  RandomizedLight,
  SoftShadows,
  ContactShadows,
  Fisheye,
  OrbitControls,
  Clouds,
  Lightformer,
  Cloud,
} from "@react-three/drei";
import ReflectivePlane from "./ReflectivePlane";
import { Rings } from "./Rings";
import { Boxes } from "./Boxes";
import { PortalCube } from "./PortalCube";
import { FloatingShapes } from "./FloatingShapes";
import { WaveParticles } from "./WaveParticles";
import Blob from "./Blob";
import { Effects } from "./Effects.tsx";
import { SSR } from "./SSR";
import * as THREE from "three";
import { SettingsPanel } from "./SettingsPanel";
import { FirstPersonCamera } from "./FirstPersonCamera";

export default function ModelViewer() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<Group>(null);

  // Settings state
  const [settings, setSettings] = useState({
    enableAccumulativeShadows: true,
    enableLighting: true,
    enableEnvironment: true,
    selectedHDR: "dawn.hdr",
    enableGroundProjection: true,
    enablePostProcessing: false,
    enableSSR: false,
    enableRings: false,
    useFirstPersonCamera: false,
    modelScale: 0.8,
    enableCursor: false,
    shadowColor: "#000000",
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".glb")) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  return (
    <div
      ref={dropRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-full h-screen bg-gray-900 relative"
      style={{ cursor: settings.enableCursor ? "auto" : "default" }}
    >
      {!modelUrl && (
        <DropZone onDragOver={handleDragOver} onDrop={handleDrop} />
      )}

      {/* Settings Panel */}
      <SettingsPanel settings={settings} onSettingsChange={setSettings} />

      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color
          attach="background"
          args={["#121212"]}
          // args={["#eaccc6"]}
        />

        {modelUrl && (
          <group ref={modelRef}>
            <Model
              url={modelUrl}
              scaleMultiplier={settings.modelScale}
              autoPlay={true}
              enableCursor={settings.enableCursor}
            />
          </group>
        )}

        {settings.enableAccumulativeShadows && (
          <AccumulativeShadows
            temporal
            frames={10} // Increased frames for more accumulation
            scale={20}
            position={[0, 0.01, 0]}
            color={settings.shadowColor} // Use the shadow color from settings
            opacity={1} // Increased opacity
            blend={10} // Reduced blend for sharper shadows
          >
            <RandomizedLight
              amount={8} // Increased amount of lights
              radius={4}
              ambient={0.3} // Reduced ambient for stronger contrast
              intensity={2} // Increased intensity
              position={[6, 8, 5]}
              bias={0.001}
            />
          </AccumulativeShadows>
        )}

        {/* <Blob position={[-2, 0.5, -3]} />
          <Blob position={[-2, 1.5, 0]} />
          <Blob position={[2, 1.8, 1]} />
          <Blob position={[-2, 0.2, 4]} />
          <Blob position={[2, 1, -2]} /> */}

        {settings.enableLighting && <Lighting />}
        <SoftShadows
          size={40} // Size of the shadow map (default: 10)
          focus={0.2} // Focus of the shadow (default: 0)
          samples={17} // Number of samples (default: 16)
        />

        {/* <ContactShadows opacity={1.25} color="black" position={[0, -0, 0]} scale={50} blur={.5} far={40} /> */}

        {/* <color attach="background" args={['#fac0a4']} /> */}
        {/* <Fog color="white" near={5} far={300} />  */}

        {settings.enableEnvironment && (
          <Environment
            files={`/${settings.selectedHDR}`} // Notice the leading slash - this points to the public folder
            // path=""
            // preset="sunset"
            background
            // resolution={1080}
            // backgroundRotation ={new THREE.Euler(Math.PI / 4, Math.PI / 6, 0)}
            backgroundIntensity={0.4}
            ground={
              settings.enableGroundProjection
                ? { height: 10, radius: 40, scale: 30 }
                : undefined
            }
            backgroundBlurriness={0.0}
            environmentIntensity={0.1}
          />
        )}

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          // position={[0, -0.05, 0]}
          position={[0, -0.2, 0]}
          receiveShadow
        >
          {/* <planeGeometry args={[50, 50]} /> */}
          <meshStandardMaterial
            color="white"
            metalness={0}
            // emissive={new THREE.Color(255, 0, 0)}
            emissiveIntensity={0.0}
            // side={THREE.BackSide}
            roughness={1}
          />
        </mesh>
        {/* <ReflectivePlane /> */}

        {!settings.useFirstPersonCamera ? (
          <OrbitControls
            makeDefault
            enableRotate={true}
            rotateSpeed={1}
            dampingFactor={0.1}
          />
        ) : (
          <FirstPersonCamera />
        )}

        {settings.enablePostProcessing && <PostProcessing />}
        {/* <Effects /> */}
        {settings.enableSSR && <SSR />}
        {/* <Environment resolution={1024}>
       <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
       <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
       <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
       <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
       <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
       <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
       <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
       <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
       <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
       <Lightformer form="ring" color="red" intensity={10} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
     </Environment> */}

        {/* <PostProcessing2/> */}
        {settings.enableRings && <Rings />}
        {/* <Boxes/> */}
        {/* <FloatingShapes /> */}
        {/* <WaveParticles/> */}
      </Canvas>
    </div>
  );
}
