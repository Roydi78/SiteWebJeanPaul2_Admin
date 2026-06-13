import { useState, useEffect } from 'react';
import { Check, Save } from 'lucide-react';
import { supabase, type SiteSetting } from '../../lib/supabase';

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('*').order('label').then(({ data }) => {
      setSettings(data ?? []);
      const map: Record<string, string> = {};
      (data ?? []).forEach((s: SiteSetting) => { map[s.cle] = s.valeur; });
      setValues(map);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    for (const s of settings) {
      await supabase.from('site_settings').update({ valeur: values[s.cle] ?? s.valeur, updated_at: new Date().toISOString() }).eq('cle', s.cle);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const grouped: Record<string, SiteSetting[]> = {
    'Page d\'accueil': settings.filter((s) => s.cle.startsWith('hero') || s.cle.startsWith('parole')),
    'Coordonnées': settings.filter((s) => s.cle.startsWith('contact')),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl text-stone-900">Paramètres du site</h2>
        <button
          onClick={save}
          disabled={saving}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-inter font-medium transition-all ${
            saved ? 'bg-emerald-600 text-white' : 'bg-amber-600 hover:bg-amber-500 text-white'
          } disabled:opacity-50`}
        >
          {saved ? <><Check size={15} /> Enregistré</> : <><Save size={15} /> {saving ? 'Enregistrement…' : 'Enregistrer'}</>}
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3, 4].map((i) => <div key={i} className="h-16 bg-stone-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([section, items]) => (
            items.length > 0 && (
              <div key={section}>
                <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-4">{section}</p>
                <div className="space-y-4">
                  {items.map((s) => (
                    <div key={s.cle} className="bg-white border border-stone-100 rounded-xl p-5">
                      <label className="admin-label">{s.label}</label>
                      {values[s.cle]?.length > 80 ? (
                        <textarea
                          className="admin-input mt-1"
                          rows={3}
                          value={values[s.cle] ?? ''}
                          onChange={(e) => setValues({ ...values, [s.cle]: e.target.value })}
                        />
                      ) : (
                        <input
                          className="admin-input mt-1"
                          value={values[s.cle] ?? ''}
                          onChange={(e) => setValues({ ...values, [s.cle]: e.target.value })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
