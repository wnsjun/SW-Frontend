import type { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-[390px] min-h-screen mx-auto bg-white overflow-x-clip">
      <div className="pb-[64px]">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
