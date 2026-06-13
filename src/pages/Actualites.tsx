import { useState, useEffect } from 'react';
import { Calendar, Tag } from 'lucide-react';
import { supabase, type Actualite } from '../lib/supabase';

const CATEGORIES = ['Tout', 'Liturgie', 'Formation', 'Événement', 'Annonce', 'Jeunesse'];

export default function Actualites() {
  const [items, setItems] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState('Tout');

  useEffect(() => {
    supabase
      .from('actualites')
      .select('*')
      .eq('publie', true)
      .order('date_article', { ascending: false })
      .then(({ data }) => {
        setItems(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = filtre === 'Tout' ? items : items.filter((a) => a.categorie === filtre);

  return (
    <div className="min-h-screen bg-stone-50">
      <div
        className="relative pt-40 pb-20 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.75), rgba(28,25,23,0.75)), url('https://images.pexels.com/photos/1353238/pexels-photo-1353238.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Vie paroissiale</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Actualités</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-lg mx-auto">
          Les nouvelles et annonces de notre unité pastorale.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltre(cat)}
              className={`px-4 py-2 rounded-full text-sm font-inter font-medium transition-all duration-200 ${
                filtre === cat
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-stone-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-stone-200 rounded w-1/3" />
                  <div className="h-5 bg-stone-200 rounded w-3/4" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                  <div className="h-3 bg-stone-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-stone-400 py-20 font-inter">Aucune actualité pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((a) => (
              <article
                key={a.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  {a.image_url ? (
                    <img
                      src={a.image_url}
                      alt={a.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                      <span className="text-stone-300 text-4xl">✝</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 text-xs font-inter font-medium text-amber-700 bg-amber-50/95 px-3 py-1 rounded-full">
                      <Tag size={10} />
                      {a.categorie}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-stone-400 text-xs font-inter mb-3">
                    <Calendar size={12} />
                    {new Date(a.date_article).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h2 className="font-playfair text-xl text-stone-900 mb-3 group-hover:text-amber-700 transition-colors leading-snug">
                    {a.titre}
                  </h2>
                  <p className="text-stone-500 text-sm font-inter leading-relaxed line-clamp-3">{a.extrait}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
