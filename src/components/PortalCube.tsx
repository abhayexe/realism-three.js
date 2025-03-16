import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Edges, MeshPortalMaterial, CameraControls, Environment, PivotControls } from '@react-three/drei';
import { useControls } from 'leva';

interface SideProps {
  rotation?: [number, number, number];
  bg?: string;
  children: React.ReactNode;
  index: number;
}

const Side: React.FC<SideProps> = ({ rotation = [0, 0, 0], bg = '#f0f0f0', children, index }) => {
  const mesh = useRef<THREE.Mesh>();
  const { worldUnits } = useControls({ worldUnits: false });
  const { nodes } = useGLTF('/aobox-transformed.glb');

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta;
      mesh.current.rotation.y += delta;
    }
  });

  return (
    <MeshPortalMaterial worldUnits={worldUnits} attach={`material-${index}`}>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>
        <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={bg} />
        <spotLight 
          castShadow 
          color={bg} 
          intensity={2} 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          shadow-normalBias={0.05} 
          shadow-bias={0.0001} 
        />
      </mesh>
      <mesh castShadow receiveShadow ref={mesh}>
        {children}
        <meshLambertMaterial color={bg} />
      </mesh>
    </MeshPortalMaterial>
  );
};

interface PortalCubeProps {
  className?: string;
  style?: React.CSSProperties;
}

export const PortalCube: React.FC<PortalCubeProps> = ({ className, style }) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <Canvas shadows camera={{ position: [-3, 0.5, 3] }}>
        <PivotControls anchor={[-1.1, -1.1, -1.1]} scale={0.75} lineWidth={3.5}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 2, 2]} />
            <Edges />
            <Side rotation={[0, 0, 0]} bg="orange" index={0}>
              <torusGeometry args={[0.65, 0.3, 64]} />
            </Side>
            <Side rotation={[0, Math.PI, 0]} bg="lightblue" index={1}>
              <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
            </Side>
            <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="lightgreen" index={2}>
              <boxGeometry args={[1.15, 1.15, 1.15]} />
            </Side>
            <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="aquamarine" index={3}>
              <octahedronGeometry />
            </Side>
            <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
              <icosahedronGeometry />
            </Side>
            <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
              <dodecahedronGeometry />
            </Side>
          </mesh>
        </PivotControls>
        <CameraControls makeDefault />
      </Canvas>
    </div>
  );
};

export default PortalCube;