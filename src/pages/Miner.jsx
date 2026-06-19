import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Settings, 
  Play, 
  Check, 
  ExternalLink, 
  Import, 
  MessageSquare,
  Bot,
  AlertCircle,
  Loader2,
  Star
} from 'lucide-react';

export default function Miner() {
  const [query, setQuery] = useState('Lojas de veículos multimarcas');
  const [location, setLocation] = useState('Campo Largo - PR');
  const [limit, setLimit] = useState(10);
  
  const [isMining, setIsMining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  
  const [minedResults, setMinedResults] = useState([]);
  const [importedLeads, setImportedLeads] = useState({});
  const [approachedLeads, setApproachedLeads] = useState({});

  // Simular a busca local por IA
  const handleStartMining = (e) => {
    e.preventDefault();
    if (!query || !location) return;

    setIsMining(true);
    setProgress(0);
    setMinedResults([]);
    
    const steps = [
      { p: 10, t: 'Inicializando motor de raspagem Apify...' },
      { p: 30, t: 'Conectando ao Google Maps Places API...' },
      { p: 55, t: `Buscando "${query}" em "${location}"...` },
      { p: 80, t: 'Filtrando telefones celulares e WhatsApps válidos...' },
      { p: 100, t: 'Mineração concluída! Consolidando leads...' }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setProgress(step.p);
        setStatusText(step.t);
        
        if (step.p === 100) {
          setIsMining(false);
          // Gerar leads minerados realistas
          setMinedResults([
            {
              id: 'm1',
              title: 'Mundial Veículos Campo Largo',
              phone: '(41) 98844-3322',
              address: 'R. XV de Novembro, 1200 - Centro',
              rating: 4.7,
              reviews: 142,
              website: 'http://mundialveiculoscampolargo.com.br'
            },
            {
              id: 'm2',
              title: 'Vectra Multimarcas',
              phone: '(41) 99122-8877',
              address: 'Av. Arlindo Chemin, 450 - Centro',
              rating: 4.5,
              reviews: 89,
              website: 'https://vectramultimarcas.com.br'
            },
            {
              id: 'm3',
              title: 'Campo Largo Carros',
              phone: '(41) 98765-1122',
              address: 'Marginal Rodovia BR-277, Km 121',
              rating: 4.2,
              reviews: 34,
              website: ''
            },
            {
              id: 'm4',
              title: 'Auto Rápido Automóveis',
              phone: '(41) 99233-4455',
              address: 'R. Centenário, 1822 - Ouro Verde',
              rating: 4.8,
              reviews: 210,
              website: 'http://autorapido.com.br'
            }
          ]);
        }
      }, (idx + 1) * 800);
    });
  };

  const handleImportNotion = (leadId) => {
    setImportedLeads(prev => ({ ...prev, [leadId]: true }));
  };

  const handleStartSdr = (leadId) => {
    setApproachedLeads(prev => ({ ...prev, [leadId]: true }));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#07080e] min-h-screen">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Minerador de Leads</h2>
        <p className="text-slate-400 text-xs mt-0.5">
          Descubra empresas locais no Google Maps com telefones e sites de forma automática.
        </p>
      </div>

      {/* Miner config form */}
      <div className="glass p-5 rounded-2xl border border-slate-800/80">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-indigo-400" />
          Parâmetros da Busca
        </h3>
        
        <form onSubmit={handleStartMining} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5 col-span-1 md:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Termo ou Nicho Comercial</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Lojas de carros, Academias, Restaurantes"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-200 text-xs outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Cidade e Estado</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Curitiba - PR"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-200 text-xs outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="space-y-1.5 w-24 shrink-0">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Limite</label>
              <select 
                value={limit} 
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-200 text-xs outline-none"
              >
                <option value={5}>5 Leads</option>
                <option value={10}>10 Leads</option>
                <option value={20}>20 Leads</option>
                <option value={50}>50 Leads</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isMining}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isMining ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              {isMining ? 'Minerando...' : 'Iniciar'}
            </button>
          </div>
        </form>
      </div>

      {/* Progress status for Mining */}
      {isMining && (
        <div className="p-5 glass border border-indigo-500/20 rounded-2xl space-y-3.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              {statusText}
            </span>
            <span className="font-bold text-indigo-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-300 shadow-md shadow-indigo-500/40"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results Table */}
      {minedResults.length > 0 && (
        <div className="glass p-5 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center mb-5 border-b border-slate-850 pb-4">
            <h4 className="text-sm font-bold text-white">Resultados Extraídos</h4>
            <span className="text-[10px] font-extrabold bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-md">
              {minedResults.length} Leads Prontos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] text-slate-500 uppercase font-bold border-b border-slate-850">
                <tr>
                  <th className="pb-3 pl-2">Estabelecimento</th>
                  <th className="pb-3">Contato / WhatsApp</th>
                  <th className="pb-3">Endereço</th>
                  <th className="pb-3">Avaliação</th>
                  <th className="pb-3 text-center">Site</th>
                  <th className="pb-3 text-right pr-2">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/20">
                {minedResults.map(item => (
                  <tr key={item.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="py-4 pl-2 font-bold text-slate-100">{item.title}</td>
                    <td className="py-4 font-semibold text-indigo-400">{item.phone}</td>
                    <td className="py-4 text-slate-400 max-w-[200px] truncate" title={item.address}>{item.address}</td>
                    <td className="py-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-bold text-slate-200">{item.rating}</span>
                        <span className="text-slate-500 font-medium">({item.reviews})</span>
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      {item.website ? (
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-block p-1 bg-slate-900 hover:bg-slate-850 text-indigo-400 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/20 rounded-lg transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="py-4 text-right pr-2">
                      <div className="flex gap-2 justify-end">
                        {/* Import to Notion */}
                        <button
                          onClick={() => handleImportNotion(item.id)}
                          disabled={importedLeads[item.id]}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer ${
                            importedLeads[item.id]
                              ? 'bg-slate-950 text-slate-500 border border-slate-900'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-500/5'
                          }`}
                        >
                          {importedLeads[item.id] ? <Check className="w-3 h-3" /> : <Import className="w-3 h-3" />}
                          {importedLeads[item.id] ? 'Importado' : 'Notion'}
                        </button>

                        {/* Start SDR approach */}
                        <button
                          onClick={() => handleStartSdr(item.id)}
                          disabled={approachedLeads[item.id]}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer ${
                            approachedLeads[item.id]
                              ? 'bg-slate-950 text-slate-500 border border-slate-900'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/5'
                          }`}
                        >
                          {approachedLeads[item.id] ? <Check className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                          {approachedLeads[item.id] ? 'Abordado' : 'Disparar SDR'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
