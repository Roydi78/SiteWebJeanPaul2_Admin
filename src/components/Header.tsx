import { useState, useEffect } from 'react';
import { Menu, X, Cross } from 'lucide-react';
import type { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string }[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'actualites', label: 'Actualités' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'messes', label: 'Horaires des messes' },
  { id: 'sacrements', label: 'Sacrements' },
  { id: 'groupes', label: 'Groupes & Mouvements' },
  { id: 'eglises', label: 'Nos Églises' },
  { id: 'contacts', label: 'Contact' },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-stone-900/97 shadow-xl backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('accueil')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
              <Cross size={18} className="text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm leading-tight font-playfair">
                Unité Pastorale
              </div>
              <div className="text-amber-400 text-xs font-inter font-medium tracking-wider uppercase">
                Jean-Paul II
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3 py-2 text-sm font-inter font-medium rounded transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-amber-400 bg-white/10'
                    : 'text-stone-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden bg-stone-900 border-t border-stone-700 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-left px-4 py-3 rounded text-sm font-inter font-medium transition-all duration-200 ${
                currentPage === item.id
                  ? 'text-amber-400 bg-white/10'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
