import { FC, useState, useEffect } from 'react'
import { EffectComposer, SSR as ThreeSSR, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'

export const SSR: FC = () => {
  // Using useState instead of useLoader to avoid the error with LUT
  const [lutError, setLutError] = useState<boolean>(false)
  
  useEffect(() => {
    // Log the error for debugging purposes, but continue rendering without the LUT
    console.log("Note: LUT file loading was removed due to format issues")
  }, [])
  
  const { enabled, ...props } = useControls({
    enabled: true,
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    DITHERING: false,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.4, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.2, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    BLUR_EXPONENT: { value: 10, min: 0, max: 20 },
    rayStep: { value: 0.5, min: 0, max: 1 },
    intensity: { value: 2.5, min: 0, max: 5 },
    maxRoughness: { value: 1, min: 0, max: 1 },
    jitter: { value: 0.3, min: 0, max: 5 },
    jitterSpread: { value: 0.25, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 6, min: 0, max: 10 },
    maxDepthDifference: { value: 5, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 3, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 }
  })

  return (
    enabled && (
      <EffectComposer disableNormalPass>
        <ThreeSSR {...props} />
        {/* <Bloom luminanceThreshold={0.2} mipmapBlur luminanceSmoothing={0} intensity={1.75} /> */}
        {/* Removed LUT component since it's causing errors */}
      </EffectComposer>
    )
  )
}