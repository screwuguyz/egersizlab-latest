import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex justify-between items-center py-4">
        <a href="/" className="flex items-center gap-3">
          {/* Logonuz public/logo.png yolunda olmalıdır */}
          <img src="/logo.png" alt="Egzersiz Lab Logo" className="h-8 w-auto transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-6" />
          <span className="text-2xl font-bold text-slate-900 hidden sm:inline">
            Egzersiz Lab
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#courses" className="text-slate-600 hover:text-blue-600 font-medium">Kurslar</a>
          <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium">Hakkımızda</a>
          <a href="#contact" className="text-slate-600 hover:text-blue-600 font-medium">İletişim</a>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
          Giriş Yap
        </button>
      </nav>
    </header>
  );
};

export default Header;
