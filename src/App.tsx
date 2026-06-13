import { useState } from 'react';
import type { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil';
import Actualites from './pages/Actualites';
import Agenda from './pages/Agenda';
import Messes from './pages/Messes';
import Sacrements from './pages/Sacrements';
import Groupes from './pages/Groupes';
import Eglises from './pages/Eglises';
import Contacts from './pages/Contacts';
import Liens from './pages/Liens';
import Admin from './admin/Admin';

const isAdmin = window.location.pathname === '/admin' || window.location.hash === '#admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');

  if (isAdmin) return <Admin />;

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil': return <Accueil onNavigate={setCurrentPage} />;
      case 'actualites': return <Actualites />;
      case 'agenda': return <Agenda />;
      case 'messes': return <Messes />;
      case 'sacrements': return <Sacrements />;
      case 'groupes': return <Groupes />;
      case 'eglises': return <Eglises />;
      case 'contacts': return <Contacts />;
      case 'liens': return <Liens />;
      default: return <Accueil onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
