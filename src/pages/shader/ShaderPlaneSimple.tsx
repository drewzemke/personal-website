import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { ShaderMaterial, Vector2 } from 'three';

import vertexShader from './shaders/vert.glsl';
import { FragmentShaderSimple } from './shader-list';

type ShaderPlaneSimpleProps = {
  shader: FragmentShaderSimple;
  animate: boolean;
  zoom?: number;
};

export function ShaderPlaneSimple(props: ShaderPlaneSimpleProps) {
  const zoom = props.zoom ?? 1;
  const material = useRef<ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (!props.animate || !material.current) {
      return;
    }
    material.current.uniforms.uTime.value += delta;
  });

  // TODO: just do this!
  // const {size} = useThree();
  //
  // get the resolution of the canvas that this being renderd in
  const { size } = useThree();
  const res = useMemo(() => new Vector2(zoom * size.width, zoom * size.height), [size, zoom]);

  const maxRes = Math.max(res.x, res.y);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: res },
    }),
    [res]
  );

  return (
    <mesh>
      <planeGeometry args={[res.x / maxRes, res.y / maxRes]} />
      <shaderMaterial
        key={Math.random()}
        vertexShader={vertexShader}
        fragmentShader={props.shader.shader}
        uniforms={uniforms}
        ref={material}
      />
    </mesh>
  );
}
