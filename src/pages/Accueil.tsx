import { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Clock, BookOpen, Users, Church, ArrowRight } from 'lucide-react';
import { supabase, type Actualite, type SiteSetting } from '../lib/supabase';
import type { Page } from '../types';
import BgImg from '../assets/pexels-photo-208216.jpg';

interface AccueilProps {
  onNavigate: (page: Page) => void;
}

export default function Accueil({ onNavigate }: AccueilProps) {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .from('actualites')
      .select('*')
      .eq('publie', true)
      .order('date_article', { ascending: false })
      .limit(3)
      .then(({ data }) => setActualites(data ?? []));

    supabase
      .from('site_settings')
      .select('*')
      .then(({ data }) => {
        const map: Record<string, string> = {};
        (data as SiteSetting[] ?? []).forEach((s) => { map[s.cle] = s.valeur; });
        setSettings(map);
      });
  }, []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paroleTexte = settings['parole_texte'] ?? 'Ce que chacun de vous a reçu comme don de la grâce, mettez-le au service des autres…';
  const paroleRef = settings['parole_reference'] ?? '1 Pierre 4, 10';

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(28,25,23,0.65) 0%, rgba(28,25,23,0.5) 60%, rgba(28,25,23,0.9) 100%), url(${BgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm uppercase tracking-[0.25em] font-inter font-medium mb-6">
            Bienvenue dans notre communauté
          </p>
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
            {settings['hero_titre'] ?? 'Unité Pastorale'}<br />
            <span className="text-amber-400">Saint Jean-Paul II</span>
          </h1>
          <p className="text-stone-300 text-lg sm:text-xl font-inter font-light leading-relaxed mb-10 max-w-xl mx-auto">
            {settings['hero_sous_titre'] ?? 'Trois paroisses unies dans la foi, la prière et le service. Chacun est le bienvenu.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNav('messes')}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-7 py-3.5 rounded text-sm font-inter font-medium transition-all duration-200 shadow-lg"
            >
              <Clock size={16} />
              Horaires des messes
            </button>
            <button
              onClick={() => handleNav('agenda')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3.5 rounded text-sm font-inter font-medium backdrop-blur transition-all duration-200"
            >
              <Calendar size={16} />
              Agenda paroissial
            </button>
          </div>
        </div>
        <a
          href="#parole"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </a>
      </section>

      {/* Parole de Vie */}
      <section id="parole" className="bg-stone-900 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-6">
            <BookOpen size={14} />
            Parole de Vie
          </div>
          <blockquote className="font-playfair text-2xl sm:text-3xl text-white italic leading-relaxed mb-6">
            "{paroleTexte}"
          </blockquote>
          <cite className="text-amber-400 font-inter text-sm not-italic tracking-wider uppercase">
            {paroleRef}
          </cite>
          <p className="mt-8 text-stone-400 text-base font-inter font-light max-w-xl mx-auto leading-relaxed">
            Je prends un temps de recueillement pour remercier le Seigneur de sa présence en moi et dans le monde.
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-stone-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, titre: 'Messes', desc: 'Horaires des célébrations eucharistiques dans nos trois paroisses.', page: 'messes' as Page },
              { icon: Calendar, titre: 'Agenda', desc: 'Événements, retraites et temps forts de notre communauté.', page: 'agenda' as Page },
              { icon: Users, titre: 'Groupes', desc: 'Aumôneries, mouvements et groupes de prière ouverts à tous.', page: 'groupes' as Page },
              { icon: Church, titre: 'Nos Églises', desc: 'Découvrez les trois lieux de culte de notre unité pastorale.', page: 'eglises' as Page },
            ].map(({ icon: Icon, titre, desc, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className="group bg-white rounded-xl p-7 text-left shadow-sm hover:shadow-lg border border-stone-100 hover:border-amber-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                  <Icon size={22} className="text-amber-600" />
                </div>
                <h3 className="font-playfair text-lg text-stone-900 mb-2">{titre}</h3>
                <p className="text-stone-500 text-sm font-inter leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-amber-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  En savoir plus <ArrowRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Actualités récentes */}
      {actualites.length > 0 && (
        <section className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-amber-600 text-xs uppercase tracking-widest font-inter font-medium mb-2">Vie paroissiale</p>
                <h2 className="font-playfair text-3xl sm:text-4xl text-stone-900">Dernières actualités</h2>
              </div>
              <button
                onClick={() => handleNav('actualites')}
                className="hidden sm:inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
              >
                Toutes les actualités <ArrowRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {actualites.map((a) => (
                <article
                  key={a.id}
                  className="group border border-stone-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {a.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img src={a.image_url} alt={a.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-inter font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{a.categorie}</span>
                      <time className="text-stone-400 text-xs font-inter">
                        {new Date(a.date_article).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' })}
                      </time>
                    </div>
                    <h3 className="font-playfair text-xl text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">{a.titre}</h3>
                    <p className="text-stone-500 text-sm font-inter leading-relaxed line-clamp-3">{a.extrait}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Citation JP2 */}
      <section
        className="relative py-24 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.82), rgba(28,25,23,0.82)), url('https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-8" />
          <blockquote className="font-playfair text-2xl sm:text-3xl text-white italic leading-relaxed">
            "N'ayez pas peur! Ouvrez, ouvrez toutes grandes les portes au Christ!"
          </blockquote>
          <cite className="block mt-6 text-amber-400 text-sm font-inter not-italic tracking-wider uppercase">
            — Saint Jean-Paul II, Homélie d'inauguration, octobre 1978
          </cite>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-8" />
        </div>
      </section>
    </div>
  );
}
