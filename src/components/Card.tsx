import { PropsWithChildren } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type CardProps = {
  title: string;
  homeButton?: boolean;
};

export function Card({ title, homeButton, children }: PropsWithChildren<CardProps>) {
  return (
    <main className="max-w-lg py-5 px-6 bg-black/10 flex flex-col gap-4 text-center rounded-2xl border border-pink-300/50 backdrop-blur pointer-events-auto">
      <div className="flex items-center justify-center relative">
        {homeButton && (
          <Link to=".." className="hover:text-yellow-100 ease-linear duration-200 absolute right-0">
            <FaHome className="text-2xl" />
          </Link>
        )}
        <h1 className="text-3xl font-bold self-center">{title}</h1>
      </div>
      {children}
    </main>
  );
}
