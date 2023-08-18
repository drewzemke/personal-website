import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Gradient, LayerMaterial } from 'lamina';
import { Points } from './Points';

export function ThreeBackground() {
  return (
    <Canvas className="absolute h-full w-full" camera={{ position: [0, 0, -5] }}>
      <Points />
      <OrbitControls
        enableDamping
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.3}
      />
      <Environment background resolution={64}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Gradient
              colorA={new THREE.Color('hsl(315, 27%, 05%)')}
              colorB={new THREE.Color('hsl(315, 27%, 27%)')}
              axes="y"
              start={-1}
              end={1}
            />
          </LayerMaterial>
        </mesh>
      </Environment>
    </Canvas>
  );
}
