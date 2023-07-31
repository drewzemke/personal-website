import { Stats } from '@react-three/drei';

import { shaders } from './shader-list';
import { ShaderThumbnail } from './ShaderThumbnail';
import { Card } from '../../components/Card';

export function ShaderPage() {
  return (
    <Card title="Shader Art">
      <p>
        I love making animations with GLSL shaders. It's all geometry-y and calculus-y and artsy!
        Here are some of my creations: click to view a larger version.
      </p>
      <ul className="flex flex-wrap gap-4 justify-center">
        {shaders.map((shader) => (
          <ShaderThumbnail shader={shader} width={100} height={100} />
        ))}
      </ul>
      {import.meta.env.DEV && <Stats />}
    </Card>
  );
}
