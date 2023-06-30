import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Instance,
  Instances,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";

import "./App.css";

export function App() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 0, -5] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Scene />
        <Environment background resolution={64}>
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={THREE.BackSide}>
              <Gradient
                colorA={new THREE.Color("hsl(315, 27%, 05%)")}
                colorB={new THREE.Color("hsl(315, 27%, 27%)")}
                axes="y"
                start={-1}
                end={1}
              />
            </LayerMaterial>
          </mesh>
        </Environment>
        <OrbitControls />
        // <Stats />
      </Canvas>
    </div>
  );
}

type PointData = {
  y: number;
  theta: number;
  radius: number;
  ang_vel: number;
};

const Y_MIN = -5;
const Y_MAX = 5;

const RADIUS = 10;

const NUM_R = 10;
const NUM_Y = 11;

const ANG_VEL_MAX = 0.1;
const ANG_VEL_MIN = 0.05;

const getCoords = ({ y, theta, radius, ang_vel }: PointData, t: number) => {
  const x = radius * Math.cos(theta + ang_vel * t);
  const z = radius * Math.sin(theta + ang_vel * t);
  return { x, y, z };
};

function Scene() {
  const instanceRef = useRef(null!);

  const points: PointData[] = useMemo(
    () =>
      Array(NUM_Y)
        .fill(0)
        .flatMap((_, i) =>
          Array(NUM_R)
            .fill(0)
            .map((_, j) => {
              const theta = 2 * Math.PI * Math.random();
              const radius = ((j + 1) / NUM_R) * RADIUS;
              const y = (i / NUM_Y) * (Y_MAX - Y_MIN) + Y_MIN;
              const ang_vel =
                Math.sign(2 * Math.random() - 1) *
                ((ANG_VEL_MAX - ANG_VEL_MIN) * Math.random() + ANG_VEL_MIN);

              return {
                y,
                theta,
                radius,
                ang_vel,
              };
            })
        ),
    []
  );

  // useFrame(({ clock }) => {
  //   instanceRef.current.children[0].position.setZ(clock.getElapsedTime());
  // });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <Instances ref={instanceRef} limit={points.length}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color={[1, 1, 1]} />
        {points.map((point, index) => (
          <Particle key={index} {...point} />
        ))}
      </Instances>
    </>
  );
}

function Particle(pointData: PointData) {
  const ref = useRef<THREE.InstancedMesh>();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const { x, y, z } = getCoords(pointData, elapsed);
    ref.current?.position.setX(x);
    ref.current?.position.setY(y);
    ref.current?.position.setZ(z);
  });

  return <Instance ref={ref} />;
}
