import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { Reflector } from 'three/addons/objects/Reflector.js';

function ReflectivePlane() {
  const planeRef = useRef<THREE.Group | null>(null); // Type the ref for a THREE.Group

  useEffect(() => {
    const plane = planeRef.current;
    if (plane) {
      // Create the Reflector
      const reflector = new Reflector(new THREE.PlaneGeometry(50, 50), {
        color: 0xffffff,
        textureWidth: window.innerWidth * 2,
        textureHeight: window.innerHeight * 2,
      });

      reflector.rotateX(-Math.PI / 2); // Align the reflector
      reflector.position.set(0, 0, 0);

      // Add the reflector to the plane
      plane.add(reflector);
    }
  }, []);

  return (
    <group ref={planeRef}>
      {/* Reflector will be dynamically added here */}
    </group>
  );
}

export default ReflectivePlane;
