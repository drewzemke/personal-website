import { Vector2 } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { useMemo } from 'react';

import { ShaderInfo } from './shader-list';
import { ShaderRenderPlane } from './ShaderRenderPlane';
import { FaTimes } from 'react-icons/fa';
import clsx from 'clsx';

type ShaderPreviewProps = {
  shader: ShaderInfo | null;
  onClose: () => void;
};

export function ShaderPreview({ shader, ...props }: ShaderPreviewProps) {
  return (
    <div
      className={clsx(
        'absolute z-20 bg-zinc-900 w-[90%] max-w-3xl aspect-[3/5] md:aspect-[4/3]',
        'border rounded-3xl flex flex-col items-center justify-center overflow-hidden pointer-events-auto',
        shader ? '' : 'hidden'
      )}
    >
      <div className="py-3 px-5 w-full flex justify-between">
        <div className="flex flex-col">
          <span>"{shader?.name}"</span>
          <span className="ml-2 text-sm text-zinc-400">
            {shader?.date.toLocaleDateString('en-us', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <button
          className="hover:text-yellow-100 ease-linear duration-200 "
          type="button"
          aria-label="close shader preview"
          onClick={props.onClose}
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      <Canvas style={{ background: 'black' }} orthographic>
        {shader && <ShaderRenderPlane fragmentShader={shader.fragmentShader} animate />}
        <CameraZoomer />
      </Canvas>
      <div className="p-5 pt-3 text-sm w-full">{shader?.description}</div>
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
