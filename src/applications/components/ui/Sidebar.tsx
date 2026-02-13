import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      {children}
    </aside>
  );
};
