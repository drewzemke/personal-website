import { PropsWithChildren } from 'react';

type CardProps = {
  title: string;
};

export function Card({ title, children }: PropsWithChildren<CardProps>) {
  return (
    <main className="max-w-md py-5 px-8 bg-black/10 flex flex-col gap-4 text-center rounded-2xl border border-pink-300/50 backdrop-blur pointer-events-auto">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </main>
  );
}
