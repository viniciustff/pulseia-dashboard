import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Phone, 
  ToggleLeft, 
  ToggleRight, 
  AlertCircle, 
  MessageSquareOff, 
  Check, 
  CheckCheck,
  RefreshCw,
  Zap,
  Sparkles
} from 'lucide-react';

export default function Chats({ clientInfo }) {
  // Configuração da instância real do cliente logado
  const isDiego = clientInfo?.name?.includes('Diego');
  const instanceName = isDiego ? 'autovantage-diego' : 'autovantage-adriano';
  const chatwootInboxId = isDiego ? '112650' : '112649';

  // Estado do Bot (Ativo vs Intervenção Humana)
  const [botActive, setBotActive] = useState(true);

  // Lista de conversas mockadas da Auto Vantage
  const [conversations, setConversations] = useState([
    {
      id: 'c1',
      name: 'João Pedro Silveira',
      phone: '+55 41 99882-3112',
      lastMessage: 'Quero dar meu Civic 2017 na troca. Aceitam?',
      time: '11:42',
      unread: true,
      car: 'Jeep Compass Longitude 2022',
      status: 'Interessado',
      messages: [
        { sender: 'user', text: 'Olá, vi o Jeep Compass anunciado no Webmotors', time: '11:35' },
        { sender: 'bot', text: 'Olá! Sou o assistente virtual da Auto Vantage. Sim, o Compass 2022 está disponível em nosso estoque físico! Ele está com apenas 22.000km, único dono e laudo cautelar 100% aprovado.', time: '11:36' },
        { sender: 'bot', text: 'Você gostaria de simular um financiamento ou possui algum veículo para dar na troca?', time: '11:37' },
        { sender: 'user', text: 'Quero dar meu Civic 2017 na troca. Aceitam?', time: '11:42' },
      ]
    },
    {
      id: 'c2',
      name: 'Carla Albuquerque',
      phone: '+55 41 98765-4321',
      lastMessage: 'Entendido. Sábado de manhã dou um pulo aí.',
      time: '10:15',
      unread: false,
      car: 'Toyota Corolla XEi 2021',
      status: 'Triagem',
      messages: [
        { sender: 'user', text: 'Bom dia, gostaria de saber o valor do Corolla 2021', time: '10:01' },
        { sender: 'bot', text: 'Bom dia Carla! O Corolla XEi 2021 está saindo por R$ 114.900. Ele está impecável, revisado na concessionária.', time: '10:03' },
        { sender: 'user', text: 'Vocês abrem aos sábados?', time: '10:12' },
        { sender: 'bot', text: 'Sim! Abrimos de segunda a sexta até as 18:30 e aos sábados das 9:00 às 13:00. Quer que eu agende um horário para você vir ver o carro?', time: '10:14' },
        { sender: 'user', text: 'Entendido. Sábado de manhã dou um pulo aí.', time: '10:15' },
      ]
    },
    {
      id: 'c3',
      name: 'Guilherme Mendes',
      phone: '+55 41 99122-3344',
      lastMessage: 'Ok, vou falar com ela e te aviso.',
      time: 'Ontem',
      unread: false,
      car: 'Honda Civic Touring 2020',
      status: 'Proposta',
      messages: [
        { sender: 'user', text: 'Qual o menor valor à vista no Civic Touring?', time: 'Ontem 15:20' },
        { sender: 'bot', text: 'Consigo fazer R$ 126.900 à vista para fecharmos essa semana. É a versão Touring com teto solar e motor turbo!', time: 'Ontem 15:22' },
        { sender: 'user', text: 'Ok, vou falar com ela e te aviso.', time: 'Ontem 15:30' },
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState('c1');
  const [typedMessage, setTypedMessage] = useState('');

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    // Adicionar mensagem do Humano (já que é o painel de atendimento)
    const newMessage = {
      sender: 'human', // Indica que o atendente mandou
      text: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Atualiza mensagens no chat ativo
    setConversations(prev => prev.map(chat => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          lastMessage: typedMessage,
          time: 'Agora',
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));

    setTypedMessage('');

    // Se o bot estiver ativo e mandamos uma mensagem manual, simular um aviso de que o bot deveria ser pausado
    if (botActive) {
      setTimeout(() => {
        // Simular um auto-save sutil de log ou resposta de lembrete
      }, 500);
    }
  };

  const handleToggleBot = () => {
    setBotActive(!botActive);
  };

  return (
    <div className="flex-1 flex bg-[#07080e] overflow-hidden h-[calc(100vh)]">
      
      {/* Sidebar: Chats List */}
      <div className="w-80 border-r border-slate-850 flex flex-col justify-between shrink-0 bg-[#0c0d15]/80">
        
        {/* Search & Stats Header */}
        <div className="p-4 border-b border-slate-850">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Conversas Recentes</h3>
            <span className="text-[10px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
              Evolution API
            </span>
          </div>
          <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Instância ativa:</span>
              <span className="font-semibold text-slate-200 select-all">{instanceName}</span>
            </div>
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map(chat => {
            const isActive = chat.id === activeChat.id;
            return (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 relative cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-600/15 border border-indigo-500/20 shadow-md shadow-indigo-500/5' 
                    : 'hover:bg-slate-900/40 border border-transparent'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold shrink-0">
                  {chat.name.substring(0, 2).toUpperCase()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-xs font-bold text-slate-200 truncate">{chat.name}</h4>
                    <span className="text-[9px] text-slate-500">{chat.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mb-1">
                    {chat.lastMessage}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-1.5 py-0.5 rounded">
                      {chat.car}
                    </span>
                  </div>
                </div>

                {chat.unread && (
                  <span className="absolute right-3 bottom-3 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bot Pauser Control Panel (Crucial Integration Feature) */}
        <div className="p-4 border-t border-slate-850 bg-slate-950/40">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <Bot className={`w-4.5 h-4.5 ${botActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <div className="leading-none">
                <p className="text-xs font-bold text-slate-200">Robô SDR (IA)</p>
                <p className="text-[9px] text-slate-500 mt-0.5">Evolution API v2</p>
              </div>
            </div>
            
            <button 
              onClick={handleToggleBot}
              className="cursor-pointer text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {botActive ? (
                <ToggleRight className="w-10 h-10 text-indigo-500" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-slate-600" />
              )}
            </button>
          </div>

          {/* Integration Note */}
          <div className={`p-2.5 rounded-lg border text-[10px] leading-relaxed transition-all ${
            botActive 
              ? 'bg-indigo-500/5 border-indigo-500/10 text-slate-400' 
              : 'bg-amber-500/5 border-amber-500/10 text-amber-300'
          }`}>
            {botActive ? (
              <span className="flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>O robô está respondendo novos leads automaticamente usando a inteligência artificial.</span>
              </span>
            ) : (
              <span className="flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                <span>
                  <strong>Robô Pausado!</strong> Fila transferida para o Chatwoot (Caixa de Entrada #{chatwootInboxId}). O atendente humano deve assumir.
                </span>
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Main Chat Detail Window */}
      <div className="flex-1 flex flex-col justify-between bg-[#08090f]">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-850 bg-[#0e1017]/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-extrabold">
              {activeChat.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">{activeChat.name}</h3>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-slate-600" />
                {activeChat.phone}
                <span className="text-slate-700">|</span>
                Interesse: <span className="text-indigo-400 font-medium">{activeChat.car}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              botActive 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {botActive ? 'IA Ativa' : 'Manual (Chatwoot)'}
            </span>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-slate-900 border border-slate-850 rounded-full text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
              Chat Iniciado - Transcrição Automática
            </span>
          </div>

          {activeChat.messages.map((msg, index) => {
            const isBot = msg.sender === 'bot';
            const isUser = msg.sender === 'user';
            
            return (
              <div 
                key={index} 
                className={`flex ${isUser ? 'justify-start' : 'justify-end'} items-end gap-2.5`}
              >
                {/* Avatar for User */}
                {isUser && (
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                    U
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isUser 
                    ? 'bg-slate-900 text-slate-200 rounded-bl-none border border-slate-850' 
                    : isBot 
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/5'
                      : 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-600/5'
                }`}>
                  {/* Sender Badge */}
                  <div className="flex items-center justify-between gap-4 mb-1 border-b border-white/10 pb-1">
                    <span className="text-[8px] uppercase font-bold tracking-wider opacity-85">
                      {isUser ? 'Cliente' : isBot ? 'Robô de IA' : 'Você (Humano)'}
                    </span>
                    <span className="text-[8px] opacity-60 font-medium">{msg.time}</span>
                  </div>

                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Avatar for Bot / Human */}
                {!isUser && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 shadow-lg ${
                    isBot ? 'bg-indigo-600' : 'bg-purple-600'
                  }`}>
                    {isBot ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input box */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-850 bg-[#0e1017]/40 flex gap-3 items-center">
          <input 
            type="text" 
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            placeholder={botActive ? "Desative o robô ou digite para enviar como operador..." : "Digite uma mensagem para o cliente..."}
            className="flex-1 bg-slate-950 border border-slate-850 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-650 text-xs outline-none transition-all"
          />
          <button 
            type="submit"
            className="p-3 bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/10 text-white rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/5 flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
