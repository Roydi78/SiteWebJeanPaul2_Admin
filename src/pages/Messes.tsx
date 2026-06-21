import { useState, useEffect } from 'react';
import { Clock, MapPin, Info } from 'lucide-react';
import { supabase, type Eglise, type MesseHoraire } from '../lib/supabase';
import CoverImg from '../assets/pexels-photo-236339.jpg';

export default function Messes() {
  const [eglises, setEglises] = useState<Eglise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: churches } = await supabase
        .from('messes')
        .select('*')
        .order('ordre', { ascending: true });

      if (!churches) { setLoading(false); return; }

      const { data: horaires } = await supabase
        .from('messe_horaires')
        .select('*')
        .order('ordre', { ascending: true });

      const withHoraires: Eglise[] = churches.map((c) => ({
        ...c,
        horaires: (horaires ?? []).filter((h: MesseHoraire) => h.eglise_id === c.id),
      }));

      setEglises(withHoraires);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <div
        className="relative pt-40 pb-20 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.72), rgba(28,25,23,0.72)), url(${CoverImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Célébrations</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Horaires des messes</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-lg mx-auto">
          Célébrations eucharistiques dans les trois paroisses de notre unité pastorale.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5 mb-12">
          <Info size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-stone-700 text-sm font-inter leading-relaxed">
            Les horaires peuvent être modifiés lors des fêtes liturgiques. Consultez l'agenda paroissial ou contactez le secrétariat pour confirmation.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden animate-pulse">
                <div className="h-44 bg-stone-200" />
                <div className="p-6 space-y-3">
                  {[1, 2, 3, 4].map((j) => <div key={j} className="h-3 bg-stone-200 rounded" />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {eglises.map((e) => (
              <div key={e.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  {e.image_url ? (
                    <img src={e.image_url} alt={e.eglise} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400 text-3xl">✝</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h2 className="absolute bottom-4 left-5 right-5 font-playfair text-xl text-white">{e.eglise}</h2>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-2 text-stone-500 text-sm font-inter mb-6">
                    <MapPin size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    {e.adresse}
                  </div>

                  <div className="space-y-2">
                    {(e.horaires ?? []).map((h) => (
                      <div key={h.id} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                        <span className="text-stone-700 text-sm font-inter font-medium w-24">{h.jour}</span>
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 text-xs font-medium px-2.5 py-1 rounded-full">
                          <Clock size={10} />
                          {h.heure}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 pt-4 border-t border-stone-100">
                    {e.confessions && (
                      <div>
                        <p className="text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-1">Confessions</p>
                        <p className="text-stone-700 text-sm font-inter">{e.confessions}</p>
                      </div>
                    )}
                    {e.adoration && (
                      <div>
                        <p className="text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-1">Adoration eucharistique</p>
                        <p className="text-stone-700 text-sm font-inter">{e.adoration}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
