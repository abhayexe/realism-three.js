import { SSR, EffectComposer, Bloom, HueSaturation, N8AO, BrightnessContrast } from '@react-three/postprocessing';
import { useThree } from '@react-three/fiber';
import { BlendFunction } from 'postprocessing';

export function PostProcessing2() {
  const { gl } = useThree();

  return (
    <EffectComposer enableNormalPass>
      {/* <SSR
        // Core settings
        temporalResolve={true}
        STRETCH_MISSED_RAYS={true}
        USE_MRT={true}
        USE_NORMALMAP={true}
        USE_ROUGHNESSMAP={true}
        ENABLE_JITTERING={true}
        ENABLE_BLUR={true}

        // Temporal resolving
        temporalResolveMix={0.9}
        temporalResolveCorrectionMix={0.4}

        // Performance
        maxSamples={10}
        resolutionScale={1}

        // Blur
        blurMix={0.2}
        blurExponent={10}
        blurKernelSize={1}

        // Ray settings
        rayStep={0.5}
        intensity={2}
        maxRoughness={1}

        // Jitter
        jitter={0.09}
        jitterSpread={0.25}
        jitterRough={0.0}

        // Reflections
        roughnessFadeOut={1}
        rayFadeOut={0}
        MAX_STEPS={20}
        NUM_BINARY_SEARCH_STEPS={6}
        maxDepthDifference={10}
        maxDepth={1}
        thickness={10}
        ior={1.45}
      /> */}
      <N8AO
        intensity={5.5}
        aoRadius={0.5}
        distanceFalloff={1}
        screenSpaceRadius={false}
        halfRes={false}
        // blendFunction={BlendFunction.MULTIPLY}
        color="#012c06"//black
      />
      <BrightnessContrast brightness={0} contrast={0.0} />
      <Bloom
        luminanceThreshold={0.9}//0.9
        mipmapBlur
        luminanceSmoothing={0}
        intensity={0.2}//0.4
      />
      {/* <HueSaturation
        saturation={0.0}
        hue={0.}
      /> */}
    </EffectComposer>
  );
}
