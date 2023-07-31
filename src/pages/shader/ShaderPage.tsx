import { Stats } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { ShaderMaterial, Vector2 } from 'three';

import frag1 from './frag-trippy-circles.glsl';
import frag2 from './frag-moving-blobs.glsl';
import vert from './vert.glsl';

export function ShaderPage() {
  return (
    <div className="overlay">
      <main className="content blur">
        <h1>Shader Art</h1>
        <p>I don't know what to call it.</p>
        <ul className="shader-thumb-list">
          <ShaderThumbnail fragmentShader={frag1} zoom={2} width={100} height={100} />
          <ShaderThumbnail fragmentShader={frag2} zoom={2} width={100} height={100} />
          <ShaderThumbnail fragmentShader={frag1} zoom={2} width={100} height={100} />
        </ul>
        <Stats />
      </main>
    </div>
  );
}

type ShaderThumbnailProps = {
  fragmentShader: string;
  zoom: number;
  width: number;
  height: number;
};

function ShaderThumbnail(props: ShaderThumbnailProps) {
  return (
    <div className="shader-thumbnail">
      <Canvas
        style={{ width: `${props.width}px`, height: `${props.height}px` }}
        orthographic
        camera={{
          zoom: Math.max(props.width, props.height),
        }}
      >
        <ShaderView fragmentShader={props.fragmentShader} animate zoom={props.zoom} />
      </Canvas>
    </div>
  );
}

type ShaderViewProps = {
  fragmentShader: string;
  animate: boolean;
  zoom?: number;
};

function ShaderView(props: ShaderViewProps) {
  const material = useRef<ShaderMaterial>(null!);
  const zoom = props.zoom ?? 1;

  useFrame((_, delta) => {
    if (!props.animate) {
      return;
    }
    material.current.uniforms.uTime.value += delta;
  });

  // get the resolution of the canvas that this being renderd in
  const three = useThree();
  const res = useMemo(() => {
    const tempRes = new Vector2(0, 0);
    three.gl.getSize(tempRes);
    tempRes.multiplyScalar(zoom);
    return tempRes;
  }, []);

  const maxRes = Math.max(res.x, res.y);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: res },
    }),
    []
  );

  return (
    <mesh>
      <planeGeometry args={[res.x / maxRes, res.y / maxRes]} />
      <shaderMaterial
        key={Math.random()}
        vertexShader={vert}
        fragmentShader={props.fragmentShader}
        uniforms={uniforms}
        ref={material}
      />
    </mesh>
  );
}
