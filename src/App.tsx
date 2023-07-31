import { Route, Routes } from 'react-router-dom';
import { ThreeBackground } from './components/three-background/ThreeBackground';
// import { HomePage } from './pages/HomePage';
import { ShaderPage } from './pages/shader/ShaderPage';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/shaders" element={<ShaderPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <ThreeBackground />
    </div>
  );
}
