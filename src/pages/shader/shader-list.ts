import fragTrippyCircles from './shaders/frag-trippy-circles.glsl';
import fragScales from './shaders/frag-scales.glsl';
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
    name: 'Diamonds',
    fragmentShader: { type: 'simple', shader: fragScales },
    thumbnailZoom: 5,
    date: new Date('August 21, 2023'),
    description: `I had a design like this in my head for a while before I made this.
    I think it was subconsciously inspired by a car decal from Rocket League.`,
  },
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
        make something completely different. It's pretty fun to watch so I decided to keep it.`,
  },
];
