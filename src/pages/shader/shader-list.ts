import fragTrippyCircles from './shaders/frag-trippy-circles.glsl';
import fragMovingBlobs from './shaders/frag-moving-blobs.glsl';
import smokePre from './shaders/frag-smoke-pre.glsl';
import smokeLoop from './shaders/frag-smoke-loop.glsl';
import smokePost from './shaders/frag-smoke-post.glsl';

export type FragmentShaderSimple = {
  type: 'simple';
  shader: string;
};

export type FragmentShaderPipeline = {
  type: 'pipeline';
  pre: string;
  loop: string;
  post: string;
};

type FragmentShader = FragmentShaderSimple | FragmentShaderPipeline;

export type ShaderInfo = {
  name: string;
  fragmentShader: FragmentShader;
  thumbnailZoom: number;
  date: Date;
  description: string;
};

export const shaders: ShaderInfo[] = [
  {
    name: 'Smoke',
    fragmentShader: { type: 'pipeline', pre: smokePre, loop: smokeLoop, post: smokePost },
    thumbnailZoom: 2,
    date: new Date('August 5, 2023'),
    description: `I recently learned how to feed the output of a shader back into itself! 
      It feels like the possibilities of what I can do with that technique are endless.`,
  },
  {
    name: 'Perlin Refraction',
    fragmentShader: { type: 'simple', shader: fragMovingBlobs },
    thumbnailZoom: 2,
    date: new Date('July 29, 2023'),
    description: `I had some crazy idea to try to move points around a plane using the
      gradient of a perlin noise function. And... it kinda worked? It didn't not work!`,
  },
  {
    // FIXME: better name
    name: 'Mandala',
    fragmentShader: { type: 'simple', shader: fragTrippyCircles },
    thumbnailZoom: 3,
    date: new Date('July 29, 2023'),
    description: `I stumbled upon this trippy circle business while I was trying to 
        make something complete different. It's pretty fun to watch so I decided to keep it.`,
  },
];
