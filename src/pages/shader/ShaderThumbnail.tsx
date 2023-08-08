import { Canvas } from '@react-three/fiber';

import { ShaderInfo } from './shader-list';
import { ShaderPlaneSimple } from './ShaderPlaneSimple';
import { ShaderPlanePipeline } from './ShaderPlanePipeline';

type ShaderThumbnailProps = {
  shaderInfo: ShaderInfo;
  width: number;
  height: number;
  onClick: () => void;
};

export function ShaderThumbnail(props: ShaderThumbnailProps) {
  return (
    <li className="border border-pink-300/50 hover:border-pink-300 rounded-md overflow-hidden flex">
      <button type="button" onClick={props.onClick}>
        <Canvas
          style={{ width: `${props.width}px`, height: `${props.height}px` }}
          orthographic
          camera={{
            zoom: Math.max(props.width, props.height),
          }}
        >
          {props.shaderInfo.fragmentShader.type === 'simple' ? (
            <ShaderPlaneSimple
              shader={props.shaderInfo.fragmentShader}
              animate
              zoom={props.shaderInfo.thumbnailZoom}
            />
          ) : (
            <ShaderPlanePipeline
              shader={props.shaderInfo.fragmentShader}
              animate
              zoom={props.shaderInfo.thumbnailZoom}
            />
          )}
        </Canvas>
      </button>
    </li>
  );
}
