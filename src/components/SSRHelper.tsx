import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

/**
 * Helper component to ensure SSR works properly with panorama environments
 * This component sets up the necessary properties for SSR to work correctly
 */
export function SSRHelper() {
  const { gl } = useThree();

  useEffect(() => {
    // Enable physically correct lighting for better SSR results
    gl.physicallyCorrectLights = true;

    return () => {
      // Cleanup
      gl.physicallyCorrectLights = false;
    };
  }, [gl]);

  return null;
}
