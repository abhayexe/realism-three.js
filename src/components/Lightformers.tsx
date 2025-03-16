import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Lightformer, Float } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'

type PresetType = 'disco' | 'sunset' | 'night'

interface LightformersProps {
  preset?: PresetType
  positions?: number[]
}

interface PresetConfig {
  ceiling: {
    color: string
    intensity: number
  }
  movingLights: {
    colors: string[]
    intensity: number
  }
  sideLights: {
    colors: string[]
    intensities: number[]
  }
  accentLights: Array<{
    color: string
    intensity: number
    scale: number
    position: [number, number, number]
    speed: number
    floatIntensity: number
  }>
  background: {
    baseColor: string
    depthColorA: string
    depthColorB: string
  }
}

const presets: Record<PresetType, PresetConfig> = {
  disco: {
    ceiling: {
      color: '#ff00ff',
      intensity: 0.75
    },
    movingLights: {
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#ffff00', '#00ffff'],
      intensity: 2
    },
    sideLights: {
      colors: ['#00ff00', '#0000ff', '#ff00ff'],
      intensities: [4, 3, 3]
    },
    accentLights: [
      {
        color: '#ff0000',
        intensity: 1,
        scale: 10,
        position: [-15, 4, -18],
        speed: 5,
        floatIntensity: 2
      },
      {
        color: '#00ff00',
        intensity: 1,
        scale: 8,
        position: [15, 4, -15],
        speed: 3,
        floatIntensity: 1.5
      },
      {
        color: '#0000ff',
        intensity: 1,
        scale: 6,
        position: [0, 8, -20],
        speed: 4,
        floatIntensity: 1.8
      }
    ],
    background: {
      baseColor: '#222',
      depthColorA: '#ff00ff',
      depthColorB: '#00ffff'
    }
  },
  sunset: {
    ceiling: {
      color: '#ff7b00',
      intensity: 1
    },
    movingLights: {
      colors: ['#ff7b00', '#ff5500', '#ff8800', '#ffaa00'],
      intensity: 1.5
    },
    sideLights: {
      colors: ['#ff5500', '#ff8800', '#ffaa00'],
      intensities: [3, 2, 2]
    },
    accentLights: [
      {
        color: '#ff0000',
        intensity: 0.8,
        scale: 15,
        position: [-10, 10, -15],
        speed: 2,
        floatIntensity: 0.5
      }
    ],
    background: {
      baseColor: '#351111',
      depthColorA: 'blue',
      depthColorB: '#000000'
    }
  },
  night: {
    ceiling: {
      color: '#0a0a2a',
      intensity: .2
    },
    movingLights: {
      colors: ['#ffffff', '#ffffaa', '#aaaaff'],
      intensity: 0.3
    },
    sideLights: {
      colors: ['#0000aa', '#000066', '#000044'],
      intensities: [1, 0.5, 0.5]
    },
    accentLights: [
      {
        color: '#ffffff',
        intensity: 0.2,
        scale: 2,
        position: [-15, 8, -18],
        speed: 1,
        floatIntensity: 0.5
      },
      {
        color: '#ffffaa',
        intensity: 0.15,
        scale: 1.5,
        position: [10, 6, -15],
        speed: 1.2,
        floatIntensity: 0.3
      },
      {
        color: '#aaaaff',
        intensity: 0.1,
        scale: 1,
        position: [0, 10, -20],
        speed: 0.8,
        floatIntensity: 0.4
      }
    ],
    background: {
      baseColor: '#000000',
      depthColorA: '#000033',
      depthColorB: '#000000'
    }
  }
}

export const Lightformers: React.FC<LightformersProps> = ({ 
  preset = 'disco',
  positions = [2, 0, 2, 0, 2, 0, 2, 0] 
}) => {
  const group = useRef<THREE.Group>(null)
  const config = presets[preset]

  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.z += delta * 10
      if (group.current.position.z > 20) {
        group.current.position.z = -60
      }
    }
  })

  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={config.ceiling.intensity}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
        color={config.ceiling.color}
      />

      {/* Moving lights */}
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={config.movingLights.intensity}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
              color={config.movingLights.colors[i % config.movingLights.colors.length]}
            />
          ))}
        </group>
      </group>

      {/* Side lights */}
      {config.sideLights.colors.map((color, i) => (
        <Lightformer
          key={i}
          intensity={config.sideLights.intensities[i]}
          rotation-y={i === 2 ? -Math.PI / 2 : Math.PI / 2}
          position={i === 2 ? [10, 1, 0] : [-5, i * -2 + 1, -1]}
          scale={[20, i === 0 ? 0.1 : 0.5, 1]}
          color={color}
        />
      ))}

      {/* Accent lights */}
      {config.accentLights.map((light, i) => (
        <Float
          key={i}
          speed={light.speed}
          floatIntensity={light.floatIntensity}
          rotationIntensity={light.floatIntensity}
        >
          <Lightformer
            form="ring"
            color={light.color}
            intensity={light.intensity}
            scale={light.scale}
            position={light.position}
            target={[0, 0, 0]}
          />
        </Float>
      ))}

      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color={config.background.baseColor} alpha={1} mode="normal" />
          <Depth
            colorA={config.background.depthColorA}
            colorB={config.background.depthColorB}
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  )
}