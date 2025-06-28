'use client';

import NavbarHomePage from '@/app/components/navbar/NavbarHomePage';
import { useAuth } from '@context/AuthProvider';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import BurgerBar from '../burger_bar/BurgerBar';

export default function NavAndSideBar() {
  const { isLogged } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="mt-14 flex w-full flex-col items-center gap-16">
      {isLogged && (
        <button
          className="fixed top-20 left-4 z-50"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu
            size={36}
            className="rounded-sm border-1 border-neutral-600 bg-black p-2"
          />
        </button>
      )}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-neutral-950 p-4 shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button className="mb-4 ml-auto" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
          <BurgerBar />
        </button>
      </div>

      <NavbarHomePage />
    </div>
  );
}
