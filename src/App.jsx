import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Metrics from './pages/Metrics';
import CRM from './pages/CRM';
import Tasks from './pages/Tasks';
import Chats from './pages/Chats';
import Miner from './pages/Miner';
import Website from './pages/Website';

export default function App() {
  const [loggedClient, setLoggedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('metrics');
  const [view, setView] = useState('website'); // 'website' ou 'login'

  const handleLoginSuccess = (clientData) => {
    setLoggedClient(clientData);
    setActiveTab('metrics'); // Inicia no painel de métricas
  };

  const handleLogout = () => {
    setLoggedClient(null);
    setView('website'); // Volta para o site ao deslogar
  };

  // Se não estiver logado, renderiza o site institucional ou a tela de login
  if (!loggedClient) {
    if (view === 'login') {
      return <Login onLoginSuccess={handleLoginSuccess} onBackToWebsite={() => setView('website')} />;
    }
    return <Website onNavigateToLogin={() => window.open('https://pulseiaapp.lovable.app', '_blank')} />;
  }

  // Renderiza a tela de acordo com a aba ativa
  const renderActivePage = () => {
    switch (activeTab) {
      case 'metrics':
        return <Metrics clientInfo={loggedClient} />;
      case 'crm':
        return <CRM clientInfo={loggedClient} />;
      case 'tasks':
        return <Tasks clientInfo={loggedClient} />;
      case 'chats':
        return <Chats clientInfo={loggedClient} />;
      case 'miner':
        return <Miner />;
      default:
        return <Metrics clientInfo={loggedClient} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#07080e] overflow-hidden text-slate-100 font-sans">
      {/* Sidebar de Navegação Lateral Premium */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        clientInfo={loggedClient}
        onLogout={handleLogout}
      />

      {/* Conteúdo Principal Dinâmico */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Radial Light Effect in Header area */}
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-indigo-500/3 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        {/* Renderiza a página ativa */}
        <div className="flex-grow flex flex-col overflow-hidden z-10">
          {renderActivePage()}
        </div>
      </main>
    </div>
  );
}
