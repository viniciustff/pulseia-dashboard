import React, { useState } from 'react';
import { 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Phone, 
  Car, 
  Calendar,
  AlertCircle,
  TrendingUp,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

export default function CRM({ clientInfo }) {
  // Lista de colunas do Kanban conforme as atualizadas no Notion do cliente
  const columns = [
    { id: 'lead', name: 'Novo Lead (IA)', color: 'border-t-indigo-500 text-indigo-400 bg-indigo-500/5' },
    { id: 'contato', name: 'Contato / Triagem', color: 'border-t-sky-500 text-sky-400 bg-sky-500/5' },
    { id: 'followup', name: 'Follow-up', color: 'border-t-purple-500 text-purple-400 bg-purple-500/5' },
    { id: 'visita', name: 'Visita/Reunião Agendada', color: 'border-t-amber-500 text-amber-400 bg-amber-500/5' },
    { id: 'ganho', name: 'Lead Ganho', color: 'border-t-emerald-500 text-emerald-400 bg-emerald-500/5' },
    { id: 'perdido', name: 'Lead Perdido', color: 'border-t-rose-500 text-rose-400 bg-rose-500/5' },
  ];

  // Dados iniciais mockados realistas para a Auto Vantage
  const [leads, setLeads] = useState([
    {
      id: 'l1',
      name: 'João Pedro Silveira',
      phone: '(41) 99882-3112',
      car: 'Jeep Compass Longitude 2022',
      date: '03 Jun 2026',
      column: 'lead',
      source: 'Tráfego Pago',
      notes: 'Gostaria de ver opções de parcelamento. Tem interesse em dar o dele na troca.'
    },
    {
      id: 'l2',
      name: 'Carla Albuquerque',
      phone: '(41) 98765-4321',
      car: 'Toyota Corolla XEi 2021',
      date: '02 Jun 2026',
      column: 'contato',
      source: 'Google Maps',
      notes: 'SDR IA fez o primeiro contato. Aguardando retorno sobre taxas do banco.'
    },
    {
      id: 'l3',
      name: 'Guilherme Mendes',
      phone: '(41) 99122-3344',
      car: 'Honda Civic Touring 2020',
      date: '01 Jun 2026',
      column: 'followup',
      source: 'Indicação',
      notes: 'SDR enviou proposta do Civic. Cliente ficou de analisar com a esposa.'
    },
    {
      id: 'l4',
      name: 'Roberto Dantas',
      phone: '(41) 99233-5566',
      car: 'Volkswagen Nivus Highline 2023',
      date: '28 Mai 2026',
      column: 'visita',
      source: 'Tráfego Pago',
      notes: 'Visita agendada para sábado 06/06 às 10:30 para test drive.'
    },
    {
      id: 'l5',
      name: 'Mariana Vasconcelos',
      phone: '(41) 98845-6677',
      car: 'Chevrolet Tracker Premier 2021',
      date: '25 Mai 2026',
      column: 'ganho',
      source: 'Tráfego Pago',
      notes: 'Veículo vendido! Ficha aprovada no banco e sinal de R$ 5.000 pago.'
    },
    {
      id: 'l6',
      name: 'Cláudio Ferreira',
      phone: '(41) 99766-0099',
      car: 'Ford Ka Hatch SE 2019',
      date: '22 Mai 2026',
      column: 'perdido',
      source: 'Google Maps',
      notes: 'Desistiu da compra. Comprou carro de um vizinho particular.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newLeadForm, setNewLeadForm] = useState(false);
  const [newLeadData, setNewLeadData] = useState({ name: '', phone: '', car: '', notes: '' });

  // Mover o lead de coluna através de botões direcionais
  const moveLead = (leadId, direction) => {
    const colIndexList = columns.map(c => c.id);
    setLeads(prevLeads => prevLeads.map(lead => {
      if (lead.id === leadId) {
        const currentIdx = colIndexList.indexOf(lead.column);
        let nextIdx = currentIdx;
        if (direction === 'right' && currentIdx < colIndexList.length - 1) {
          nextIdx = currentIdx + 1;
        } else if (direction === 'left' && currentIdx > 0) {
          nextIdx = currentIdx - 1;
        }
        return { ...lead, column: colIndexList[nextIdx] };
      }
      return lead;
    }));
  };

  // Suporte a Drag and Drop simplificado e fluido para modernidade
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      setLeads(prevLeads => prevLeads.map(lead => {
        if (lead.id === leadId) {
          return { ...lead, column: targetColumnId };
        }
        return lead;
      }));
    }
  };

  const createLead = (e) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.car) return;

    const newLead = {
      id: 'l_' + Date.now(),
      name: newLeadData.name,
      phone: newLeadData.phone || '(41) 99999-9999',
      car: newLeadData.car,
      date: 'Hoje',
      column: 'lead',
      source: 'Inserido Manualmente',
      notes: newLeadData.notes || 'Sem observações adicionais.'
    };

    setLeads([newLead, ...leads]);
    setNewLeadData({ name: '', phone: '', car: '', notes: '' });
    setNewLeadForm(false);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.car.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-x-auto p-6 bg-[#07080e] flex flex-col min-h-screen">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Notion CRM Kanban</h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Gerencie o pipeline de vendas. Arraste e solte cartões ou use as setas para avançar os leads.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por cliente ou veículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-200 text-xs outline-none"
            />
          </div>

          {/* Add lead button */}
          <button 
            onClick={() => setNewLeadForm(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/10 flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo Lead
          </button>
        </div>
      </div>

      {/* New Lead Modal / Form Drawer */}
      {newLeadForm && (
        <div className="mb-6 p-5 glass rounded-2xl border border-indigo-500/20 shrink-0">
          <h3 className="text-sm font-bold text-white mb-4">Adicionar Lead Manual no Funil</h3>
          <form onSubmit={createLead} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Nome do Cliente</label>
              <input 
                type="text" 
                required
                value={newLeadData.name}
                onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                placeholder="Ex: Anderson Santos"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 text-xs outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Telefone WhatsApp</label>
              <input 
                type="text" 
                value={newLeadData.phone}
                onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                placeholder="Ex: (41) 99999-8888"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 text-xs outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Veículo de Interesse</label>
              <input 
                type="text" 
                required
                value={newLeadData.car}
                onChange={(e) => setNewLeadData({ ...newLeadData, car: e.target.value })}
                placeholder="Ex: Hyundai HB20 Sense 2021"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 text-xs outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Salvar no CRM
              </button>
              <button 
                type="button" 
                onClick={() => setNewLeadForm(false)}
                className="py-2 px-4 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Board Layout */}
      <div className="flex gap-4 pb-4 overflow-x-auto select-none grow">
        {columns.map(col => {
          const colLeads = filteredLeads.filter(lead => lead.column === col.id);
          return (
            <div 
              key={col.id} 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="w-80 bg-[#0e1017]/85 border border-slate-850 rounded-2xl flex flex-col shrink-0 min-h-[480px] p-3 transition-colors duration-200"
            >
              {/* Column Header */}
              <div className={`p-2.5 rounded-xl border-t-2 ${col.color} flex justify-between items-center mb-3.5`}>
                <h3 className="text-xs font-bold tracking-wide uppercase">{col.name}</h3>
                <span className="text-[10px] font-extrabold bg-slate-900/80 px-2 py-0.5 rounded-md text-slate-400">
                  {colLeads.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-230px)] grow pr-1">
                {colLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-800/40 rounded-xl text-slate-600 text-center grow">
                    <AlertCircle className="w-5 h-5 mb-1.5 text-slate-700" />
                    <p className="text-[10px] font-semibold">Sem leads aqui</p>
                  </div>
                ) : (
                  colLeads.map(lead => (
                    <div 
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="p-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/70 hover:border-indigo-500/30 rounded-xl shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing relative group"
                    >
                      {/* Source badge */}
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[9px] font-bold bg-slate-950 text-indigo-400 border border-slate-800 px-2 py-0.5 rounded-md">
                          {lead.source}
                        </span>
                        <span className="text-[9px] text-slate-500 font-medium">{lead.date}</span>
                      </div>

                      {/* Client Name */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <h4 className="text-xs font-extrabold text-slate-100">{lead.name}</h4>
                      </div>

                      {/* Vehicle of Interest */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Car className="w-3.5 h-3.5 text-sky-400" />
                        <p className="text-xs text-slate-300 font-semibold">{lead.car}</p>
                      </div>

                      {/* Contact Phone */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <p className="text-[10px] text-slate-400 font-medium">{lead.phone}</p>
                      </div>

                      {/* Notes / Subtext */}
                      {lead.notes && (
                        <p className="text-[10px] text-slate-500 bg-slate-950/40 p-2 border border-slate-900/60 rounded-lg italic leading-relaxed">
                          "{lead.notes}"
                        </p>
                      )}

                      {/* Interactive Drag indicators / Arrow buttons for Mobile Accessibility */}
                      <div className="mt-3.5 pt-3 border-t border-slate-800/50 flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => moveLead(lead.id, 'left')}
                          className="p-1 bg-slate-950 border border-slate-850 hover:border-indigo-500/40 text-slate-400 hover:text-indigo-400 rounded-lg transition-all cursor-pointer"
                          title="Mover para esquerda"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Arraste</span>
                        <button 
                          onClick={() => moveLead(lead.id, 'right')}
                          className="p-1 bg-slate-950 border border-slate-850 hover:border-indigo-500/40 text-slate-400 hover:text-indigo-400 rounded-lg transition-all cursor-pointer"
                          title="Mover para direita"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
