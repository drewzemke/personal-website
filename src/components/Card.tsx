import { PropsWithChildren } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type CardProps = {
  title: string;
  homeButton?: boolean;
};

export function Card({ title, homeButton, children }: PropsWithChildren<CardProps>) {
  return (
    <main className="pointer-events-auto flex max-w-lg flex-col gap-4 rounded-2xl border border-pink-300/50 bg-black/10 px-6 py-5 text-center backdrop-blur">
      <div className="relative flex items-center justify-center">
        {homeButton && (
          <Link to=".." className="absolute right-0 duration-200 ease-linear hover:text-yellow-100">
            <FaHome className="text-2xl" />
          </Link>
        )}
        <h1 className="self-center text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </main>
  );
}
