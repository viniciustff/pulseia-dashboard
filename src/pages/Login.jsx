import React, { useState } from 'react';
import { Bot, KeyRound, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLoginSuccess, onBackToWebsite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mapeamento estático de credenciais e bases do Notion dos clientes
  const clientsDatabase = [
    {
      email: 'adriano@autovantage.com.br',
      password: 'autovantage2026',
      name: 'Auto Vantage - Unidade Adriano',
      notionCrmDb: '1537233f-67db-8067-96a8-c5f115598fb8',
      role: 'client',
      color: 'indigo'
    },
    {
      email: 'diego@autovantage.com.br',
      password: 'autovantage2026',
      name: 'Auto Vantage - Unidade Diego',
      notionCrmDb: '1537233f-67db-8067-96a8-c5f115598fb8',
      role: 'client',
      color: 'violet'
    },
    {
      email: 'admin@agenciaia.com',
      password: 'adminagencia2026',
      name: 'Agência de IA (Admin)',
      notionCrmDb: 'todas',
      role: 'admin',
      color: 'emerald'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticação para efeito visual premium
    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      const matchedClient = clientsDatabase.find(
        (c) => c.email === trimmedEmail && c.password === password
      );

      if (matchedClient) {
        onLoginSuccess(matchedClient);
      } else {
        // Fallback flexível: Se for um teste genérico (qualquer login), concede acesso como Cliente Demo
        // Mas se preencheu algo incorretamente avisando, damos a dica das senhas para facilitar o teste do usuário!
        if (trimmedEmail.includes('@') && password.length >= 6) {
          const demoClient = {
            email: trimmedEmail,
            name: 'Cliente Demo (Auto Vantage)',
            notionCrmDb: 'demo-database-id',
            role: 'client',
            color: 'blue'
          };
          onLoginSuccess(demoClient);
        } else {
          setError('Credenciais inválidas. Tente adriano@autovantage.com.br com a senha autovantage2026.');
          setIsLoading(false);
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#07080e] relative overflow-hidden px-4">
      {/* Background Neon Blobs for Deep Modern Visuals */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Login Card */}
      <div className="w-full max-w-md glass rounded-3xl shadow-2xl p-8 relative z-10 border border-slate-800/80">
        
        {/* Botão de Voltar ao Site */}
        {onBackToWebsite && (
          <button 
            type="button" 
            onClick={onBackToWebsite}
            className="absolute top-6 left-6 text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-wider cursor-pointer transition-colors"
          >
            ← Voltar ao site
          </button>
        )}

        {/* Logo/Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-4 border border-indigo-400/20">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Portal do Cliente</h2>
          <p className="text-slate-400 text-xs mt-1 max-w-[280px]">
            Acesse seu Painel de CRM, Métricas e Automação de WhatsApp
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-300 font-medium leading-relaxed">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 ml-1">E-mail de Acesso</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@autovantage.com.br"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-slate-200 placeholder:text-slate-600 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-slate-300">Senha</label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(password_value) => setPassword(password_value.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-slate-200 placeholder:text-slate-600 text-sm outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>

        {/* Demo Credentials Tip Banner */}
        <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2.5">
            Dica para demonstração rápida
          </p>
          <div className="inline-grid grid-cols-2 gap-2 text-[10px] bg-indigo-950/20 border border-indigo-500/10 p-3.5 rounded-2xl text-left">
            <div>
              <p className="text-slate-400 font-semibold">Adriano:</p>
              <p className="text-indigo-300 select-all">adriano@autovantage.com.br</p>
              <p className="text-slate-500 mt-0.5">Senha: <span className="text-indigo-400 font-medium select-all">autovantage2026</span></p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Diego:</p>
              <p className="text-indigo-300 select-all">diego@autovantage.com.br</p>
              <p className="text-slate-500 mt-0.5">Senha: <span className="text-indigo-400 font-medium select-all">autovantage2026</span></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
