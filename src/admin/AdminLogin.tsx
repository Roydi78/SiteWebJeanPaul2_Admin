import { useState } from 'react';
import { Cross, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError('Email ou mot de passe incorrect.');
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center mx-auto mb-4">
            <Cross size={24} className="text-white" />
          </div>
          <h1 className="font-playfair text-2xl text-white">Administration</h1>
          <p className="text-stone-400 text-sm font-inter mt-1">Unité Pastorale Saint Jean-Paul II</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-800 rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-900/40 border border-red-700 text-red-300 text-sm font-inter px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-stone-700 border border-stone-600 text-white rounded-lg px-4 py-3 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-stone-500"
              placeholder="admin@paroisse.ca"
            />
          </div>

          <div>
            <label className="block text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-stone-700 border border-stone-600 text-white rounded-lg px-4 py-3 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-stone-500 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white py-3 rounded-lg text-sm font-inter font-medium transition-colors"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-stone-600 text-xs font-inter mt-6">
          Accès réservé aux administrateurs de la paroisse.
        </p>
      </div>
    </div>
  );
}
