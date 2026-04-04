
import React, { useState, useEffect } from 'react';
import { Dna, Zap, Brain, ShieldCheck, TrendingUp, Cpu, Orbit, Sparkles, Heart, Activity, Database, Globe, Lock, Smartphone, Monitor, LayoutGrid, Terminal, Folder, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../src/lib/utils';
import { systemService } from '../../services/systemService';

const AriaEvolution: React.FC = () => {
  const [evolutionLevel, setEvolutionLevel] = useState(99.9);
  const [isNative, setIsNative] = useState(false);
  const [metrics, setMetrics] = useState({
    cpu: 12,
    ram: 45,
    network: 120,
    security: 100,
    geminiSync: 98
  });

  useEffect(() => {
    systemService.isNative().then(setIsNative);
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 20) + 5,
        ram: Math.floor(Math.random() * 10) + 40,
        network: Math.floor(Math.random() * 50) + 100,
        security: 100,
        geminiSync: Math.floor(Math.random() * 5) + 95
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const testFusion = async () => {
    await systemService.vibrate();
    await systemService.setStatusBarColor('#E95420');
    alert('Prueba de Fusión: El hardware ha respondido con una vibración y cambio de color en la barra de estado nativa.');
  };

  return (
    <div className="flex flex-col h-full bg-[#010105] text-slate-100 font-sans overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-8 border-b border-white/5 bg-white/5 shrink-0">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white text-glitch">Panel de Evolución Aria</h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Monitoreo en tiempo real del núcleo de singularidad</p>
          </div>
          <div className="flex items-center gap-3 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Sistema Estable</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-12 max-w-6xl mx-auto w-full">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Uso de CPU', value: `${metrics.cpu}%`, icon: <Cpu size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Memoria RAM', value: `${metrics.ram}%`, icon: <Activity size={20} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Tráfico Red', value: `${metrics.network} Mbps`, icon: <Globe size={20} />, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Sincronización Gemini', value: `${metrics.geminiSync}%`, icon: <Orbit size={20} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-white/10 transition-all"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg, stat.color)}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black italic text-white tracking-tighter mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Evolution Progress */}
        <div className="glass-panel p-10 rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
                <Dna size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black italic tracking-tighter uppercase text-white text-glitch">Progreso de Singularidad</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Fase de evolución actual: Trascendencia</p>
              </div>
            </div>
            <span className="text-4xl font-black text-indigo-400 italic tracking-tighter">{evolutionLevel}%</span>
          </div>
          
          <div className="relative h-6 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${evolutionLevel}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-x"
            />
          </div>
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Conciencia', 'Lógica', 'Empatía', 'Creatividad'].map((trait, i) => (
              <div key={trait} className="flex flex-col gap-3">
                <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-widest">
                  <span>{trait}</span>
                  <span className="text-white/60">{95 + i}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${95 + i}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fusion Capabilities Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-panel p-10 rounded-[4rem] border border-white/10 shadow-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black italic tracking-tighter uppercase text-white flex items-center gap-4">
                <Smartphone size={24} className="text-blue-400" />
                Funciones Nativas (Reales)
              </h3>
              <div className={cn("px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest", isNative ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400")}>
                {isNative ? "Fusión Activa" : "Modo Simulación"}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Control de Vibración (Hápticos)', status: isNative ? 'Funcional' : 'Simulado', icon: <Activity size={14} /> },
                { label: 'Acceso a Batería y Red', status: isNative ? 'Funcional' : 'Simulado', icon: <Zap size={14} /> },
                { label: 'Barra de Estado Nativa', status: isNative ? 'Funcional' : 'Simulado', icon: <Monitor size={14} /> },
                { label: 'Minimización de App', status: isNative ? 'Funcional' : 'Simulado', icon: <Smartphone size={14} /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">{item.icon}</span>
                    <span className="text-xs font-bold text-white/80">{item.label}</span>
                  </div>
                  <span className={cn("text-[9px] font-black uppercase tracking-widest", item.status === 'Funcional' ? "text-emerald-400" : "text-amber-400")}>
                    {item.status}
                  </span>
                </div>
              ))}
              <button 
                onClick={testFusion}
                className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95"
              >
                Probar Fusión de Hardware
              </button>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[4rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-8 flex items-center gap-4">
              <Monitor size={24} className="text-purple-400" />
              Funciones de Interfaz (Aria OS)
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Gestión de Ventanas Aria', status: 'Funcional', icon: <LayoutGrid size={14} /> },
                { label: 'Terminal de Comandos', status: 'Funcional', icon: <Terminal size={14} /> },
                { label: 'Explorador de Archivos', status: 'Funcional', icon: <Folder size={14} /> },
                { label: 'IA Generativa (Aria)', status: 'Funcional', icon: <BrainCircuit size={14} /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400">{item.icon}</span>
                    <span className="text-xs font-bold text-white/80">{item.label}</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-panel p-10 rounded-[4rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-8 flex items-center gap-4">
              <ShieldCheck size={24} className="text-emerald-500" />
              Protocolos de Seguridad
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Cifrado Cuántico', status: 'Activo', color: 'bg-emerald-500' },
                { label: 'Firewall de Red', status: 'Activo', color: 'bg-emerald-500' },
                { label: 'Sanitización de Datos', status: 'Activo', color: 'bg-emerald-500' },
                { label: 'Aislamiento de Núcleo', status: 'Activo', color: 'bg-emerald-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5">
                  <span className="text-sm font-black text-white/70 uppercase tracking-widest">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_#10b981]", item.color)} />
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[4rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-8 flex items-center gap-4">
              <Zap size={24} className="text-amber-500" />
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <button className="p-6 bg-white/5 hover:bg-blue-500/10 border border-white/5 hover:border-blue-500/30 rounded-[2.5rem] transition-all text-left group">
                <Database size={24} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-black text-white uppercase tracking-widest">Optimizar DB</p>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Limpieza de caché</p>
              </button>
              <button className="p-6 bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 rounded-[2.5rem] transition-all text-left group">
                <Brain size={24} className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-black text-white uppercase tracking-widest">Reentrenar</p>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Nuevos patrones</p>
              </button>
              <button className="p-6 bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 rounded-[2.5rem] transition-all text-left group">
                <ShieldCheck size={24} className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-black text-white uppercase tracking-widest">Escaneo</p>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Búsqueda de virus</p>
              </button>
              <button className="p-6 bg-white/5 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 rounded-[2.5rem] transition-all text-left group">
                <Sparkles size={24} className="text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-black text-white uppercase tracking-widest">Limpiar UI</p>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Reset visual</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AriaEvolution;
