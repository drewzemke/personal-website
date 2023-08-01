import { PropsWithChildren } from 'react';

export function Overlay({ children }: PropsWithChildren) {
  return (
    <div className="absolute left-0 top-0 p-6 h-full w-full bg-black/10 flex flex-col justify-center items-center z-10 pointer-events-none">
      {children}
    </div>
  );
}
