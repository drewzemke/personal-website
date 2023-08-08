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
            I spend a weird amount of my leisure time playing round with GLSL shaders. It's a
            combination of math and art that really appeals to me.
          </p>
          <p>
            Here are some of my creations! (Click one of the thumbnails to view a larger version.)
            I'll add more as I make them!
          </p>
          <ul className="py-2 flex flex-wrap gap-4 justify-center">
            {shaders.map((shader, index) => (
              <ShaderThumbnail
                key={shader.name}
                shaderInfo={shader}
                width={100}
                height={100}
                onClick={() => setSelectedShader(shaders[index])}
              />
            ))}
          </ul>
        </Card>
        <ShaderPreview shader={selectedShader} onClose={() => setSelectedShader(null)} />
      </Overlay>
      {import.meta.env.DEV && <Stats />}
    </>
  );
}
