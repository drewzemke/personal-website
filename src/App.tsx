import { ThreeBackground } from './three/ThreeBackground';

export function App() {
  return (
    <div className="container">
      <div className="overlay">
        <div className="content blur">
          <h1>Hi, I'm Drew!</h1>
          <p>
            I'm currently rebulding my website.
            <br />
            Check back soon!
          </p>
        </div>
      </div>
      <ThreeBackground />
    </div>
  );
}
