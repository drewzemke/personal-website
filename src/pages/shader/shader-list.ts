import fragTrippyCircles from './shaders/frag-trippy-circles.glsl';
import fragMovingBlobs from './shaders/frag-moving-blobs.glsl';

export type ShaderInfo = {
  fragmentShader: string;
  thumbnailZoom: number;

  // TODO: implement these
  // name: string;
  // description: string;
  // dateAdded: Date;
  // startTime: number;
};

export const shaders: ShaderInfo[] = [
  {
    fragmentShader: fragTrippyCircles,
    thumbnailZoom: 3,
  },
  {
    fragmentShader: fragMovingBlobs,
    thumbnailZoom: 2,
  },
];
