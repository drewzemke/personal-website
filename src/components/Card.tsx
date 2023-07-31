import { PropsWithChildren } from 'react';

type CardProps = {
  title: string;
};

export function Card({ title, children }: PropsWithChildren<CardProps>) {
  return (
    <div className="absolute left-0 top-0 h-full w-full bg-black/10 flex flex-col justify-center items-center z-10 pointer-events-none">
      <main className="max-w-md m-8 py-5 px-8 bg-black/10 flex flex-col gap-4 text-center rounded-2xl border border-pink-300/50 backdrop-blur pointer-events-auto">
        <h1 className="text-3xl font-bold">{title}</h1>
        {children}
      </main>
    </div>
  );
}
