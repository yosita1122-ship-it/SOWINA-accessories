import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
  const isActive = currentPage === page;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(page);
      }}
      className={`text-gray-700 hover:text-[#BF927F] transition-colors px-3 py-2 rounded-md text-sm font-medium ${
        isActive ? 'text-[#BF927F] font-semibold' : ''
      }`}
    >
      {children}
    </a>
  );
};

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40 sowina-font-sans">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold sowina-font-serif text-[#A67B68] cursor-pointer" onClick={() => onNavigate('Home')}>
          SOWINA
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <NavLink page="Home" currentPage={currentPage} onNavigate={onNavigate}>หน้าแรก</NavLink>
          <NavLink page="Shop" currentPage={currentPage} onNavigate={onNavigate}>สินค้า</NavLink>
          <NavLink page="Workshop" currentPage={currentPage} onNavigate={onNavigate}>เวิร์คช็อป</NavLink>
          <NavLink page="Custom Design" currentPage={currentPage} onNavigate={onNavigate}>ออกแบบพิเศษ</NavLink>
          <NavLink page="Our Story" currentPage={currentPage} onNavigate={onNavigate}>เรื่องราวของเรา</NavLink>
        </div>
        <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-[#A67B68]" aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
            <button className="text-gray-600 hover:text-[#A67B68]" aria-label="Wishlist"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg></button>
            <button className="text-gray-600 hover:text-[#A67B68]" aria-label="Cart"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg></button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
