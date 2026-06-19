import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Trash2, 
  Calendar, 
  User, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ClipboardList,
  Filter,
  CheckSquare
} from 'lucide-react';

export default function Tasks({ clientInfo }) {
  // Lista inicial de tarefas realistas para a Auto Vantage
  const [tasks, setTasks] = useState([
    {
      id: 't1',
      title: 'Ligar para João Pedro e propor test-drive no Jeep Compass',
      client: 'João Pedro Silveira',
      dueDate: 'Hoje',
      priority: 'alta', // alta, media, baixa
      category: 'Ligação', // Ligação, WhatsApp, Visita, Proposta
      status: 'todo' // todo, progress, done
    },
    {
      id: 't2',
      title: 'Enviar taxas do banco Safra e simulação de financiamento do Corolla',
      client: 'Carla Albuquerque',
      dueDate: 'Amanhã',
      priority: 'alta',
      category: 'Proposta',
      status: 'progress'
    },
    {
      id: 't3',
      title: 'Confirmar horário da visita de Roberto para o sábado',
      client: 'Roberto Dantas',
      dueDate: '05 Jun',
      priority: 'media',
      category: 'WhatsApp',
      status: 'todo'
    },
    {
      id: 't4',
      title: 'Montar proposta com desconto no Civic Touring à vista',
      client: 'Guilherme Mendes',
      dueDate: 'Concluído',
      priority: 'alta',
      category: 'Proposta',
      status: 'done'
    },
    {
      id: 't5',
      title: 'Fazer cadastro do veículo de troca na base do estoque',
      client: 'João Pedro Silveira',
      dueDate: 'Concluído',
      priority: 'baixa',
      category: 'Outros',
      status: 'done'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newPriority, setNewPriority] = useState('media');
  const [newCategory, setNewCategory] = useState('WhatsApp');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: 't_' + Date.now(),
      title: newTitle,
      client: newClient || 'Lead Geral',
      dueDate: 'Hoje',
      priority: newPriority,
      category: newCategory,
      status: 'todo'
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewClient('');
    setNewPriority('media');
    setNewCategory('WhatsApp');
    setShowAddForm(false);
  };

  const handleToggleStatus = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        let nextStatus = 'todo';
        if (t.status === 'todo') nextStatus = 'progress';
        else if (t.status === 'progress') nextStatus = 'done';
        return { 
          ...t, 
          status: nextStatus,
          dueDate: nextStatus === 'done' ? 'Concluído' : 'Hoje'
        };
      }
      return t;
    }));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Cálculo de progresso
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filtragem
  const filteredTasks = tasks.filter(t => {
    if (filterStatus === 'all') return true;
    return t.status === filterStatus;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#07080e] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Gestor de Tarefas</h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Organize e gerencie as atividades diárias do seu time de SDR e fechamento comercial.
          </p>
        </div>

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/10 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Nova Tarefa
        </button>
      </div>

      {/* Progress Card & Fast Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Tracker Widget */}
        <div className="lg:col-span-2 glass p-5 rounded-2xl border border-slate-800/80 flex items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
          
          {/* Circular progress container */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            {/* SVG Ring background and progress indicator */}
            <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
              <path
                className="text-slate-900"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-500 transition-all duration-500"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-sm font-extrabold text-white">{completionPercentage}%</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Meta de Atividades Comercial
            </h4>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Você concluiu <span className="font-extrabold text-indigo-400">{completedTasks}</span> de <span className="font-extrabold text-slate-200">{totalTasks}</span> tarefas ativas para hoje. Mantenha o ritmo!
            </p>
          </div>
        </div>

        {/* Status Filters Widget */}
        <div className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">Filtrar por Status</span>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setFilterStatus('all')}
              className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                filterStatus === 'all' 
                  ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-sm'
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos ({totalTasks})
            </button>
            <button 
              onClick={() => setFilterStatus('todo')}
              className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                filterStatus === 'todo' 
                  ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-sm'
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              A Fazer ({tasks.filter(t => t.status === 'todo').length})
            </button>
            <button 
              onClick={() => setFilterStatus('progress')}
              className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                filterStatus === 'progress' 
                  ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-sm'
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Em Progresso ({tasks.filter(t => t.status === 'progress').length})
            </button>
            <button 
              onClick={() => setFilterStatus('done')}
              className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                filterStatus === 'done' 
                  ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-sm'
                  : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Concluídas ({completedTasks})
            </button>
          </div>
        </div>
      </div>

      {/* Add Task Form Block */}
      {showAddForm && (
        <form onSubmit={handleAddTask} className="glass p-5 rounded-2xl border border-indigo-500/20 grid grid-cols-1 md:grid-cols-4 gap-4 items-end animate-fadeIn">
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">O que precisa ser feito?</label>
            <input 
              type="text" 
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ex: Mandar contrato assinado para Marcos"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 text-xs outline-none"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Cliente / Lead</label>
            <input 
              type="text" 
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              placeholder="Ex: Anderson Santos"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 text-xs outline-none"
            />
          </div>

          <div className="flex gap-2 w-full">
            <div className="space-y-1 flex-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Categoria</label>
              <select 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-2 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 text-xs outline-none"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Ligação">Ligação</option>
                <option value="Proposta">Proposta</option>
                <option value="Visita">Visita</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            
            <div className="space-y-1 w-20 shrink-0">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Prioridade</label>
              <select 
                value={newPriority} 
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full px-2 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 text-xs outline-none"
              >
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-end gap-2.5 mt-2">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-500/10 cursor-pointer"
            >
              Adicionar Tarefa
            </button>
          </div>
        </form>
      )}

      {/* Tasks Table List */}
      <div className="glass p-5 rounded-2xl border border-slate-800/80">
        
        <div className="flex justify-between items-center mb-5 border-b border-slate-850 pb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-indigo-400" />
            Minhas Tarefas
          </h3>
          
          <span className="text-[10px] font-extrabold bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-md text-slate-400">
            {filteredTasks.length} Atividades
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-slate-700 mb-2.5 animate-bounce" />
            <p className="text-xs font-bold text-slate-400">Nenhuma tarefa encontrada</p>
            <p className="text-[10px] text-slate-600 mt-0.5">Tudo limpo para este filtro!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                className={`p-3.5 bg-slate-900/40 hover:bg-slate-900/80 border rounded-xl flex items-center justify-between gap-4 transition-all duration-200 ${
                  task.status === 'done' 
                    ? 'border-slate-850/60 opacity-60' 
                    : 'border-slate-800/70 hover:border-indigo-500/20'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Status Toggle Checker Button */}
                  <button 
                    onClick={() => handleToggleStatus(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
                      task.status === 'done'
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : task.status === 'progress'
                          ? 'bg-amber-600/10 border-amber-500/40 text-amber-400'
                          : 'bg-slate-950 border-slate-800 hover:border-indigo-500 text-transparent hover:text-indigo-400'
                    }`}
                  >
                    {task.status === 'done' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : task.status === 'progress' ? (
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    ) : null}
                  </button>

                  <div className="min-w-0">
                    <p className={`text-xs font-semibold leading-relaxed truncate ${
                      task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'
                    }`}>
                      {task.title}
                    </p>
                    
                    <div className="flex items-center flex-wrap gap-2.5 mt-1.5">
                      {/* Client */}
                      <span className="text-[9px] text-slate-400 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        {task.client}
                      </span>
                      
                      <span className="text-slate-700 text-[10px]">|</span>

                      {/* Category Badge */}
                      <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/5 px-2 py-0.25 rounded border border-indigo-500/10">
                        {task.category}
                      </span>

                      {/* Priority Badge */}
                      <span className={`text-[9px] font-bold px-2 py-0.25 rounded border ${
                        task.priority === 'alta' 
                          ? 'bg-rose-500/5 text-rose-400 border-rose-500/15'
                          : task.priority === 'media'
                            ? 'bg-amber-500/5 text-amber-400 border-amber-500/15'
                            : 'bg-slate-950 text-slate-500 border-slate-850'
                      }`}>
                        {task.priority === 'alta' ? 'Alta Prioridade' : task.priority === 'media' ? 'Média' : 'Baixa'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Due Date & Actions */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Prazo</p>
                    <p className={`text-[10px] font-semibold flex items-center gap-1 justify-end ${
                      task.status === 'done' 
                        ? 'text-emerald-400' 
                        : task.priority === 'alta' 
                          ? 'text-rose-400' 
                          : 'text-slate-400'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {task.dueDate}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 bg-slate-950 hover:bg-rose-500/10 border border-slate-850 hover:border-rose-500/20 text-slate-500 hover:text-rose-400 rounded-lg transition-all cursor-pointer"
                    title="Excluir tarefa"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
