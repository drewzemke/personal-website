import { Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { ExpShaderMaterial, ExpShaderMaterialType } from './ShaderMaterial';
import { useRef } from 'react';
import { Vector2 } from 'three';

export function ShaderPage() {
  return (
    <div className="overlay">
      <main className="content blur">
        <h1>Check Out Mah Shaders</h1>
        <p>Nice nice nice. Here's a shader:</p>
        <Canvas
          style={{ width: '100px', height: '100px' }}
          orthographic
          camera={{
            zoom: Math.max(window.innerWidth, window.innerHeight),
          }}
        >
          <ShaderScene />
          <Stats />
        </Canvas>
      </main>
    </div>
  );
}

function ShaderScene() {
  const material = useRef<ExpShaderMaterialType>(null!);

  useFrame((_, delta) => {
    material.current.uTime += delta;
  });

  const res = new Vector2(2000, 2000);
  const maxRes = Math.max(res.x, res.y);

  return (
    <mesh>
      <planeGeometry args={[res.x / maxRes, res.y / maxRes]} />
      <expShaderMaterial key={ExpShaderMaterial.key} ref={material} uRes={res} />
    </mesh>
  );
}
