import { useState } from 'react';
import { Cross, LogOut, Newspaper, Calendar, Clock, Link, Settings, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AdminActualites from './sections/AdminActualites';
import AdminAgenda from './sections/AdminAgenda';
import AdminMesses from './sections/AdminMesses';
import AdminLiens from './sections/AdminLiens';
import AdminSettings from './sections/AdminSettings';

type Tab = 'actualites' | 'agenda' | 'messes' | 'liens' | 'settings';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'actualites', label: 'Actualités', icon: Newspaper },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'messes', label: 'Horaires des messes', icon: Clock },
  { id: 'liens', label: 'Liens utiles', icon: Link },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

interface Props {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('actualites');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleTab = (t: Tab) => {
    setTab(t);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-stone-900 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-auto lg:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center">
              <Cross size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold font-playfair leading-tight">Administration</p>
              <p className="text-stone-400 text-xs font-inter">St Jean-Paul II</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter font-medium transition-all duration-200 ${
                tab === id
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-stone-700">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter font-medium text-stone-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut size={18} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1">
            <h1 className="font-playfair text-xl text-stone-900">
              {TABS.find((t) => t.id === tab)?.label}
            </h1>
            <p className="text-stone-400 text-xs font-inter">Gestion du contenu</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-inter font-medium px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            En ligne
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 max-w-5xl w-full mx-auto">
          {tab === 'actualites' && <AdminActualites />}
          {tab === 'agenda' && <AdminAgenda />}
          {tab === 'messes' && <AdminMesses />}
          {tab === 'liens' && <AdminLiens />}
          {tab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
