import fragTrippyCircles from './shaders/frag-trippy-circles.glsl';
import fragMovingBlobs from './shaders/frag-moving-blobs.glsl';

export type ShaderInfo = {
  name: string;
  fragmentShader: string;
  thumbnailZoom: number;
  date: Date;
  description: string;
};

export const shaders: ShaderInfo[] = [
  {
    // FIXME: better name
    name: 'Mandala',
    fragmentShader: fragTrippyCircles,
    thumbnailZoom: 3,
    date: new Date('July 29, 2023'),
    description: `I stumbled upon this trippy circle business while I was trying to 
        make something complete different. It's pretty fun to watch so I decided to keep it.`,
  },
  {
    // FIXME: better name (or don't even publish this one...)
    name: 'Perlin Refraction',
    fragmentShader: fragMovingBlobs,
    thumbnailZoom: 2,
    date: new Date('July 29, 2023'),
    description: `I had some crazy idea to try to move points around a plane using the
      gradient of a perlin noise function. And... it kinda worked? It didn't not work!`,
  },
];
