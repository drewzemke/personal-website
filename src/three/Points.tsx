import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

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

const getPointCoords = (point: PointData, t: number) => {
  const x = point.radius * Math.cos(point.theta + point.ang_vel * t);
  const z = point.radius * Math.sin(point.theta + point.ang_vel * t);
  return { x, y: point.y, z };
};

function Point(point: PointData) {
  const ref = useRef<THREE.InstancedMesh>();
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const { x, y, z } = getPointCoords(point, elapsed);
    ref.current?.position.setX(x);
    ref.current?.position.setY(y);
    ref.current?.position.setZ(z);
  });
  return <Instance ref={ref} />;
}

export function Points() {
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
              return { y, theta, radius, ang_vel };
            })
        ),
    []
  );

  return (
    <Instances limit={points.length}>
      <sphereGeometry args={[0.02, 12, 12]} />
      <meshBasicMaterial color={[1, 1, 1]} />
      {points.map((point, index) => (
        <Point key={index} {...point} />
      ))}
    </Instances>
  );
}
