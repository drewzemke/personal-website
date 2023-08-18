import { PropsWithChildren } from 'react';

export function Overlay({ children }: PropsWithChildren) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-black/10 p-6">
      {children}
    </div>
  );
}
