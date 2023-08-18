import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Card } from '../components/Card';
import { Overlay } from '../components/Overlay';

export function HomePage() {
  return (
    <Overlay>
      <Card title="Hi, I'm Drew!">
        <p>
          I do web development professionally but my true interests lie in mathematics and computer
          graphics.
        </p>
        <p>You can learn more about me here:</p>
        <div className="my-2 flex justify-center">
          <ul className="flex gap-4">
            <li>
              <a
                className="flex items-center gap-2 px-2 font-bold duration-200 ease-linear hover:text-yellow-100"
                href="https://www.linkedin.com/in/drewzemke/"
              >
                <FaLinkedin className="text-3xl" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 px-2 font-bold duration-200 ease-linear hover:text-yellow-100"
                href="https://github.com/drewzemke"
              >
                <FaGithubSquare className="text-3xl" />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
        <p>
          Or{' '}
          <Link
            to="shaders"
            className="font-bold underline duration-200 ease-linear hover:text-yellow-100"
          >
            check out
          </Link>{' '}
          my shader art collection!
        </p>
      </Card>
    </Overlay>
  );
}
