import { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { supabase, type AgendaEvent } from '../lib/supabase';
import CoverImg from '../assets/pexels-photo-5040009.jpg';

const typeColors: Record<string, string> = {
  Liturgie: 'bg-amber-100 text-amber-800',
  Réunion: 'bg-stone-100 text-stone-700',
  Prière: 'bg-blue-100 text-blue-800',
  Sacrement: 'bg-emerald-100 text-emerald-800',
  Formation: 'bg-sky-100 text-sky-800',
  Retraite: 'bg-violet-100 text-violet-800',
  Événement: 'bg-rose-100 text-rose-800',
  Pèlerinage: 'bg-orange-100 text-orange-800',
  Diocèse: 'bg-teal-100 text-teal-800',
};

function groupByMonth(events: AgendaEvent[]) {
  const map: Record<string, AgendaEvent[]> = {};
  events.forEach((ev) => {
    const key = new Date(ev.date_event).toLocaleDateString('fr-BE', { month: 'long', year: 'numeric' });
    if (!map[key]) map[key] = [];
    map[key].push(ev);
  });
  return map;
}

export default function Agenda() {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('agenda')
      .select('*')
      .eq('publie', true)
      .gte('date_event', new Date().toISOString().split('T')[0])
      .order('date_event', { ascending: true })
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoading(false);
      });
  }, []);

  const grouped = groupByMonth(events);

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
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Communauté</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Agenda paroissial</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-lg mx-auto">
          Temps forts, célébrations et rencontres à venir dans notre unité pastorale.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-100 h-20 animate-pulse" />
            ))}
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-center text-stone-400 py-20 font-inter">Aucun événement à venir.</p>
        ) : (
          Object.entries(grouped).map(([mois, evs]) => (
            <div key={mois} className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-playfair text-2xl text-stone-900 capitalize">{mois}</h2>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
              <div className="space-y-3">
                {evs.map((ev) => {
                  const d = new Date(ev.date_event);
                  const jour = d.toLocaleDateString('fr-BE', { weekday: 'short' });
                  const num = d.getDate();
                  return (
                    <div
                      key={ev.id}
                      className="group bg-white rounded-xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      <div className="flex items-stretch">
                        <div className="w-20 shrink-0 bg-amber-600 text-white flex flex-col items-center justify-center py-4 group-hover:bg-amber-500 transition-colors">
                          <span className="font-playfair text-3xl font-bold leading-none">{num}</span>
                          <span className="text-amber-200 text-xs font-inter uppercase tracking-wider mt-1">{jour}</span>
                        </div>
                        <div className="flex-1 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-playfair text-lg text-stone-900">{ev.titre}</h3>
                              <span className={`hidden sm:inline text-xs font-inter font-medium px-2.5 py-0.5 rounded-full ${typeColors[ev.type_event] ?? 'bg-stone-100 text-stone-700'}`}>
                                {ev.type_event}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-stone-500 text-sm font-inter">
                              {ev.heure && (
                                <span className="flex items-center gap-1.5">
                                  <Clock size={13} className="text-amber-500" />
                                  {ev.heure}
                                </span>
                              )}
                              {ev.lieu && (
                                <span className="flex items-center gap-1.5">
                                  <MapPin size={13} className="text-amber-500" />
                                  {ev.lieu}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center mt-8">
          <p className="text-stone-700 font-inter text-sm">
            Pour toute information, contactez le secrétariat paroissial.
          </p>
        </div>
      </div>
    </div>
  );
}
