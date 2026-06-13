import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { supabase, type Lien } from '../lib/supabase';

export default function Liens() {
  const [liens, setLiens] = useState<Lien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('liens')
      .select('*')
      .order('categorie', { ascending: true })
      .order('ordre', { ascending: true })
      .then(({ data }) => {
        setLiens(data ?? []);
        setLoading(false);
      });
  }, []);

  const grouped: Record<string, Lien[]> = {};
  liens.forEach((l) => {
    if (!grouped[l.categorie]) grouped[l.categorie] = [];
    grouped[l.categorie].push(l);
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <div
        className="relative pt-40 pb-20 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.72), rgba(28,25,23,0.72)), url('https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Ressources</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Liens utiles</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-lg mx-auto">
          Une sélection de sites et ressources catholiques pour nourrir votre foi.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-16 bg-white rounded-xl animate-pulse border border-stone-100" />)}
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-center text-stone-400 py-20 font-inter">Aucun lien pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h2 className="font-playfair text-xl text-stone-900 mb-5 pb-3 border-b border-stone-200">{cat}</h2>
                <div className="space-y-3">
                  {items.map((l) => (
                    <a
                      key={l.id}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 bg-white rounded-xl border border-stone-100 hover:border-amber-300 hover:shadow-md p-4 transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors mt-0.5">
                        <ExternalLink size={14} className="text-amber-600" />
                      </div>
                      <div>
                        <div className="font-inter font-semibold text-stone-800 text-sm group-hover:text-amber-700 transition-colors">
                          {l.titre}
                        </div>
                        <div className="text-stone-400 text-xs font-inter mt-0.5">{l.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
