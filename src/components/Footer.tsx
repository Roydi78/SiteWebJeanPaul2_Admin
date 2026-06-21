import { Cross, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import type { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
                <Cross size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold font-playfair">Unité Pastorale</div>
                <div className="text-amber-400 text-xs tracking-wider uppercase">Saint Jean-Paul II</div>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Trois paroisses unies dans la foi, la prière et le service,
              sous le patronage de saint Jean-Paul II, témoin de l'Évangile.
            </p>
            <blockquote className="mt-5 pl-4 border-l-2 border-amber-600 text-stone-400 text-sm italic">
              "N'ayez pas peur! Ouvrez, ouvrez toutes grandes les portes au Christ!"
              <cite className="block mt-1 text-stone-500 not-italic text-xs">— Saint Jean-Paul II</cite>
            </blockquote>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              {(['accueil', 'actualites', 'agenda', 'messes', 'sacrements', 'groupes', 'eglises', 'contacts'] as Page[]).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
                    className="text-stone-400 hover:text-amber-400 text-sm transition-colors capitalize"
                  >
                    {page === 'accueil' ? 'Accueil' :
                     page === 'actualites' ? 'Actualités' :
                     page === 'agenda' ? 'Agenda' :
                     page === 'messes' ? 'Horaires des messes' :
                     page === 'sacrements' ? 'Sacrements' :
                     page === 'groupes' ? 'Groupes & Mouvements' :
                     page === 'eglises' ? 'Nos Églises' : 'Contact'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-stone-400">
                <MapPin size={15} className="mt-0.5 text-amber-500 shrink-0" />
                <span>Secrétariat paroissial<br />Rue de l'Église, 1<br />Moncton, NB</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-stone-400">
                <Phone size={15} className="text-amber-500 shrink-0" />
                <span>+1 (506)xxx xx xx xx</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-stone-400">
                <Mail size={15} className="text-amber-500 shrink-0" />
                <span>info@unitejeanpaul2.com</span>
              </li>
            </ul>
            <a
              href="https://www.catholique.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 text-xs text-stone-500 hover:text-amber-400 transition-colors"
            >
              <ExternalLink size={12} />
              Église catholique
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} Unité Pastorale Saint Jean-Paul II. Tous droits réservés.
          </p>
          <button
            onClick={() => handleNav('liens')}
            className="text-stone-500 hover:text-amber-400 text-xs transition-colors"
          >
            Liens utiles
          </button>
        </div>
      </div>
    </footer>
  );
}
