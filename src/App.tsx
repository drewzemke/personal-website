import { Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { ShaderPage } from './pages/shader/ShaderPage';
import { ThreeBackground } from './components/three-background/ThreeBackground';

export function App() {
  return (
    <div className="h-screen w-full text-zinc-200 duration-200 ease-in-out">
      <Routes>
        <Route path="/shaders" element={<ShaderPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <ThreeBackground />
    </div>
  );
}
