import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check } from 'lucide-react';
import { supabase, type Actualite } from '../../lib/supabase';

const CATEGORIES = ['Liturgie', 'Formation', 'Événement', 'Annonce', 'Jeunesse'];
const EMPTY: Omit<Actualite, 'id' | 'created_at' | 'updated_at'> = {
  titre: '', date_article: new Date().toISOString().split('T')[0],
  extrait: '', contenu: '', categorie: 'Annonce', image_url: '', publie: false,
};

export default function AdminActualites() {
  const [items, setItems] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Actualite, 'id' | 'created_at' | 'updated_at'> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from('actualites').select('*').order('date_article', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ ...EMPTY }); setEditId(null); };
  const openEdit = (a: Actualite) => {
    setForm({ titre: a.titre, date_article: a.date_article, extrait: a.extrait, contenu: a.contenu, categorie: a.categorie, image_url: a.image_url, publie: a.publie });
    setEditId(a.id);
  };
  const cancel = () => { setForm(null); setEditId(null); };

  const save = async () => {
    if (!form) return;
    setSaving(true);
    if (editId) {
      await supabase.from('actualites').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editId);
    } else {
      await supabase.from('actualites').insert(form);
    }
    setSaving(false);
    setForm(null);
    setEditId(null);
    load();
  };

  const togglePublie = async (a: Actualite) => {
    await supabase.from('actualites').update({ publie: !a.publie }).eq('id', a.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer cette actualité ?')) return;
    setDeleting(id);
    await supabase.from('actualites').delete().eq('id', id);
    setDeleting(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl text-stone-900">Actualités</h2>
        {!form && (
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-inter font-medium transition-colors">
            <Plus size={16} /> Nouvelle actualité
          </button>
        )}
      </div>

      {/* Form */}
      {form && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h3 className="font-playfair text-lg text-stone-900 mb-5">{editId ? 'Modifier' : 'Nouvelle actualité'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="admin-label">Titre *</label>
              <input className="admin-input" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} placeholder="Titre de l'actualité" />
            </div>
            <div>
              <label className="admin-label">Date *</label>
              <input type="date" className="admin-input" value={form.date_article} onChange={(e) => setForm({ ...form, date_article: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Catégorie</label>
              <select className="admin-input" value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">URL de l'image (optionnel)</label>
              <input className="admin-input" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://images.pexels.com/..." />
              {form.image_url && <img src={form.image_url} alt="" className="mt-2 h-24 w-40 object-cover rounded-lg border border-stone-200" onError={(e) => (e.currentTarget.style.display = 'none')} />}
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Résumé court *</label>
              <textarea className="admin-input" rows={2} value={form.extrait} onChange={(e) => setForm({ ...form, extrait: e.target.value })} placeholder="Court résumé affiché dans la liste…" />
            </div>
            <div className="sm:col-span-2">
              <label className="admin-label">Contenu complet</label>
              <textarea className="admin-input" rows={5} value={form.contenu} onChange={(e) => setForm({ ...form, contenu: e.target.value })} placeholder="Contenu complet de l'article…" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="publie" checked={form.publie} onChange={(e) => setForm({ ...form, publie: e.target.checked })} className="w-4 h-4 accent-amber-600" />
              <label htmlFor="publie" className="text-sm font-inter text-stone-700">Publier immédiatement</label>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button onClick={save} disabled={saving || !form.titre || !form.extrait} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-inter font-medium transition-colors">
              <Check size={15} /> {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button onClick={cancel} className="inline-flex items-center gap-2 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 px-5 py-2 rounded-lg text-sm font-inter transition-colors">
              <X size={15} /> Annuler
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-stone-100 rounded-xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <p className="text-stone-400 text-sm font-inter text-center py-12">Aucune actualité. Créez la première !</p>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div key={a.id} className="bg-white border border-stone-100 rounded-xl p-4 flex items-center gap-4">
              {a.image_url && <img src={a.image_url} alt="" className="w-16 h-12 object-cover rounded-lg shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${a.publie ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                  <p className="font-inter font-medium text-stone-900 truncate">{a.titre}</p>
                  <span className="shrink-0 text-xs font-inter text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{a.categorie}</span>
                </div>
                <p className="text-stone-400 text-xs font-inter">{new Date(a.date_article).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => togglePublie(a)} title={a.publie ? 'Masquer' : 'Publier'} className="p-2 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-amber-600 transition-colors">
                  {a.publie ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-stone-50 text-stone-400 hover:text-stone-700 transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => remove(a.id)} disabled={deleting === a.id} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
