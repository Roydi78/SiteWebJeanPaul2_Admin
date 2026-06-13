import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check } from 'lucide-react';
import { supabase, type AgendaEvent } from '../../lib/supabase';

const TYPES = ['Liturgie', 'Réunion', 'Prière', 'Sacrement', 'Formation', 'Retraite', 'Événement', 'Pèlerinage', 'Diocèse'];
const EMPTY: Omit<AgendaEvent, 'id' | 'created_at'> = {
  titre: '', date_event: new Date().toISOString().split('T')[0],
  heure: '', lieu: '', type_event: 'Liturgie', description: '', publie: true,
};

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

export default function AdminAgenda() {
  const [items, setItems] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<AgendaEvent, 'id' | 'created_at'> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('agenda').select('*').order('date_event', { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ ...EMPTY }); setEditId(null); };
  const openEdit = (a: AgendaEvent) => {
    setForm({ titre: a.titre, date_event: a.date_event, heure: a.heure, lieu: a.lieu, type_event: a.type_event, description: a.description, publie: a.publie });
    setEditId(a.id);
  };
  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    if (!form) return;
    setSaving(true);
    if (editId) {
      await supabase.from('agenda').update(form).eq('id', editId);
    } else {
      await supabase.from('agenda').insert(form);
    }
    setSaving(false);
    cancel();
    load();
  };

  const togglePublie = async (a: AgendaEvent) => {
    await supabase.from('agenda').update({ publie: !a.publie }).eq('id', a.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer cet événement ?')) return;
    await supabase.from('agenda').delete().eq('id', id);
    load();
  };

  const past = items.filter((e) => new Date(e.date_event) < new Date());
  const future = items.filter((e) => new Date(e.date_event) >= new Date());

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl text-stone-900">Agenda</h2>
        {!form && (
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-inter font-medium transition-colors">
            <Plus size={16} /> Nouvel événement
          </button>
        )}
      </div>

      {form && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h3 className="font-playfair text-lg text-stone-900 mb-5">{editId ? 'Modifier' : 'Nouvel événement'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="admin-label">Titre *</label>
              <input className="admin-input" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} placeholder="Titre de l'événement" />
            </div>
            <div>
              <label className="admin-label">Date *</label>
              <input type="date" className="admin-input" value={form.date_event} onChange={(e) => setForm({ ...form, date_event: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Heure</label>
              <input className="admin-input" value={form.heure} onChange={(e) => setForm({ ...form, heure: e.target.value })} placeholder="ex: 10h30" />
            </div>
            <div>
              <label className="admin-label">Lieu</label>
              <input className="admin-input" value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })} placeholder="ex: Église Saint-Martin" />
            </div>
            <div>
              <label className="admin-label">Type</label>
              <select className="admin-input" value={form.type_event} onChange={(e) => setForm({ ...form, type_event: e.target.value })}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Description</label>
              <textarea className="admin-input" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Détails de l'événement…" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="publie_ag" checked={form.publie} onChange={(e) => setForm({ ...form, publie: e.target.checked })} className="w-4 h-4 accent-amber-600" />
              <label htmlFor="publie_ag" className="text-sm font-inter text-stone-700">Publier</label>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving || !form.titre} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-inter font-medium transition-colors">
              <Check size={15} /> {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button onClick={cancel} className="inline-flex items-center gap-2 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 px-5 py-2 rounded-lg text-sm font-inter transition-colors">
              <X size={15} /> Annuler
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-stone-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <>
          {future.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-3">À venir</p>
              <div className="space-y-3">
                {future.map((a) => (
                  <EventRow key={a.id} event={a} onEdit={openEdit} onDelete={remove} onToggle={togglePublie} />
                ))}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-3">Passés</p>
              <div className="space-y-3 opacity-60">
                {past.slice(0, 5).map((a) => (
                  <EventRow key={a.id} event={a} onEdit={openEdit} onDelete={remove} onToggle={togglePublie} />
                ))}
              </div>
            </div>
          )}
          {items.length === 0 && <p className="text-stone-400 text-sm font-inter text-center py-12">Aucun événement.</p>}
        </>
      )}
    </div>
  );
}

function EventRow({ event: a, onEdit, onDelete, onToggle }: {
  event: AgendaEvent;
  onEdit: (a: AgendaEvent) => void;
  onDelete: (id: string) => void;
  onToggle: (a: AgendaEvent) => void;
}) {
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
  return (
    <div className="bg-white border border-stone-100 rounded-xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex flex-col items-center justify-center shrink-0">
        <span className="font-playfair text-lg font-bold leading-none">{new Date(a.date_event).getDate()}</span>
        <span className="text-amber-200 text-xs uppercase">{new Date(a.date_event).toLocaleDateString('fr-BE', { month: 'short' })}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`w-2 h-2 rounded-full shrink-0 ${a.publie ? 'bg-emerald-500' : 'bg-stone-300'}`} />
          <p className="font-inter font-medium text-stone-900 truncate">{a.titre}</p>
          <span className={`shrink-0 text-xs font-inter font-medium px-2 py-0.5 rounded-full ${typeColors[a.type_event] ?? 'bg-stone-100 text-stone-700'}`}>{a.type_event}</span>
        </div>
        <p className="text-stone-400 text-xs font-inter">{a.heure && `${a.heure} · `}{a.lieu}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => onToggle(a)} className="p-2 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-amber-600 transition-colors">
          {a.publie ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
        <button onClick={() => onEdit(a)} className="p-2 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-stone-700 transition-colors">
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete(a.id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
