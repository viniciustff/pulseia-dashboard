import React from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  MessageSquare, 
  Search, 
  LogOut, 
  Bot, 
  ShieldAlert,
  ClipboardList
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, clientInfo, onLogout }) {
  const menuItems = [
    { id: 'metrics', label: 'Painel de Métricas', icon: LayoutDashboard },
    { id: 'crm', label: 'Notion CRM Kanban', icon: KanbanSquare },
    { id: 'tasks', label: 'Gestor de Tarefas', icon: ClipboardList },
    { id: 'chats', label: 'Conversas WhatsApp', icon: MessageSquare },
    { id: 'miner', label: 'Minerador de Leads', icon: Search },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0e1017] border-r border-slate-800/60 flex flex-col justify-between p-4 shrink-0">
      <div className="flex flex-col gap-8">
        {/* Brand / Client Header */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800/40">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Bot className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-wider uppercase leading-none">
              Portal IA
            </h1>
            <span className="text-[11px] text-indigo-400 font-medium mt-1 block">
              Agência Auto Vantage
            </span>
          </div>
        </div>

        {/* Client Active Account Badge */}
        {clientInfo && (
          <div className="mx-1 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl flex items-center gap-3">
            {clientInfo.logo ? (
              <img 
                src={clientInfo.logo} 
                alt={clientInfo.name} 
                className="w-8 h-8 rounded-lg object-cover bg-white" 
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center border border-indigo-500/30">
                <span className="text-xs font-bold text-indigo-300">
                  {clientInfo.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {clientInfo.name}
              </p>
              <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Conectado ao Notion
              </p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer & Logout */}
      <div className="flex flex-col gap-3">
        <div className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl text-center">
          <p className="text-[10px] text-slate-500">Logado como</p>
          <p className="text-xs font-medium text-slate-400 truncate">{clientInfo?.email || 'cliente@portal.com'}</p>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200 border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-4 h-4" />
          Sair do Painel
        </button>
      </div>
    </aside>
  );
}
