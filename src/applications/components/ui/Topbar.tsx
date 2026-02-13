import { ReactNode } from 'react';

interface TopbarProps {
  children: ReactNode;
}

export const Topbar = ({ children }: TopbarProps) => {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center px-4">
      {children}
    </header>
  );
};
