import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  Percent, 
  Flame,
  ArrowUpRight,
  TrendingDown,
  Globe,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Metrics({ clientInfo }) {
  const isAdmin = clientInfo?.role === 'admin';

  // ==========================================
  // DADOS DA AGÊNCIA (PULSE IA - ADMIN)
  // ==========================================
  const agencyFunnelData = [
    { name: 'Extraídos (Maps)', leads: 400, conv: '100%', fill: '#6366f1' },
    { name: 'Aprovados CRM', leads: 200, conv: '50%', fill: '#818cf8' },
    { name: 'Respondidos BDR', leads: 80, conv: '40%', fill: '#a5b4fc' },
    { name: 'Testes Demo', leads: 24, conv: '30%', fill: '#c7d2fe' },
    { name: 'Qualificados SDR', leads: 12, conv: '50%', fill: '#e0e7ff' },
    { name: 'Agendados (Meet)', leads: 9, conv: '75%', fill: '#34d399' },
    { name: 'Fechados (Ganho)', leads: 3, conv: '33%', fill: '#10b981' },
  ];

  const agencyMonthlyLeads = [
    { day: '01/06', leads: 12 },
    { day: '02/06', leads: 18 },
    { day: '03/06', leads: 15 },
    { day: '04/06', leads: 22 },
    { day: '05/06', leads: 28 },
    { day: '06/06', leads: 35 },
    { day: '07/06', leads: 25 },
    { day: '08/06', leads: 30 },
    { day: '09/06', leads: 42 },
    { day: '10/06', leads: 50 },
    { day: '11/06', leads: 38 },
    { day: '12/06', leads: 45 },
  ];

  const agencyChannels = [
    { name: 'Scraping Google Maps', value: 75, color: '#10b981' },
    { name: 'Tráfego Pago (Ads)', value: 15, color: '#6366f1' },
    { name: 'Indicações / Mídias', value: 10, color: '#a855f7' },
  ];

  const agencyLeadsInNegotiation = [
    { id: 1, name: 'Auto Vantage Campo Largo', city: 'Campo Largo - PR', status: 'Teste Concluído', value: 'R$ 4.000 + R$ 1.200/mês' },
    { id: 2, name: 'Speed Way Multimarcas', city: 'Curitiba - PR', status: 'Reunião Agendada', value: 'R$ 4.000 + R$ 1.200/mês' },
    { id: 3, name: 'Paraná Carros Usados', city: 'Pinhais - PR', status: 'Abordado (BDR)', value: 'R$ 4.000 + R$ 1.200/mês' },
    { id: 4, name: 'Lapa Veículos Especiais', city: 'Lapa - PR', status: 'Novo Lead', value: 'R$ 4.000 + R$ 1.200/mês' },
  ];

  // ==========================================
  // DADOS DO CLIENTE (AUTO VANTAGE)
  // ==========================================
  const leadData = [
    { day: '01/06', leads: 4 },
    { day: '02/06', leads: 7 },
    { day: '03/06', leads: 5 },
    { day: '04/06', leads: 9 },
    { day: '05/06', leads: 12 },
    { day: '06/06', leads: 15 },
    { day: '07/06', leads: 11 },
    { day: '08/06', leads: 18 },
    { day: '09/06', leads: 22 },
    { day: '10/06', leads: 25 },
    { day: '11/06', leads: 20 },
    { day: '12/06', leads: 28 },
  ];

  const sourceData = [
    { name: 'Tráfego Pago (Meta/Google)', value: 45, color: '#6366f1' },
    { name: 'Google Meu Negócio', value: 25, color: '#a855f7' },
    { name: 'Indicações', value: 15, color: '#ec4899' },
    { name: 'Abordagem Ativa (SDR)', value: 15, color: '#10b981' },
  ];

  const latestLeads = [
    { id: 1, name: 'Marcos Vinícius', interest: 'Honda Civic Touring 2021', status: 'Reunião Agendada', value: 'R$ 138.900' },
    { id: 2, name: 'Patrícia Sales', interest: 'Jeep Compass Longitude 2022', status: 'Novo Lead (IA)', value: 'R$ 145.000' },
    { id: 3, name: 'Renato Cordeiro', interest: 'Toyota Corolla XEi 2020', status: 'Follow-up', value: 'R$ 109.900' },
    { id: 4, name: 'Bruna de Souza', interest: 'Volkswagen Nivus Highline 2022', status: 'Proposta Enviada', value: 'R$ 118.500' },
  ];

  const clientFunnelData = [
    { name: 'Prospecção', leads: 1450, conv: '100%', fill: '#6366f1' },
    { name: 'Qualificação', leads: 680, conv: '46.9%', fill: '#818cf8' },
    { name: 'Agendamento', leads: 124, conv: '18.2%', fill: '#a5b4fc' },
    { name: 'Proposta', leads: 54, conv: '43.5%', fill: '#c7d2fe' },
    { name: 'Fechamento', leads: 38, conv: '70.3%', fill: '#10b981' },
  ];

  const isDiego = clientInfo?.name?.includes('Diego');
  const baseLeads = isDiego ? 148 : 172;
  const baseConversion = isDiego ? '18.4%' : '21.5%';
  const baseRevenue = isDiego ? 'R$ 2.45M' : 'R$ 2.89M';
  const baseMeetings = isDiego ? 38 : 46;

  // ==========================================
  // RENDER SE FOR ADMINISTRADOR DA AGÊNCIA (PULSE IA)
  // ==========================================
  if (isAdmin) {
    return (
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#07080e]">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Painel de Crescimento - Pulse IA</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Métricas consolidadas de captação automática via Maps, eficiência do funil de IA e receitas acumuladas.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">Modo Administrador</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Faturamento Acumulado */}
          <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Faturamento Projetado (90d)</p>
                <h3 className="text-3xl font-extrabold text-white mt-1.5">R$ 46.800</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-slate-400 text-xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Projeção 6M: R$ 121.200</span>
            </div>
          </div>

          {/* Leads na Demo */}
          <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Leads Iniciaram Demo</p>
                <h3 className="text-3xl font-extrabold text-white mt-1.5">24</h3>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <Layers className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>30% de aceitação do BDR IA</span>
            </div>
          </div>

          {/* Conversão Geral */}
          <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Taxa de Fechamento</p>
                <h3 className="text-3xl font-extrabold text-white mt-1.5">3.75%</h3>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Percent className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-slate-400 text-xs">
              <span>Conversão de Respondidos BDR</span>
            </div>
          </div>

          {/* Custos Operacionais */}
          <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Custos de API (90d)</p>
                <h3 className="text-3xl font-extrabold text-white mt-1.5">R$ 1.350</h3>
              </div>
              <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                <Flame className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <span>Margem Líquida: 97.1%</span>
            </div>
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Funil do Marketing e Vendas da Agência */}
          <div className="lg:col-span-2 glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">Funil de Conversão Outbound Maps (Mensal)</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Acompanhamento de queda de leads em cada etapa da automação</p>
            </div>

            <div className="h-72 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agencyFunnelData} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" />
                  <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={120} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0e1017', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#f3f4f6'
                    }} 
                  />
                  <Bar dataKey="leads" radius={[0, 8, 8, 0]}>
                    {agencyFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Canais de Entrada de Leads */}
          <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Canais de Aquisição</h4>
              <p className="text-slate-400 text-[11px] mb-5">Origem dos pátios de veículos no funil</p>
            </div>

            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={agencyChannels}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {agencyChannels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Principal</span>
                <span className="text-sm font-extrabold text-emerald-400">Google Maps</span>
              </div>
            </div>

            {/* Legends */}
            <div className="space-y-2 mt-4">
              {agencyChannels.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <span className="text-slate-400 font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Volume Diário de Leads Minerados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass p-5 rounded-2xl border border-slate-800/80">
            <div>
              <h4 className="text-sm font-bold text-white">Volume de Mineração (Apify Scraper)</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Leads capturados do Google Maps por data no Paraná</p>
            </div>
            <div className="h-60 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={agencyMonthlyLeads} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="agencyColorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0e1017', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#f3f4f6'
                    }} 
                  />
                  <Area type="monotone" dataKey="leads" name="Leads Minerados" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#agencyColorLeads)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leads da Agência em Negociação */}
          <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-2">Pátios Ativos no Funil</h4>
              <p className="text-slate-400 text-[11px] mb-4">Lojas que testaram ou estão qualificando para reunião</p>
            </div>
            
            <div className="space-y-3.5 overflow-y-auto max-h-60 pr-1">
              {agencyLeadsInNegotiation.map((lead) => (
                <div key={lead.id} className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl flex flex-col gap-1.5 hover:border-emerald-500/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-xs font-bold text-white truncate max-w-[150px]">{lead.name}</h5>
                      <p className="text-[10px] text-slate-500">{lead.city}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                      lead.status === 'Teste Concluído' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      lead.status === 'Reunião Agendada' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      lead.status === 'Abordado (BDR)' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-850">
                    <span className="text-[9px] text-slate-400">Oferta Proposta</span>
                    <span className="text-[10px] font-bold text-slate-300">{lead.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER SE FOR CLIENTE (AUTO VANTAGE)
  // ==========================================
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#07080e]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Painel de Métricas</h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Monitoramento de leads, agendamentos e performance comercial da {clientInfo?.name || 'sua empresa'}.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
          <CalendarCheck className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">Junho 2026 (Ativo)</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1 */}
        <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total de Leads</p>
              <h3 className="text-3xl font-extrabold text-white mt-1.5">{baseLeads}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% em relação a Maio</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Agendamentos</p>
              <h3 className="text-3xl font-extrabold text-white mt-1.5">{baseMeetings}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <CalendarCheck className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.4% visitas agendadas</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conversão de Venda</p>
              <h3 className="text-3xl font-extrabold text-white mt-1.5">{baseConversion}</h3>
            </div>
            <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
              <Percent className="w-5 h-5 text-pink-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>SDR IA responde em &lt; 2min</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Valor em Negociação</p>
              <h3 className="text-3xl font-extrabold text-white mt-1.5">{baseRevenue}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Foco no fechamento do estoque</span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Lead Generation Chart */}
        <div className="lg:col-span-2 glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-bold text-white">Evolução do Volume de Leads</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Visão diária de novos leads que entraram em contato com a Auto Vantage</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0e1017', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f3f4f6'
                  }} 
                  />
                <Area type="monotone" dataKey="leads" name="Leads Recebidos" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Channels Donut Chart */}
        <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Canais de Aquisição</h4>
            <p className="text-slate-400 text-[11px] mb-5">Distribuição percentual dos canais de entrada de clientes</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-500">Principal</span>
              <span className="text-lg font-extrabold text-indigo-400">Tráfego</span>
            </div>
          </div>

          {/* Legends */}
          <div className="space-y-2 mt-4">
            {sourceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="text-slate-400 font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funil Comercial Section (Alinhado com Mockup da Landing Page) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funil de Conversão Comercial de 5 Etapas */}
        <div className="lg:col-span-2 glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Funil Comercial de Conversão (5 Etapas)</h4>
            <p className="text-slate-400 text-[11px] mt-0.5">Visão do volume de leads convertidos desde a prospecção da IA até o fechamento</p>
          </div>

          <div className="h-72 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientFunnelData} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0e1017', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f3f4f6'
                  }} 
                />
                <Bar dataKey="leads" radius={[0, 8, 8, 0]}>
                  {clientFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumo da Conversão do Funil */}
        <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-2">Desempenho Comercial</h4>
            <p className="text-slate-400 text-[11px] mb-4">Taxas de conversão detalhadas entre etapas</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl flex justify-between items-center text-xs">
              <span className="text-slate-400">Prospecção ➔ Qualificação</span>
              <span className="font-bold text-indigo-400">46.9%</span>
            </div>
            <div className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl flex justify-between items-center text-xs">
              <span className="text-slate-400">Qualificação ➔ Agendamento</span>
              <span className="font-bold text-indigo-400">18.2%</span>
            </div>
            <div className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl flex justify-between items-center text-xs">
              <span className="text-slate-400">Agendamento ➔ Proposta</span>
              <span className="font-bold text-indigo-400">43.5%</span>
            </div>
            <div className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-xl flex justify-between items-center text-xs">
              <span className="text-slate-400">Proposta ➔ Fechamento</span>
              <span className="font-bold text-emerald-400">70.3%</span>
            </div>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/10 p-3.5 rounded-xl mt-4">
            <p className="text-[10px] text-emerald-300 leading-normal">
              ✅ A taxa de fechamento após o agendamento comercial da IA da Pulse é de <strong>2.6%</strong> sobre o volume total de leads prospectados.
            </p>
          </div>
        </div>
      </div>

      {/* Latest Leads Table */}
      <div className="glass p-5 rounded-2xl border border-slate-800/80">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h4 className="text-sm font-bold text-white">Leads Recentes em Negociação</h4>
            <p className="text-slate-400 text-[11px] mt-0.5">Negócios de maior relevância no estoque físico</p>
          </div>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 group">
            Ver CRM Completo
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[10px] text-slate-500 uppercase font-bold border-b border-slate-800/60">
              <tr>
                <th className="pb-3.5 pl-2">Cliente</th>
                <th className="pb-3.5">Veículo de Interesse</th>
                <th className="pb-3.5">Status Funil</th>
                <th className="pb-3.5 pr-2 text-right">Valor Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {latestLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3.5 pl-2 font-semibold text-slate-100">{lead.name}</td>
                  <td className="py-3.5 text-slate-300 font-medium">{lead.interest}</td>
                  <td className="py-3.5">
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                      lead.status === 'Novo Lead (IA)' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      lead.status === 'Reunião Agendada' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      lead.status === 'Follow-up' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-right font-bold text-slate-200">{lead.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

