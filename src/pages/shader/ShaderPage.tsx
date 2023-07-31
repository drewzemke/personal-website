import { Stats } from '@react-three/drei';

import { shaders } from './shader-list';
import { ShaderThumbnail } from './ShaderThumbnail';

export function ShaderPage() {
  return (
    <div className="overlay">
      <main className="content blur">
        <h1>Shader Art</h1>
        <p>
          I love making animations with GLSL shaders. It's all geometry-y and calculus-y and artsy!
          Here are some of my creations: click to view a larger version.
        </p>
        <ul className="shader-thumb-list">
          {shaders.map((shader) => (
            <ShaderThumbnail shader={shader} width={100} height={100} />
          ))}
        </ul>
        {import.meta.env.DEV && <Stats />}
      </main>
    </div>
  );
}
