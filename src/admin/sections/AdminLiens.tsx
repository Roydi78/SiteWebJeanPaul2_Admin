import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, ExternalLink } from 'lucide-react';
import { supabase, type Lien } from '../../lib/supabase';

const EMPTY: Omit<Lien, 'id'> = {
  titre: '', url: '', description: '', categorie: '', ordre: 0,
};

export default function AdminLiens() {
  const [items, setItems] = useState<Lien[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Lien, 'id'> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('liens').select('*').order('categorie').order('ordre');
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ ...EMPTY }); setEditId(null); };
  const openEdit = (l: Lien) => {
    setForm({ titre: l.titre, url: l.url, description: l.description, categorie: l.categorie, ordre: l.ordre });
    setEditId(l.id);
  };
  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    if (!form) return;
    setSaving(true);
    if (editId) {
      await supabase.from('liens').update(form).eq('id', editId);
    } else {
      await supabase.from('liens').insert(form);
    }
    setSaving(false);
    cancel();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce lien ?')) return;
    await supabase.from('liens').delete().eq('id', id);
    load();
  };

  const grouped: Record<string, Lien[]> = {};
  items.forEach((l) => {
    if (!grouped[l.categorie]) grouped[l.categorie] = [];
    grouped[l.categorie].push(l);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl text-stone-900">Liens utiles</h2>
        {!form && (
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-inter font-medium transition-colors">
            <Plus size={16} /> Nouveau lien
          </button>
        )}
      </div>

      {form && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h3 className="font-playfair text-lg text-stone-900 mb-5">{editId ? 'Modifier' : 'Nouveau lien'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="admin-label">Titre *</label>
              <input className="admin-input" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} placeholder="Nom du site" />
            </div>
            <div>
              <label className="admin-label">Catégorie *</label>
              <input className="admin-input" value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} placeholder="ex: Prière & Spiritualité" list="cat-list" />
              <datalist id="cat-list">
                {[...new Set(items.map((l) => l.categorie))].map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">URL *</label>
              <input className="admin-input" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." type="url" />
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Description</label>
              <input className="admin-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Courte description du site" />
            </div>
            <div>
              <label className="admin-label">Ordre d'affichage</label>
              <input type="number" className="admin-input" value={form.ordre} onChange={(e) => setForm({ ...form, ordre: parseInt(e.target.value) || 0 })} min={0} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving || !form.titre || !form.url || !form.categorie} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-inter font-medium transition-colors">
              <Check size={15} /> {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button onClick={cancel} className="inline-flex items-center gap-2 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 px-5 py-2 rounded-lg text-sm font-inter transition-colors">
              <X size={15} /> Annuler
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-14 bg-stone-100 rounded-xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <p className="text-stone-400 text-sm font-inter text-center py-12">Aucun lien. Ajoutez le premier !</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([cat, ls]) => (
            <div key={cat}>
              <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-3">{cat}</p>
              <div className="space-y-2">
                {ls.map((l) => (
                  <div key={l.id} className="bg-white border border-stone-100 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                      <ExternalLink size={14} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter font-medium text-stone-900 text-sm">{l.titre}</p>
                      <p className="text-stone-400 text-xs font-inter truncate">{l.url}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => openEdit(l)} className="p-2 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-stone-700 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => remove(l.id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
