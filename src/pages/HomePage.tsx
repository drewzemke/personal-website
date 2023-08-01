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
                className="px-2 flex items-center gap-2 font-bold hover:text-yellow-100 ease-linear duration-200"
                href="https://www.linkedin.com/in/drewzemke/"
              >
                <FaLinkedin className="text-3xl" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                className="px-2 flex items-center gap-2 font-bold hover:text-yellow-100 ease-linear duration-200"
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
            className="hover:text-yellow-100 font-bold underline ease-linear duration-200"
          >
            check out
          </Link>{' '}
          my shader art collection!
        </p>
      </Card>
    </Overlay>
  );
}
