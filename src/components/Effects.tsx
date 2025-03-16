import { useThree, useFrame } from '@react-three/fiber'
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ToneMappingEffect, FXAAEffect } from 'postprocessing'
import { useEffect, useState } from 'react'
import { SSGIEffect, VelocityDepthNormalPass } from './realism-effects/v2'
import type { WebGLRenderer, Scene, Camera, Vector2 } from 'three'

interface SSGIConfig {
  importanceSampling: boolean
  steps: number
  refineSteps: number
  spp: number
  resolutionScale: number
  missedRays: boolean
  distance: number
  thickness: number
  denoiseIterations: number
  denoiseKernel: number
  denoiseDiffuse: number
  denoiseSpecular: number
  radius: number
  phi: number
  lumaPhi: number
  depthPhi: number
  normalPhi: number
  roughnessPhi: number
  specularPhi: number
  envBlur: number
}

export function Effects(): JSX.Element {
  const gl = useThree((state) => state.gl) as WebGLRenderer
  const scene = useThree((state) => state.scene) as Scene
  const camera = useThree((state) => state.camera) as Camera
  const size = useThree((state) => state.size) as Vector2
  const [composer] = useState(() => new EffectComposer(gl, { multisampling: 0 }))

  useEffect(() => composer.setSize(size.width, size.height), [composer, size])
  useEffect(() => {
    const config: SSGIConfig = {
      importanceSampling: true,
      steps: 100,//20
      refineSteps: 2,//0
      spp: 1,
      resolutionScale: 1,
      distance: 25.980000000000011,//5....
      thickness: 2.829999999999997,
      denoiseIterations: 1,
      denoiseKernel: 3,
      denoiseDiffuse: 25,
      denoiseSpecular: 25.54,
      radius: 1,
      phi: 0.5760000000000001,
      lumaPhi: 20.651999999999997,
      depthPhi: 23.37,
      normalPhi: 26.087,
      roughnessPhi: 18.477999999999998,
      specularPhi: 7.099999999999999,
      envBlur: 0.8,
      missedRays: false//true
    }

    const renderPass = new RenderPass(scene, camera)
    const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
    composer.addPass(renderPass)
    composer.addPass(velocityDepthNormalPass)
    composer.addPass(new EffectPass(camera, new SSGIEffect(composer, scene, camera, { ...config, velocityDepthNormalPass })))
    // composer.addPass(new EffectPass(camera, new BloomEffect({ mipmapBlur: true, luminanceThreshold: 0.7, intensity: 0.9, levels: 10 })))
    composer.addPass(new EffectPass(camera, new FXAAEffect(), new ToneMappingEffect()))

    return () => {
      composer.removeAllPasses()
    }
  }, [composer, camera, scene])

  useFrame((_, delta: number) => {
    gl.autoClear = true
    composer.render(delta)
  }, 1)

  return null
}