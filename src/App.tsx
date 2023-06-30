import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

import "./App.css";

export function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}

function Scene() {
  const cubeRef = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    cubeRef.current.rotation.x = clock.getElapsedTime();
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
}
