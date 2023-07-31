import { Vector2 } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { useMemo } from 'react';

import { ShaderInfo } from './shader-list';
import { ShaderRenderPlane } from './ShaderRenderPlane';

type ShaderPreviewProps = {
  shader: ShaderInfo;
  onClose: () => void;
};

export function ShaderPreview({ shader, ...props }: ShaderPreviewProps) {
  return (
    <div className="absolute z-20 bg-zinc-900 w-[90%] max-w-3xl aspect-[3/4] md:aspect-[4/3] border rounded-3xl flex flex-col items-center justify-center overflow-hidden pointer-events-auto">
      <div className="p-2">"{shader.name}"</div>
      <Canvas style={{ background: 'black' }} orthographic>
        <ShaderRenderPlane fragmentShader={shader.fragmentShader} animate />
        <CameraZoomer />
      </Canvas>
      <button type="button" onClick={props.onClose} className="p-2 text-sm w-full">
        (close)
      </button>
    </div>
  );
}

// HACK: should this be a part of ShaderRenderPlane?
function CameraZoomer() {
  // get the resolution of the canvas that this being rendered in
  const three = useThree();
  const res = useMemo(() => {
    const tempRes = new Vector2(0, 0);
    three.gl.getSize(tempRes);
    return tempRes;
  }, []);

  // update the camera
  three.camera.zoom = Math.max(res.x, res.y);
  three.camera.updateProjectionMatrix();

  return null;
}
