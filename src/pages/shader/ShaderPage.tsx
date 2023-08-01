import { Stats } from '@react-three/drei';
import { useState } from 'react';

import { ShaderInfo, shaders } from './shader-list';
import { ShaderThumbnail } from './ShaderThumbnail';
import { Card } from '../../components/Card';
import { ShaderPreview } from './ShaderPreview';
import { Overlay } from '../../components/Overlay';

export function ShaderPage() {
  const [selectedShader, setSelectedShader] = useState<ShaderInfo | null>(null);

  return (
    <>
      <Overlay>
        <Card title="Shader Art" homeButton>
          <p>
            I really like playing round with animations in GLSL shaders. It's all geometry-y and
            calculus-y and artsy!
          </p>
          <p>
            Here are some of my creations; click to view a larger version. I'll add more as I come
            up with them!
          </p>
          <ul className="flex flex-wrap gap-4 justify-center">
            {shaders.map((shader, index) => (
              <ShaderThumbnail
                key={shader.name}
                shader={shader}
                width={100}
                height={100}
                onClick={() => setSelectedShader(shaders[index])}
              />
            ))}
          </ul>
        </Card>
        {selectedShader && (
          <ShaderPreview shader={selectedShader} onClose={() => setSelectedShader(null)} />
        )}
      </Overlay>
      {import.meta.env.DEV && <Stats />}
    </>
  );
}
