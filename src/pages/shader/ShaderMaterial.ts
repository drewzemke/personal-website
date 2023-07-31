import { shaderMaterial } from '@react-three/drei';
import { MaterialNode, extend } from '@react-three/fiber';

import vert from './vert.glsl';
import frag from './frag-trippy-circles.glsl';

import { Material, Vector2 } from 'three';

export type ExpShaderMaterialType = Material & { uTime: number; uRes: Vector2 };

export const ExpShaderMaterial = shaderMaterial({ uTime: -1, uRes: new Vector2(0, 0) }, vert, frag);

extend({ ExpShaderMaterial });
declare module '@react-three/fiber' {
  interface ThreeElements {
    expShaderMaterial: MaterialNode<ExpShaderMaterialType, typeof ExpShaderMaterial>;
  }
}
