import { useThree, useFrame } from '@react-three/fiber'
import { 
  EffectComposer as PostProcessingComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  ToneMappingEffect,
  HueSaturationEffect,
  // DepthOfFieldEffect,
  BlendFunction
} from 'postprocessing'
import { useEffect, useState } from 'react'
import { SSGIEffect, TRAAEffect, VelocityDepthNormalPass } from './realism-effects/index'

interface PostProcessingProps {
  importanceSampling?: boolean;
  enableSSGI?: boolean;
  enableConfig?: boolean;  // New prop for toggling config
  saturation?: number;
  // dofFocusDistance?: number; //
  // dofFocalLength?: number;   //deapth of field
  // dofBokehScale?: number;    //
}

const defaultConfig = {
  distance: 60,//20
  thickness: 3,//2
  maxRoughness: 1,
  blend: 0.97,
  denoiseIterations: 1,//1
  denoiseKernel: 3,//3
  denoiseDiffuse: 25,
  denoiseSpecular: 25.54,
  rings: 5,
  samples: 1,//4
  radius: 1,//100
  phi: 0.587,
  lumaPhi: 5.978,
  depthPhi: 11.957,
  normalPhi: 21.739,
  roughnessPhi: 9.783,
  diffusePhi: 6.028e-15,
  envBlur: 0,
  steps: 120,//15
  refineSteps: 4,
  spp: 1,//1
  resolutionScale: 1,
  missedRays: false
};

export function PostProcessing({ 
  importanceSampling = true,
  enableSSGI = true,
  enableConfig = true,  // Default to true to maintain original behavior
  saturation = 0.2,
  // dofFocusDistance = 0.02,
  // dofFocalLength = 0.5,
  // dofBokehScale = 2,
}: PostProcessingProps) {
  const { gl, scene, camera, size } = useThree();
  const [composer] = useState(() => new PostProcessingComposer(gl, { multisampling: 0 }));

  useEffect(() => {
    composer.setSize(size.width, size.height)
  }, [composer, size])

  useEffect(() => {
    if (enableSSGI) {
      const ssgiConfig = enableConfig ? {
        ...defaultConfig,
        importanceSampling,
      } : undefined;

      const renderPass = new RenderPass(scene, camera);
      const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera);
      const ssgiEffect = new SSGIEffect(
        composer, 
        scene, 
        camera, 
        velocityDepthNormalPass, 
        ssgiConfig
      );
      const traa = new TRAAEffect(scene, camera, velocityDepthNormalPass);
      const mapping = new ToneMappingEffect();
      const bloom = new BloomEffect({ 
        mipmapBlur: true, 
        luminanceThreshold: 0.7, 
        intensity: .8,
        radius: 0.5
      });
      const saturationEffect = new HueSaturationEffect({ saturation });
      //dof
      // const dofEffect = new DepthOfFieldEffect(camera, {
      //   focusDistance: dofFocusDistance,
      //   focalLength: dofFocalLength,
      //   bokehScale: dofBokehScale
      // });



      composer.addPass(renderPass);
      composer.addPass(velocityDepthNormalPass);
      composer.addPass(new EffectPass(
        camera, 
        ssgiEffect
      ));
      // composer.addPass(new EffectPass(camera, dofEffect));
      composer.addPass(new EffectPass(
        camera, 
        traa, 
        bloom, 
        saturationEffect, 
        mapping,
        // dofEffect
      ));

      return () => {
        composer.removeAllPasses();
      };
    }
  }, [composer, camera, scene, importanceSampling, enableSSGI, enableConfig]);

  useFrame((state, delta) => {
    if (enableSSGI) {
      gl.autoClear = true;
      composer.render(delta);
    }
  }, 1);

  return null;
}