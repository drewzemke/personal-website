import { useFBO } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { BufferGeometry, Mesh, ShaderMaterial, WebGLRenderTarget } from 'three';

import { FragmentShaderPipeline } from './shader-list';
import vertexShader from './shaders/vert.glsl';

type ShaderPlanePipelineProps = {
  shader: FragmentShaderPipeline;
  animate: boolean;
  zoom?: number;
};

export function ShaderPlanePipeline(props: ShaderPlanePipelineProps) {
  const { pre, loop, post } = props.shader;

  const { size } = useThree();
  const maxDim = Math.max(size.width, size.height);

  const mesh = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null);

  const uniforms1 = useMemo(() => ({ uTime: { value: 0 } }), []);

  const uniforms2 = useMemo(
    () => ({
      uTexture1: { value: null },
      uTexture2: { value: null },
      uTime: { value: 0 },
    }),
    []
  );

  const uniforms3 = useMemo(
    () => ({
      uTexture: { value: null },
      uTime: { value: 0 },
    }),
    []
  );

  // renders the "pre" shader, which provides a seed image for the next step
  const mat1 = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: pre,
    uniforms: uniforms1,
  });

  // this is where the magic happens -- the second fragment shader
  // receives both the output of the first shader as well as its own
  // output from the previous frame
  const mat2 = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: loop,
    uniforms: uniforms2,
  });

  // the third "post" shader does some post-processing and adds color
  const mat3 = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: post,
    uniforms: uniforms3,
  });

  const renderTarget1 = useFBO();
  const renderTarget2a = useFBO();
  const renderTarget2b = useFBO();

  const currentRt = useRef(renderTarget2a);
  const nextRt = useRef(renderTarget2b);
  const tempRt = useRef<WebGLRenderTarget>();

  useFrame(({ camera, clock, gl, scene }) => {
    if (!mesh.current) {
      return;
    }

    gl.setRenderTarget(renderTarget1);
    mesh.current.material = mat1;
    mesh.current.material.uniforms.uTime.value = clock.elapsedTime;
    gl.render(scene, camera);

    gl.setRenderTarget(currentRt.current);
    mesh.current.material = mat2;
    mesh.current.material.uniforms.uTexture1.value = renderTarget1.texture;
    mesh.current.material.uniforms.uTexture2.value = nextRt.current.texture;
    mesh.current.material.uniforms.uTime.value = clock.elapsedTime;
    gl.render(scene, camera);

    // we can re-use rt1 here
    gl.setRenderTarget(renderTarget1);
    mesh.current.material = mat3;
    mesh.current.material.uniforms.uTexture.value = currentRt.current.texture;
    mesh.current.material.uniforms.uTime.value = clock.elapsedTime;
    gl.render(scene, camera);

    // swap the render targets for the next render
    tempRt.current = nextRt.current;
    nextRt.current = currentRt.current;
    currentRt.current = tempRt.current;

    gl.setRenderTarget(null);
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[size.width / maxDim, size.height / maxDim]} />
    </mesh>
  );
}
