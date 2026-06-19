import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, TrendingUp, DollarSign, MessageSquare, Check, 
  ArrowRight, Shield, Activity, ChevronDown, User, Clock, 
  Building, Phone, Send, Calendar, Award, BarChart2, Star,
  UserCheck, Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Componente Auxiliar para Exibição dos Mockups do Painel
function MockupTabs() {
  const [activeMockup, setActiveMockup] = useState('metrics'); // 'metrics' ou 'crm'

  return (
    <div className="space-y-6">
      {/* Botões seletores */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setActiveMockup('metrics')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs md:text-sm border transition-all cursor-pointer flex items-center gap-2 ${
            activeMockup === 'metrics'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
              : 'bg-[#0b0c13] text-slate-400 border-slate-800/80 hover:text-white'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Painel de Crescimento (Métricas)</span>
        </button>
        <button 
          onClick={() => setActiveMockup('crm')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs md:text-sm border transition-all cursor-pointer flex items-center gap-2 ${
            activeMockup === 'crm'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
              : 'bg-[#0b0c13] text-slate-400 border-slate-800/80 hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Quadro Kanban (CRM de Vendas)</span>
        </button>
      </div>

      {/* Container de exibição com borda de vidro premium */}
      <div className="relative bg-[#0b0c13] border border-slate-800/80 rounded-3xl p-3.5 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/3 rounded-full blur-[80px] pointer-events-none"></div>
        {activeMockup === 'metrics' ? (
          <img 
            src="/dashboard_mockup.png" 
            alt="Painel de Métricas Pulse IA" 
            className="w-full h-auto rounded-2xl object-cover border border-slate-900 shadow-2xl transition-all duration-300" 
          />
        ) : (
          <img 
            src="/crm_mockup.png" 
            alt="Quadro Kanban CRM Pulse IA" 
            className="w-full h-auto rounded-2xl object-cover border border-slate-900 shadow-2xl transition-all duration-300" 
          />
        )}
      </div>
    </div>
  );
}

export default function Website({ onNavigateToLogin }) {
  // Estados para o simulador de ROI
  const [niche, setNiche] = useState('veiculos'); // veiculos, contabilidade, servicos
  const [leadsCount, setLeadsCount] = useState(250); // Leads mensais
  const [salesTeamSize, setSalesTeamSize] = useState(1); // Quantidade de Atendentes humanos
  const [averageTicket, setAverageTicket] = useState(2000); // Ticket médio em R$

  // Estados para o formulário de qualificação (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    businessType: 'veiculos',
    painPoint: 'delay_atendimento',
    agreedTerms: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Animação de chat simulada
  const [chatMessages, setChatMessages] = useState([]);
  const [chatStep, setChatStep] = useState(0);

  // Efeito para gerenciar as abas do painel no client-side
  useEffect(() => {
    const changeTab = (tabId) => {
      const tabs = ['metrics', 'crm', 'chats'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        const contentDiv = document.getElementById('preview-content-' + t);
        if (btn && contentDiv) {
          if (t === tabId) {
            btn.className = "py-3 px-5 rounded-xl font-bold text-xs transition-all bg-emerald-600 text-white border border-emerald-500 cursor-pointer whitespace-nowrap";
            contentDiv.className = t === 'chats' ? 'block' : 'block space-y-6';
          } else {
            btn.className = "py-3 px-5 rounded-xl font-bold text-xs transition-all bg-[#05060b] text-slate-400 border border-slate-800/80 hover:text-white cursor-pointer whitespace-nowrap";
            contentDiv.className = "hidden";
          }
        }
      });
    };

    const handleTabChange = (e) => {
      changeTab(e.detail);
    };

    window.setDashboardTab = changeTab;
    window.addEventListener('change-tab', handleTabChange);
    return () => {
      window.removeEventListener('change-tab', handleTabChange);
    };
  }, []);


  const mockChatFlow = [
    { sender: 'lead', text: 'Olá! Vi o anúncio do Jeep Compass 2022. Ainda está disponível?', time: '14:32:05' },
    { sender: 'bot', text: 'Digitando...', isTyping: true },
    { sender: 'bot', text: 'Olá! Sim, ele está disponível no nosso estoque físico e em excelente estado. 🚗✨ Gostaria de ver as fotos dele ou agendar um visita à loja para hoje?', time: '14:32:12' },
    { sender: 'lead', text: 'Queria saber o preço e se aceita troca.', time: '14:32:45' },
    { sender: 'bot', text: 'Digitando...', isTyping: true },
    { sender: 'bot', text: 'O valor dele é R$ 139.900. Aceitamos o seu usado na troca com uma das melhores avaliações do mercado! Qual carro você tem hoje para troca?', time: '14:32:51' },
    { sender: 'lead', text: 'Tenho um HB20 2018.', time: '14:33:15' },
    { sender: 'bot', text: 'Digitando...', isTyping: true },
    { sender: 'bot', text: 'Excelente escolha, o HB20 tem ótima saída! Para eu liberar uma pré-avaliação do seu HB20 e reservar o Compass para você ver, qual o melhor horário para dar uma passada aqui na loja hoje? 15h ou 17:30h?', time: '14:33:22' },
    { sender: 'lead', text: 'Pode ser às 17:30h.', time: '14:33:40' },
    { sender: 'bot', text: 'Digitando...', isTyping: true },
    { sender: 'bot', text: 'Agendado! 🚀 Acabei de enviar sua reserva para o nosso gerente de avaliação. Te esperamos às 17:30h. Nosso endereço é Av. Centenário, 1200. Posso confirmar seu nome?', time: '14:33:46' },
  ];

  // Efeito para simular o chat do WhatsApp rodando em loop
  useEffect(() => {
    if (chatStep < mockChatFlow.length) {
      const current = mockChatFlow[chatStep];
      let delay = 1800; // Tempo padrão entre mensagens

      if (current.isTyping) {
        delay = 1000; // Tempo digitando
      }

      const timer = setTimeout(() => {
        if (current.isTyping) {
          // Apenas mostra o indicador de digitando temporariamente
          setChatMessages(prev => [...prev, { ...current, id: chatStep }]);
          setChatStep(prev => prev + 1);
        } else {
          // Remove o "digitando" anterior se houver, e insere a mensagem real
          setChatMessages(prev => {
            const filtered = prev.filter(m => !m.isTyping);
            return [...filtered, { ...current, id: chatStep }];
          });
          setChatStep(prev => prev + 1);
        }
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Reinicia a simulação do chat depois de 6 segundos de inatividade
      const restartTimer = setTimeout(() => {
        setChatMessages([]);
        setChatStep(0);
      }, 6000);
      return () => clearTimeout(restartTimer);
    }
  }, [chatStep]);

  // Cálculos do simulador de ROI
  const humanSalary = 2800; // Média salarial Atendente + encargos de mercado = R$2.800
  const humanCostTotal = salesTeamSize * (humanSalary + 600); // Salário + licenças e ferramentas por pessoa (Ex: CRM, telefonia)
  
  // Custo da Pulse IA: setup básico (900) + custo variável por lead processado (R$ 0,80)
  const pulseCostTotal = 790 + (leadsCount * 0.60);
  const monthlySavings = Math.max(0, humanCostTotal - pulseCostTotal);

  // Estimativa de ganho de vendas pela resposta rápida (leads atendidos em < 1 min convertem ~65% mais que respondidos após 30 min)
  const speedConversionMultiplier = 1.45; 
  const currentConversionRate = 0.03; // Conversão conservadora de 3% de leads em vendas
  const estimatedSalesNoPulse = Math.round(leadsCount * currentConversionRate);
  const estimatedSalesWithPulse = Math.round(leadsCount * currentConversionRate * speedConversionMultiplier);
  const extraRevenue = Math.max(0, (estimatedSalesWithPulse - estimatedSalesNoPulse) * averageTicket);
  const totalFinancialImpact = monthlySavings + extraRevenue;

  // Dados para o Gráfico de Tempo de Resposta (Fator Crítico de Perda de Leads)
  const chartData = [
    { name: 'Humano Médio', tempo: 35, label: '35 min (Espera)', color: '#ef4444' },
    { name: 'Pulse IA', tempo: 0.25, label: '15 seg (Instantâneo)', color: '#00ff87' }
  ];

  // Manipulação do Formulário
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.companyName.trim()) return;
    if (step === 2 && !formData.phone.trim()) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação do envio para o Painel de Vendas (CRM) e geração do link dinâmico de redirecionamento
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // WhatsApp Oficial da Pulse IA (Simulado ou Real)
      const phoneNum = "5541999999999"; 
      const challengeLabel = {
        delay_atendimento: 'Demora no atendimento',
        perda_leads: 'Perda de leads fora de hora',
        falta_sdr: 'Falta de equipe comercial',
        escalar: 'Escalar vendas automáticas'
      }[formData.painPoint];

      const text = encodeURIComponent(
        `Olá! Acabei de simular o ROI da minha empresa no site da Pulse IA.\n\n` +
        `*Empresa:* ${formData.companyName}\n` +
        `*Desafio:* ${challengeLabel}\n` +
        `*WhatsApp:* ${formData.phone}\n\n` +
        `Gostaria de falar com o time de engenharia de IA para liberar meu acesso piloto!`
      );

      // Redireciona o usuário para o WhatsApp após 1.5 segundos
      setTimeout(() => {
        window.open(`https://wa.me/${phoneNum}?text=${text}`, '_blank');
        setIsModalOpen(false);
        setStep(1);
        setIsSuccess(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#05060b] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      
      {/* Luzes de Fundo Decorativas (Ambient Glow) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00ff87]/3 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-10 w-[700px] h-[700px] bg-teal-600/3 rounded-full blur-[180px] pointer-events-none z-0"></div>

      {/* NAVBAR */}
      <header className="sticky top-0 w-full z-40 bg-[#05060b]/70 backdrop-blur-md border-b border-slate-900/80 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Pulse IA Logo" className="h-10 w-auto rounded-lg object-contain" onError={(e) => {
              // Fallback se a imagem não carregar por algum motivo
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <div style={{ display: 'none' }} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-[#00ff87] flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/20">
                <Bot className="w-5.5 h-5.5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">Pulse IA</span>
              <span className="block text-[9px] text-[#00ff87] tracking-widest font-bold uppercase -mt-0.5">Prospecção Inteligente</span>
            </div>
          </div>

          {/* Links Rápidos (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#diferenciais" className="hover:text-white transition-colors">Recursos</a>
            <a href="#simulador" className="hover:text-white transition-colors">Simulador de ROI</a>
            <a href="#casos" className="hover:text-white transition-colors">Casos de Sucesso</a>
            <a href="#precos" className="hover:text-white transition-colors">Planos</a>
            <a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a>
          </nav>

          {/* Botões de Ação */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateToLogin}
              className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2 cursor-pointer"
            >
              Área do Cliente
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs md:text-sm text-white font-bold rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all cursor-pointer border border-emerald-500/10"
            >
              Falar com Especialista
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-32 px-4 md:px-8 z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Copywriting */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agentes e Atendentes Comerciais Inteligentes</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Estruturamos toda a máquina de <span className="bg-gradient-to-r from-emerald-400 via-[#00ff87] to-teal-400 bg-clip-text text-transparent">Atração, Prospecção e Fechamento</span> do seu negócio.
          </h1>

          <p className="text-slate-400 text-sm md:text-lg max-w-xl leading-relaxed">
            Geramos leads com anúncios de tráfego pago (Atração), qualificamos os contatos em segundos no WhatsApp através de atendentes digitais (Prospecção) e colocamos as visitas ou reuniões prontas na agenda do seu time de vendas (Fechamento). Sua empresa focada apenas em assinar os contratos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2.5 text-sm md:text-base border border-emerald-400/20"
            >
              <span>Quero Lotar Minha Agenda</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            
            <a 
              href="#simulador"
              className="px-6 py-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <span>Como Funciona as 3 Fases</span>
            </a>
          </div>

          {/* Micro Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900/60 max-w-lg">
            <div>
              <span className="block text-2xl font-black text-white">60s</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Tempo de resposta</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-white">0%</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Desperdício de lead</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-white">24/7</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Disponibilidade</span>
            </div>
          </div>
        </div>

        {/* Right Side: High Fidelity Animated WhatsApp Widget */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-600 to-[#00ff87] rounded-[32px] blur-lg opacity-20 pointer-events-none"></div>
          
          <div className="relative bg-[#0b0d14] border border-slate-800/80 rounded-[30px] shadow-2xl overflow-hidden w-full max-w-[420px] mx-auto">
            {/* Header do WhatsApp */}
            <div className="bg-[#111420] border-b border-slate-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-700 flex items-center justify-center border border-emerald-400/20">
                    <Bot className="w-5.5 h-5.5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111420] rounded-full"></span>
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white leading-tight">Prospecção Inteligente</h4>
                  <p className="text-[10px] text-emerald-400 font-medium">Online • Pulse IA</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">
                  DEMO LIVE
                </span>
              </div>
            </div>

            {/* Corpo de Mensagens do Chat */}
            <div className="h-[360px] overflow-y-auto px-4 py-5 bg-[#08090e] space-y-3.5 flex flex-col justify-start custom-scrollbar">
              <AnimatePresence initial={false}>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`flex flex-col max-w-[80%] ${msg.sender === 'lead' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    {msg.isTyping ? (
                      <div className="bg-[#141827] border border-slate-800/50 px-4 py-2.5 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    ) : (
                      <div className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed ${
                        msg.sender === 'lead' 
                          ? 'bg-emerald-600 text-white rounded-tr-sm text-right' 
                          : 'bg-[#141827] border border-slate-800 text-slate-200 rounded-tl-sm text-left'
                      }`}>
                        {msg.text}
                      </div>
                    )}
                    
                    {!msg.isTyping && (
                      <span className="text-[9px] text-slate-600 mt-1 font-semibold px-1">
                        {msg.time}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Fake do WhatsApp */}
            <div className="bg-[#111420] border-t border-slate-900 px-4 py-3.5 flex items-center gap-3">
              <div className="flex-1 bg-[#08090e] border border-slate-800/80 rounded-full px-4.5 py-2 text-left text-xs text-slate-500 flex items-center">
                Atendimento por Inteligência Artificial
              </div>
              <button className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Send className="w-4 h-4 translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA ÚNICA MATADORA SHOWCASE */}
      <section className="relative py-12 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="relative bg-gradient-to-b from-[#0e111d] to-[#07080e] border border-emerald-500/30 rounded-[32px] p-8 md:p-12 shadow-2xl overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-950/50 border border-emerald-400/30 rounded-full text-xs font-bold text-emerald-300 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#00ff87] animate-pulse" />
              O Pacto Comercial Pulse IA
            </span>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
              Nós montamos a máquina. Nós atraímos e agendamos. <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-[#00ff87] to-teal-400 bg-clip-text text-transparent">
                Você apenas fecha a venda.
              </span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto">
              Uma solução de engenharia comercial completa que une tráfego pago, inteligência artificial humanizada e garantia real em contrato.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative z-10">
            
            <div className="bg-[#05060b]/60 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/20 transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-white">1. Nosso Trabalho (Nós Fazemos)</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Criamos os anúncios no Meta (Instagram/Facebook) e Google, conectamos nossa IA humanizada treinada na cultura do seu negócio para responder no WhatsApp em até 15 segundos e qualificamos cada contato.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-center gap-2">
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-bold">Inbound Comercial</span>
              </div>
            </div>

            <div className="bg-[#05060b]/60 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/20 transition-all">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center border border-emerald-500/20">
                  <UserCheck className="w-5 h-5 text-[#00ff87]" />
                </div>
                <h3 className="text-base font-bold text-white">2. Seu Trabalho (Você Faz)</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Você e seus vendedores não perdem tempo com curiosos ou contatos frios. Apenas recebem as visitas físicas agendadas ou reuniões comerciais diretamente no calendário da equipe e no seu painel (CRM).
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-center gap-2">
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-bold">Foco Exclusivo em Vendas</span>
              </div>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/40 flex items-center justify-center border border-emerald-500/30">
                  <Shield className="w-5 h-5 text-emerald-300 animate-pulse" />
                </div>
                <h3 className="text-base font-bold text-white">3. Garantia Irrevogável</h3>
                <p className="text-emerald-100/80 text-xs leading-relaxed font-medium">
                  Ativação em até 10 dias úteis. Se a máquina comercial estruturada não estiver gerando reuniões ou visitas de leads qualificados na sua agenda comercial, devolvemos 100% da taxa de setup cobrada.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-500/10 flex items-center gap-2">
                <span className="text-[10px] bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded font-extrabold tracking-wide uppercase">Risco Zero no Setup</span>
              </div>
            </div>

          </div>

          <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 items-center text-left">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>Contrato de Exclusividade por Região:</strong> Devido à alta alocação de verba em tráfego localizado e ao setup customizado de IA, só aceitamos **1 cliente por nicho comercial** em cada microrregião metropolitana.
              </p>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer border border-emerald-400/20"
              >
                Verificar Disponibilidade na Minha Cidade
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* DIFERENCIAIS DA INFRAESTRUTURA */}
      <section id="diferenciais" className="py-20 bg-[#07080e]/60 border-y border-slate-900 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-emerald-950/30 border border-emerald-500/20 max-w-3xl mx-auto p-5 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-5 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/3 rounded-full blur-2xl pointer-events-none"></div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">🛡️ Garantia de Ativação Pulse IA</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Foco em performance de vendas. Se toda a engrenagem (Anúncios + Inteligência de Qualificação + Painel CRM) não estiver rodando ativa em até 10 dias após a taxa de setup, devolvemos 100% do valor da taxa de configuração. O risco é nosso.
            </p>
          </div>
        </div>

        <div className="text-center space-y-3.5 mb-16 max-w-xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-[#00ff87] font-black">Por que a Pulse IA?</h2>
            <p className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              Gerenciamos toda a sua aquisição de clientes.
            </p>
            <p className="text-slate-400 text-sm">
              Cuidamos desde a criação dos anúncios de atração até o agendamento de reuniões prontas. Deixamos a engrenagem rodando para que sua única preocupação seja fazer a venda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass glass-hover p-8 rounded-3xl text-left border border-slate-800/80 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fase 1: Atração (Tráfego de Elite)</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Criamos e gerenciamos campanhas direcionadas no Instagram, Facebook e Google para atrair empresários e compradores qualificados com real intenção de compra.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass glass-hover p-8 rounded-3xl text-left border border-slate-800/80 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fase 2: Prospecção (IA Comercial)</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Nossa tecnologia de atendimento inteligente acolhe e qualifica cada lead em segundos no WhatsApp, filtrando curiosos de forma totalmente natural e ágil.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass glass-hover p-8 rounded-3xl text-left border border-slate-800/80 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fase 3: Fechamento (Agenda & CRM)</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Os clientes qualificados são agendados direto no calendário da sua equipe de vendas e sincronizados no seu Painel (CRM) com o resumo completo da conversa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROI SIMULATOR */}
      <section id="simulador" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        
        <div className="text-center space-y-3.5 mb-16 max-w-xl mx-auto">
          <span className="px-3 py-1 bg-emerald-950/40 border border-[#00ff87]/20 rounded-full text-xs font-semibold text-[#00ff87]">
            Descubra quanto dinheiro sua empresa está deixando na mesa hoje
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Simule o impacto financeiro no seu caixa.
          </h2>
          <p className="text-slate-400 text-sm">
            Arraste os controles abaixo de acordo com a realidade comercial da sua empresa e veja o ROI estimado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-[#0b0c13] border border-slate-800/80 p-6 md:p-8 rounded-3xl flex flex-col justify-between space-y-6">
            
            

            {/* Slider 1: Leads por Mês */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                <span>Leads captados por mês</span>
                <span className="text-[#00ff87] text-base font-bold">{leadsCount} leads</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="2000" 
                step="25"
                value={leadsCount} 
                onChange={(e) => setLeadsCount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                <span>50 leads</span>
                <span>2.000 leads</span>
              </div>
            </div>

            {/* Slider 2: Equipe Comercial Atendente */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                <span>Quantidade de Atendentes humanos na equipe</span>
                <span className="text-emerald-400 text-base font-bold">{salesTeamSize} {salesTeamSize === 1 ? 'Atendente' : 'Atendentes'}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="1"
                value={salesTeamSize} 
                onChange={(e) => setSalesTeamSize(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                <span>1 Atendente</span>
                <span>10 Atendentes</span>
              </div>
            </div>

            {/* Slider 3: Ticket Médio */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                <span>Ticket Médio de Venda</span>
                <span className="text-emerald-400 text-base font-bold">R$ {averageTicket.toLocaleString('pt-BR')}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="10000" 
                step="100"
                value={averageTicket} 
                onChange={(e) => setAverageTicket(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                <span>R$ 100</span>
                <span>R$ 10.000</span>
              </div>
            </div>

            {/* Fato Crítico: Gráfico Visual de Tempo de Resposta */}
            <div className="bg-[#05060b] border border-slate-900/60 p-4 rounded-2xl mt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 text-left">
                Gargalo Técnico: Tempo Médio de Primeiro Contato (Minutos)
              </h4>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={80} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#0b0d14] border border-slate-800 p-2 rounded-xl text-xs">
                              <span className="font-bold text-white">{payload[0].payload.name}: </span>
                              <span className="text-emerald-300 font-semibold">{payload[0].payload.label}</span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="tempo" radius={6} barSize={12}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Results Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#101323] to-[#08090f] border border-emerald-500/20 p-8 rounded-3xl flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            {/* Background glowing gradient circle */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-[#00ff87] font-black uppercase tracking-widest block mb-1">
                  Impacto Mensal Estimado
                </span>
                <div className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
                  R$ {totalFinancialImpact.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  Impacto gerado somando economia de folha e leads qualificados que deixam de ser perdidos.
                </p>
              </div>

              <div className="h-px bg-slate-900"></div>

              {/* Detalhes de Retorno */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Redução de custos operacionais:</span>
                  </div>
                  <span className="font-bold text-emerald-400">R$ {monthlySavings.toLocaleString('pt-BR')}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Previsão de vendas adicionais:</span>
                  </div>
                  <span className="font-bold text-emerald-400">+{estimatedSalesWithPulse - estimatedSalesNoPulse} {estimatedSalesWithPulse - estimatedSalesNoPulse === 1 ? 'venda' : 'vendas'}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Bot className="w-4 h-4 text-[#00ff87] shrink-0" />
                    <span>Investimento na Pulse IA:</span>
                  </div>
                  <span className="font-bold text-slate-300">R$ {pulseCostTotal.toLocaleString('pt-BR')}/mês</span>
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/10 p-4 rounded-2xl">
                <p className="text-[11px] text-emerald-300 leading-relaxed font-medium">
                  💡 <strong>Fórmula da Eficiência:</strong> Atendendo em até 1 minuto, o volume de leads que agendam e vão até o funil de vendas aumenta devido à alta taxa de resposta instantânea.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 w-full py-4.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2.5 border border-emerald-400/20"
            >
              <span>Quero Lotar Minha Agenda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* CASOS DE SUCESSO / DEPOIMENTOS */}
      <section id="casos" className="py-20 bg-[#07080e]/60 border-y border-slate-900 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Esquerda: Conteúdo */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#00ff87] font-black block">Estudo de Caso</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Como a Auto Vantage otimizou seu atendimento comercial.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Antes da Pulse IA, a loja de Campo Largo sofria para responder os leads do Instagram e do site fora do horário comercial. 
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-slate-300">Resumos em áudio e texto das conversas enviados direto no Painel de Vendas (CRM).</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-slate-300">Atendimento de leads das 19h às 08h de forma inteligente e contínua.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-slate-300">Mais de 250 visitas físicas de clientes qualificados agendadas diretamente na loja.</p>
                </div>
              </div>
            </div>

            {/* Direita: Gráfico de Sucesso Simulado */}
            <div className="lg:col-span-7 bg-[#0b0c13] border border-slate-800/80 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs text-slate-600 font-bold">CASE ESTUDADO</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900/40 flex items-center justify-center border border-emerald-500/20">
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Auto Vantage Veículos</h4>
                  <p className="text-xs text-[#00ff87]">Nicho Automotivo • Paraná</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#05060b] border border-slate-900 p-5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Média de Leads Qualificados / Mês</span>
                  <div className="text-3xl font-black text-white">+148%</div>
                  <div className="w-full bg-slate-950 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#00ff87] h-full w-[85%]"></div>
                  </div>
                </div>
                
                <div className="bg-[#05060b] border border-slate-900 p-5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Custo por Qualificação (CPA)</span>
                  <div className="text-3xl font-black text-emerald-400">-64%</div>
                  <div className="w-full bg-slate-950 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[90%]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl text-left">
                <p className="text-xs text-emerald-200 leading-relaxed">
                  "O atendimento imediato fora do horário comercial mudou o jogo. A maioria das pessoas pesquisa carros à noite ou no final de semana. A IA Atendente acolhe, qualifica e deixa a visita agendada na segunda pela manhã."
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold">Diretoria Auto Vantage</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO DO PAINEL GERENCIAL & CRM SHOWCASE */}
      <section className="py-20 bg-[#08090f] border-b border-slate-900 px-4 md:px-8 relative z-10 text-center">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3.5 max-w-xl mx-auto">
            <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-300">
              Transparência & Controle Comercial
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Acompanhe cada lead e agendamento em tempo real.
            </h2>
            <p className="text-slate-400 text-sm">
              Você ganha acesso a um painel administrativo integrado para ver as métricas de conversão e gerenciar suas negociações em andamento de forma simples.
            </p>
          </div>

          {/* Componente Interativo de Abas dos Mockups */}
          <div className="max-w-5xl mx-auto">
            <MockupTabs />
          </div>
        </div>
      </section>

      {/* PLANOS E PREÇOS */}
      <section id="precos" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10 text-left">
        <div className="text-center space-y-3.5 mb-16 max-w-xl mx-auto">
          <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-300">
            Valores Transparentes
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Planos sob medida para sua escala.
          </h2>
          <p className="text-slate-400 text-sm">
            Investimento focado na economia de equipe comercial e aceleração de faturamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Plano 1: Pulse Express */}
          <div className="bg-[#0b0c13] border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between relative">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Pulse Express</h3>
                <p className="text-xs text-slate-500 mt-1">Ideal para validação e testes iniciais.</p>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-white">R$ 790</span>
                <span className="text-slate-500 text-xs font-bold">/mês + setup</span>
              </div>

              <div className="h-px bg-slate-900"></div>

              <ul className="space-y-4 text-xs md:text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 Instância de WhatsApp Atendente/Agente</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Até 300 leads processados por mês</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Integração com 1 Painel de Vendas (CRM)</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600 line-through">
                  <span>Dashboard multi-unidade customizado</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600 line-through">
                  <span>Mineração automática de concorrência</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 w-full py-4 bg-slate-900 hover:bg-slate-900/80 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold rounded-2xl text-xs md:text-sm transition-all cursor-pointer"
            >
              Ativar Pulse Express
            </button>
          </div>

          {/* Plano 2: Growth Agência (Premium) */}
          <div className="bg-[#0b0c13] border-2 border-emerald-600 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl">
            {/* Pop de Destaque */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              MAIS VENDIDO
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Pulse Pro</span>
                  <Sparkles className="w-4.5 h-4.5 text-[#00ff87]" />
                </h3>
                <p className="text-xs text-emerald-400/80 mt-1">Perfeito para PMEs em escala ativa.</p>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-white">R$ 1.490</span>
                <span className="text-slate-500 text-xs font-bold">/mês + setup</span>
              </div>

              <div className="h-px bg-slate-900"></div>

              <ul className="space-y-4 text-xs md:text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#00ff87] shrink-0" />
                  <span className="font-semibold text-white">Instâncias ilimitadas (Outbound/Inbound)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#00ff87] shrink-0" />
                  <span>Até 1.500 leads processados por mês</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#00ff87] shrink-0" />
                  <span>Integração CRM de Vendas + sistemas de integração Avançada</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#00ff87] shrink-0" />
                  <span>Acesso ao Painel Admin / Métricas completo</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#00ff87] shrink-0" />
                  <span className="text-white">Suporte Premium e Mineração de leads ativada</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl text-xs md:text-sm shadow-lg shadow-emerald-500/10 transition-all cursor-pointer border border-emerald-500/10"
            >
              Ativar Pulse Pro
            </button>
          </div>
        </div>
      </section>

      {/* INTEGRATED DASHBOARD PREVIEW (MOCKUP INTERATIVO) */}
      <section className="py-20 bg-[#05060b] border-t border-slate-900 px-4 md:px-8 relative z-10 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-3.5 mb-16 max-w-xl mx-auto">
            <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-300">
              Transparência Comercial
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              O Painel de Controle que sua empresa recebe.
            </h2>
            <p className="text-slate-400 text-sm">
              Não fique no escuro. Acompanhe em tempo real as conversas, o status de cada lead no CRM e os indicadores de conversão da sua máquina.
            </p>
          </div>

          {/* Interactive Preview Container */}
          <div className="bg-[#0b0c13] border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl max-w-5xl mx-auto">
            
            {/* Abas do Painel */}
            <div className="flex gap-2 pb-6 border-b border-slate-900 overflow-x-auto">
              <button 
                onClick={() => window.setDashboardTab?.('metrics') || window.dispatchEvent(new CustomEvent('change-tab', {detail: 'metrics'}))}
                id="tab-btn-metrics"
                className="py-3 px-5 rounded-xl font-bold text-xs transition-all bg-emerald-600 text-white border border-emerald-500 cursor-pointer whitespace-nowrap"
              >
                📊 Indicadores de Conversão
              </button>
              <button 
                onClick={() => window.setDashboardTab?.('crm') || window.dispatchEvent(new CustomEvent('change-tab', {detail: 'crm'}))}
                id="tab-btn-crm"
                className="py-3 px-5 rounded-xl font-bold text-xs transition-all bg-[#05060b] text-slate-400 border border-slate-800/80 hover:text-white cursor-pointer whitespace-nowrap"
              >
                📂 CRM e Funil de Vendas
              </button>
              <button 
                onClick={() => window.setDashboardTab?.('chats') || window.dispatchEvent(new CustomEvent('change-tab', {detail: 'chats'}))}
                id="tab-btn-chats"
                className="py-3 px-5 rounded-xl font-bold text-xs transition-all bg-[#05060b] text-slate-400 border border-slate-800/80 hover:text-white cursor-pointer whitespace-nowrap"
              >
                💬 Conversas e Histórico
              </button>
            </div>

            {/* Renderizador de Conteúdo da Aba */}
            <div className="pt-8 min-h-[340px]">
              <div id="preview-content-metrics" className="block space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#05060b] border border-slate-900 p-6 rounded-2xl">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Leads Atendidos</span>
                    <div className="text-3xl font-black text-white">1.240</div>
                    <span className="text-[10px] text-emerald-400 font-bold">+18.5% esta semana</span>
                  </div>
                  <div className="bg-[#05060b] border border-slate-900 p-6 rounded-2xl">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Visitas Agendadas</span>
                    <div className="text-3xl font-black text-[#00ff87]">184</div>
                    <span className="text-[10px] text-emerald-400 font-bold">14.8% Conversão final</span>
                  </div>
                  <div className="bg-[#05060b] border border-slate-900 p-6 rounded-2xl">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Custo Médio por Lead (CPA)</span>
                    <div className="text-3xl font-black text-emerald-400">R$ 4,50</div>
                    <span className="text-[10px] text-emerald-400 font-bold">Queda de 32% no custo</span>
                  </div>
                </div>
                <div className="bg-[#05060b] border border-slate-900 p-6 rounded-2xl text-center">
                  <p className="text-xs text-slate-400">📊 Gráficos de velocidade de resposta mostram que <strong>98.6% dos leads</strong> foram atendidos em menos de 45 segundos.</p>
                </div>
              </div>

              <div id="preview-content-crm" className="hidden space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Coluna 1 */}
                  <div className="bg-[#05060b] border border-slate-900 p-4 rounded-2xl">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-900">Novo Contato (5)</h5>
                    <div className="space-y-2">
                      <div className="bg-[#0b0c13] border border-slate-800/80 p-3 rounded-xl text-xs">
                        <p className="font-bold text-white">Carlos Silva</p>
                        <p className="text-[10px] text-slate-500 mt-1">Nicho: Revenda • Origem: Facebook Ads</p>
                      </div>
                      <div className="bg-[#0b0c13] border border-slate-800/80 p-3 rounded-xl text-xs">
                        <p className="font-bold text-white">Juliana Martins</p>
                        <p className="text-[10px] text-slate-500 mt-1">Nicho: Contabilidade • Origem: Google</p>
                      </div>
                    </div>
                  </div>
                  {/* Coluna 2 */}
                  <div className="bg-[#05060b] border border-slate-900 p-4 rounded-2xl">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-900">Qualificado (3)</h5>
                    <div className="space-y-2">
                      <div className="bg-[#0b0c13] border border-slate-800/80 p-3 rounded-xl text-xs">
                        <p className="font-bold text-white">Fernando Ramos</p>
                        <p className="text-[10px] text-emerald-400 mt-1">Faturamento: R$ 50k • Desafio: Delay</p>
                      </div>
                    </div>
                  </div>
                  {/* Coluna 3 */}
                  <div className="bg-[#05060b] border border-slate-900 p-4 rounded-2xl">
                    <h5 className="text-xs font-bold text-[#00ff87] uppercase tracking-wider mb-3 pb-2 border-b border-slate-900">Visita Agendada (2)</h5>
                    <div className="space-y-2">
                      <div className="bg-[#0b0c13] border-2 border-[#00ff87]/30 p-3 rounded-xl text-xs">
                        <p className="font-bold text-white">Ricardo Mendes</p>
                        <p className="text-[10px] text-[#00ff87] mt-1">📅 Hoje às 17:30 - Compass 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="preview-content-chats" className="hidden">
                <div className="border border-slate-900 rounded-2xl overflow-hidden max-w-xl mx-auto">
                  <div className="bg-[#111420] px-4 py-3 text-xs font-bold text-white flex items-center justify-between">
                    <span>Chat Ativo: Fernando Ramos</span>
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                  </div>
                  <div className="bg-[#05060b] p-4 space-y-3 h-48 overflow-y-auto text-xs">
                    <div className="bg-slate-900 text-slate-300 p-2.5 rounded-xl rounded-tl-sm max-w-[85%] self-start text-left">
                      Olá! Vi seu anúncio sobre automação comercial. Gostaria de saber como funciona.
                    </div>
                    <div className="bg-emerald-600 text-white p-2.5 rounded-xl rounded-tr-sm max-w-[85%] ml-auto text-left">
                      Olá Fernando! Claro. Nosso atendente digital atrai leads por tráfego, atende em segundos no WhatsApp e qualifica antes de agendar. Qual o nicho da sua empresa?
                    </div>
                    <div className="bg-slate-900 text-slate-300 p-2.5 rounded-xl rounded-tl-sm max-w-[85%] self-start text-left">
                      Temos uma revenda de carros. Perdemos muitos leads no fim de semana.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-[#07080e]/60 border-t border-slate-900 px-4 md:px-8 relative z-10 text-left">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-3.5 mb-16 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">Dúvidas Frequentes</h2>
            <p className="text-slate-400 text-sm">
              Tudo o que você precisa saber sobre o funcionamento das nossas IAs e a infraestrutura técnica.
            </p>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="bg-[#0b0c13] border border-slate-800/60 p-6 rounded-2xl">
              <h4 className="text-sm md:text-base font-bold text-white mb-2">A IA atende de forma humana ou parece um robô padrão?</h4>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Nossos agentes comerciais utilizam modelos avançados parametrizados com atraso de digitação dinâmico ("typing...") e tom de fala natural. Eles conversam de forma livre, respondem perguntas complexas e negociam, evitando fluxos travados de botões engessados.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-[#0b0c13] border border-slate-800/60 p-6 rounded-2xl">
              <h4 className="text-sm md:text-base font-bold text-white mb-2">Como é feita a integração com o meu sistema atual?</h4>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Nós integramos o fluxo de atendimento com o seu CRM de preferência (CRM de Vendas, Hubspot, Trello, etc.) usando o sistemas de integração e webhooks rápidos na VPS. Toda conversa gera um resumo estruturado no seu painel para que seu vendedor humano continue de onde o robô parou.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-[#0b0c13] border border-slate-800/60 p-6 rounded-2xl">
              <h4 className="text-sm md:text-base font-bold text-white mb-2">Preciso pagar por ferramentas terceiras como Make ou Zapier?</h4>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Não. A Pulse IA possui infraestrutura própria hospedada em VPS de alta performance com sistemas de integração integrado, o que zera a necessidade de você assinar planos caros de Zapier ou Make para as integrações padrões.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#040508] border-t border-slate-900/60 py-12 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Pulse IA" className="w-8 h-8 rounded-lg object-contain" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <div style={{ display: 'none' }} className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold text-white">Pulse IA</span>
              <span className="block text-[8px] text-slate-500 font-bold tracking-widest uppercase">Prospecção Inteligente</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-600">
            &copy; 2026 Pulse IA Inc. Todos os direitos reservados.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => alert('Termos de Uso em desenvolvimento institucional.')}
              className="text-xs text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <span className="text-slate-800">•</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              Suporte Técnico
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL: FORMULÁRIO DE QUALIFICAÇÃO INTEGRADO EM ETAPAS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#05060b]/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0b0d14] border border-slate-800/80 rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-2 text-center text-[10px] text-white font-bold tracking-wide select-none">
                🚨 EXCLUSIVIDADE: Apenas 1 vaga por região metropolitana ativa.
              </div>
              <div className="px-6 py-5 bg-[#111420] border-b border-slate-900 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-[#00ff87]" />
                    <span>Configuração do Piloto</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Etapa {step} de 3</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold"
                >
                  Fechar
                </button>
              </div>

              {/* Corpo do Formulário */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-5 text-left">
                {isSuccess ? (
                  <div className="py-8 flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Dados Registrados com Sucesso!</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto">
                        Salvando no Painel de Vendas (CRM) e redirecionando você para o WhatsApp de atendimento comercial da Pulse IA...
                      </p>
                    </div>
                    <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    {/* Step 1: Nome da Empresa */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Qual o nome da sua empresa?</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Ex: Auto Vantage Veículos"
                            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-slate-200 placeholder:text-slate-600 text-sm outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Ramo de Atuação</label>
                          <select 
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-slate-200 text-sm outline-none transition-all cursor-pointer"
                          >
                            <option value="veiculos">🚗 Revenda de Veículos</option>
                            <option value="contabilidade">📊 Escritório de Contabilidade</option>
                            <option value="servicos">💼 Serviços em Geral / Outros</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          disabled={!formData.companyName.trim()}
                          onClick={handleNextStep}
                          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Próximo Passo</span>
                          <ArrowRight className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Telefone/WhatsApp */}
                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Qual seu WhatsApp corporativo?</span>
                          </label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Ex: (41) 99999-9999"
                            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-slate-200 placeholder:text-slate-600 text-sm outline-none transition-all"
                          />
                        </div>

                        <button
                          type="button"
                          disabled={!formData.phone.trim()}
                          onClick={handleNextStep}
                          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Próxima Etapa</span>
                          <ArrowRight className="w-4.5 h-4.5" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="w-full py-3 text-slate-400 hover:text-white text-xs font-semibold text-center cursor-pointer"
                        >
                          Voltar
                        </button>
                      </div>
                    )}

                    {/* Step 3: Desafio e Termos */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Qual seu principal gargalo hoje?</label>
                          <select 
                            name="painPoint"
                            value={formData.painPoint}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-slate-200 text-sm outline-none transition-all cursor-pointer"
                          >
                            <option value="delay_atendimento">⏳ Demora para responder novos leads</option>
                            <option value="perda_leads">📉 Perda de contatos fora de hora (noite/fim de semana)</option>
                            <option value="falta_sdr">🤷‍♂️ Sem equipe comercial para qualificação</option>
                            <option value="escalar">🚀 Quero escalar e automatizar as vendas</option>
                          </select>
                        </div>

                        <div className="flex items-start gap-2.5 px-1 pt-1">
                          <input
                            type="checkbox"
                            name="agreedTerms"
                            id="agreedTerms"
                            checked={formData.agreedTerms}
                            onChange={handleInputChange}
                            className="mt-0.5 accent-emerald-500"
                          />
                          <label htmlFor="agreedTerms" className="text-[10px] text-slate-400 select-none cursor-pointer leading-normal">
                            Autorizo o processamento dos dados. ⚠️ Atenção: Devido ao setup detalhado, atendemos apenas 1 empresa por nicho e região comercial comercial para evitar concorrência de tráfego.
                          </label>
                        </div>

                        
                        {isSubmitting ? (
                          <div className="py-4 flex flex-col items-center text-center space-y-3.5">
                            <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                            <p className="text-[10px] text-emerald-400 font-bold animate-pulse uppercase tracking-wider">
                              Analisando potencial de escala para {formData.companyName}...
                            </p>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            disabled={!formData.agreedTerms}
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Liberar Meu Acesso Piloto</span>
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="w-full py-3 text-slate-400 hover:text-white text-xs font-semibold text-center cursor-pointer"
                        >
                          Voltar
                        </button>
                      </div>
                    )}
                  </>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
