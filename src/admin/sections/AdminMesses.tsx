import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, type Eglise, type MesseHoraire } from '../../lib/supabase';

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export default function AdminMesses() {
  const [eglises, setEglises] = useState<Eglise[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editEglise, setEditEglise] = useState<Eglise | null>(null);
  const [newHoraire, setNewHoraire] = useState<{ eglise_id: string; jour: string; heure: string; type_messe: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data: churches } = await supabase.from('messes').select('*').order('ordre');
    const { data: horaires } = await supabase.from('messe_horaires').select('*').order('ordre');
    setEglises((churches ?? []).map((c: Eglise) => ({
      ...c,
      horaires: (horaires ?? []).filter((h: MesseHoraire) => h.eglise_id === c.id),
    })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveEglise = async () => {
    if (!editEglise) return;
    setSaving(true);
    await supabase.from('messes').update({
      eglise: editEglise.eglise,
      adresse: editEglise.adresse,
      image_url: editEglise.image_url,
      confessions: editEglise.confessions,
      adoration: editEglise.adoration,
      updated_at: new Date().toISOString(),
    }).eq('id', editEglise.id);
    setSaving(false);
    setEditEglise(null);
    load();
  };

  const deleteHoraire = async (id: string) => {
    if (!confirm('Supprimer cet horaire ?')) return;
    await supabase.from('messe_horaires').delete().eq('id', id);
    load();
  };

  const addHoraire = async () => {
    if (!newHoraire || !newHoraire.heure || !newHoraire.jour) return;
    const maxOrdre = eglises.find((e) => e.id === newHoraire.eglise_id)?.horaires?.length ?? 0;
    await supabase.from('messe_horaires').insert({ ...newHoraire, ordre: maxOrdre + 1 });
    setNewHoraire(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl text-stone-900">Horaires des messes</h2>
      </div>
      <p className="text-stone-500 text-sm font-inter mb-6">Cliquez sur une église pour gérer ses horaires et informations.</p>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-stone-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-4">
          {eglises.map((e) => (
            <div key={e.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setOpenId(openId === e.id ? null : e.id)}
                className="w-full flex items-center gap-4 p-5 hover:bg-stone-50 transition-colors text-left"
              >
                {e.image_url && <img src={e.image_url} alt="" className="w-14 h-10 object-cover rounded-lg shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                <div className="flex-1">
                  <p className="font-inter font-semibold text-stone-900">{e.eglise}</p>
                  <p className="text-stone-400 text-sm font-inter">{e.adresse} · {e.horaires?.length ?? 0} horaire(s)</p>
                </div>
                <button
                  onClick={(ev) => { ev.stopPropagation(); setEditEglise({ ...e }); }}
                  className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors mr-1"
                >
                  <Pencil size={15} />
                </button>
                {openId === e.id ? <ChevronUp size={18} className="text-stone-400" /> : <ChevronDown size={18} className="text-stone-400" />}
              </button>

              {/* Expanded */}
              {openId === e.id && (
                <div className="border-t border-stone-100 p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-1">Confessions</p>
                      <p className="text-stone-700 text-sm font-inter">{e.confessions || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-1">Adoration</p>
                      <p className="text-stone-700 text-sm font-inter">{e.adoration || '—'}</p>
                    </div>
                  </div>

                  <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-3">Horaires</p>
                  <div className="space-y-2 mb-4">
                    {(e.horaires ?? []).map((h) => (
                      <div key={h.id} className="flex items-center gap-3 bg-stone-50 rounded-lg px-4 py-2.5">
                        <span className="w-24 text-sm font-inter font-medium text-stone-700">{h.jour}</span>
                        <span className="text-sm font-inter text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">{h.heure}</span>
                        <span className="flex-1 text-sm font-inter text-stone-500">{h.type_messe}</span>
                        <button onClick={() => deleteHoraire(h.id)} className="p-1.5 rounded hover:bg-red-50 text-stone-300 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add horaire */}
                  {newHoraire?.eglise_id === e.id ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div>
                          <label className="admin-label">Jour</label>
                          <select className="admin-input" value={newHoraire.jour} onChange={(ev) => setNewHoraire({ ...newHoraire, jour: ev.target.value })}>
                            <option value="">—</option>
                            {JOURS.map((j) => <option key={j}>{j}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="admin-label">Heure</label>
                          <input className="admin-input" value={newHoraire.heure} onChange={(ev) => setNewHoraire({ ...newHoraire, heure: ev.target.value })} placeholder="ex: 10h30" />
                        </div>
                        <div>
                          <label className="admin-label">Type</label>
                          <input className="admin-input" value={newHoraire.type_messe} onChange={(ev) => setNewHoraire({ ...newHoraire, type_messe: ev.target.value })} placeholder="ex: Messe dominicale" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={addHoraire} className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-inter font-medium transition-colors">
                          <Check size={14} /> Ajouter
                        </button>
                        <button onClick={() => setNewHoraire(null)} className="inline-flex items-center gap-1.5 bg-white border border-stone-300 text-stone-700 px-4 py-2 rounded-lg text-sm font-inter transition-colors">
                          <X size={14} /> Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setNewHoraire({ eglise_id: e.id, jour: '', heure: '', type_messe: 'Messe dominicale' })}
                      className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-inter font-medium transition-colors"
                    >
                      <Plus size={15} /> Ajouter un horaire
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit église modal */}
      {editEglise && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-7">
            <h3 className="font-playfair text-xl text-stone-900 mb-5">Modifier {editEglise.eglise}</h3>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Nom de l'église</label>
                <input className="admin-input" value={editEglise.eglise} onChange={(e) => setEditEglise({ ...editEglise, eglise: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Adresse</label>
                <input className="admin-input" value={editEglise.adresse} onChange={(e) => setEditEglise({ ...editEglise, adresse: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">URL de l'image</label>
                <input className="admin-input" value={editEglise.image_url} onChange={(e) => setEditEglise({ ...editEglise, image_url: e.target.value })} placeholder="https://images.pexels.com/..." />
                {editEglise.image_url && <img src={editEglise.image_url} alt="" className="mt-2 h-20 w-32 object-cover rounded-lg" onError={(e) => (e.currentTarget.style.display = 'none')} />}
              </div>
              <div>
                <label className="admin-label">Confessions</label>
                <input className="admin-input" value={editEglise.confessions} onChange={(e) => setEditEglise({ ...editEglise, confessions: e.target.value })} placeholder="ex: Samedi 17h00–18h00" />
              </div>
              <div>
                <label className="admin-label">Adoration eucharistique</label>
                <input className="admin-input" value={editEglise.adoration} onChange={(e) => setEditEglise({ ...editEglise, adoration: e.target.value })} placeholder="ex: Jeudi 17h00–18h30" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveEglise} disabled={saving} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-inter font-medium transition-colors">
                <Check size={15} /> {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button onClick={() => setEditEglise(null)} className="inline-flex items-center gap-2 bg-white border border-stone-300 text-stone-700 px-5 py-2.5 rounded-lg text-sm font-inter transition-colors">
                <X size={15} /> Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
