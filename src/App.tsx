import { ThreeBackground } from './three/ThreeBackground';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

export function App() {
  return (
    <div className="container">
      <div className="overlay">
        <main className="content blur">
          <h1>Hi, I'm Drew!</h1>
          <p>
            I do web development professionally but my true interests lie in mathematics and
            computer graphics.
          </p>
          <p>Check out the links below to learn more about me.</p>
          <div className="social-links">
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/drewzemke/">
                  <FaLinkedin className="icon" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/drewzemke">
                  <FaGithubSquare className="icon" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </main>
      </div>
      <ThreeBackground />
    </div>
  );
}
