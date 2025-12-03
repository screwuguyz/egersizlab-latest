import React, { useEffect, useRef, useState } from 'react';
import { Bell, Menu, Search, X, User } from 'lucide-react';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';
import { CartItem } from '@/types';

const navItems = [
  { href: '#hero', label: 'Ana Sayfa' },
  { href: '#process', label: 'Sistem Nasıl İşliyor?' },
  { href: '#packages', label: 'Hizmet Paketleri' },
  { href: '#blog', label: 'Blog' },
  { href: '#about', label: 'Hakkımızda' },
  { href: '#contact', label: 'İletişim' },
];

interface HeaderProps {
  cartItems: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('#hero');
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);
  const cartPopoverRef = useRef<HTMLDivElement | null>(null);
  const cartCount = cartItems.length;

  useEffect(() => {
    const setFromHash = () => {
      const hash = window.location.hash || '#hero';
      setActiveLink(hash);
    };
    setFromHash();
    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.2,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isCartOpen ||
        !cartButtonRef.current ||
        !cartPopoverRef.current
      ) {
        return;
      }

      if (
        !cartButtonRef.current.contains(event.target as Node) &&
        !cartPopoverRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setIsMenuOpen(false);
  };

  const linkClasses = (href: string) =>
    `px-3 py-2 rounded-full transition-colors ${
      activeLink === href
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
    }`;

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-40">
        {/* Top Bar */}
        <div className="hidden md:block w-full bg-gradient-to-r from-[#263562] to-[#1e2a4a] text-white py-3 shadow-sm">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>iletisim@egzersizlab.com</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogin(true);
                }}
                className="relative px-6 py-2 text-sm font-semibold rounded-lg border-2 border-white bg-transparent text-white transition hover:bg-white hover:text-[#263562]"
              >
                Giriş Yap
              </a>
              <div className="w-px h-6 bg-white/30" />
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowRegister(true);
                }}
                className="relative px-6 py-2 text-sm font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition"
              >
                Kayıt Ol
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="EgzersizLab Logo"
                className="w-auto object-contain"
                style={{ height: '6.25rem' }} // h-25 approx
              />
              <span className="text-4xl font-bold text-[#263562]">EgzersizLab</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-3 font-medium text-gray-600 bg-white/70 backdrop-blur-lg rounded-full px-3 py-2 shadow-sm border border-gray-100">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={linkClasses(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ara..."
                  className="pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 w-48 transition-all focus:w-64"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
              </div>

              <div className="relative">
                <button
                  ref={cartButtonRef}
                  onClick={() => setIsCartOpen((prev) => !prev)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition flex items-center justify-center"
                  aria-label="Sepet"
                  aria-expanded={isCartOpen}
                >
                  <span className="text-2xl leading-none">🛒</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full font-semibold">
                      {cartCount}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <div
                    ref={cartPopoverRef}
                    className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 shadow-xl rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-900">Sepetiniz</span>
                      <span className="text-xs text-gray-500">{cartCount} ürün</span>
                    </div>
                    {cartCount === 0 ? (
                      <p className="text-sm text-gray-500">Henüz paket eklemediniz.</p>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {cartItems.map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2 last:border-none last:pb-0"
                          >
                            <div>
                              <p className="font-semibold text-gray-800 text-sm leading-tight">{item.title}</p>
                              <p className="text-xs text-gray-500">Paket</p>
                            </div>
                            <span className="text-sm font-bold text-indigo-600">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition">
                      Ödemeye Geç
                    </button>
                  </div>
                )}
              </div>

              <button className="relative p-2 hover:bg-gray-100 rounded-full transition" aria-label="Bildirimler">
                <Bell size={22} className="text-gray-700" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg absolute w-full left-0 z-50">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={linkClasses(item.href)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t pt-4 flex flex-col gap-3">
                <button
                  className="flex items-center gap-2 text-gray-700 font-medium"
                  onClick={() => setShowLogin(true)}
                >
                  <User size={18} /> Giriş Yap
                </button>
                <button
                  className="bg-[#263562] text-white py-2 rounded-lg font-medium w-full"
                  onClick={() => setShowRegister(true)}
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {showRegister && <RegistrationModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;
