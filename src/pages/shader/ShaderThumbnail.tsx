import { Canvas } from '@react-three/fiber';

import { ShaderInfo } from './shader-list';
import { ShaderView } from './ShaderView';

type ShaderThumbnailProps = {
  shader: ShaderInfo;
  width: number;
  height: number;
};

export function ShaderThumbnail(props: ShaderThumbnailProps) {
  return (
    <li className="shader-thumbnail">
      <button type="button">
        <Canvas
          style={{ width: `${props.width}px`, height: `${props.height}px` }}
          orthographic
          camera={{
            zoom: Math.max(props.width, props.height),
          }}
        >
          <ShaderView
            fragmentShader={props.shader.fragmentShader}
            animate
            zoom={props.shader.thumbnailZoom}
          />
        </Canvas>
      </button>
    </li>
  );
}
