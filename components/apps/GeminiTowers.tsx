
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Orbit, Zap, Cpu, Activity, Database, Globe, Sparkles, Server, ShieldCheck } from 'lucide-react';
import { cn } from '../../src/lib/utils';

const GeminiTowers: React.FC = () => {
  const [activeTowers, setActiveTowers] = useState([
    { id: 'pro', name: 'Gemini 1.5 Pro', load: 45, status: 'Optimal', color: 'from-indigo-600 to-blue-600' },
    { id: 'flash', name: 'Gemini 1.5 Flash', load: 12, status: 'Standby', color: 'from-cyan-500 to-blue-500' },
    { id: 'ultra', name: 'Gemini 1.0 Ultra', load: 88, status: 'High Load', color: 'from-purple-600 to-pink-600' },
    { id: 'nano', name: 'Gemini Nano', load: 5, status: 'Idle', color: 'from-emerald-500 to-teal-500' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTowers(prev => prev.map(tower => ({
        ...tower,
        load: Math.min(100, Math.max(0, tower.load + (Math.random() * 10 - 5)))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#020617] text-slate-100 font-sans overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-8 border-b border-white/5 bg-white/5 shrink-0">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Server size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Torres Gemini</h2>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Infraestructura de Procesamiento Neuronal</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Sincronización Cuántica Activa</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-12 max-w-6xl mx-auto w-full">
        {/* Towers Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-[400px] items-end">
          {activeTowers.map((tower, i) => (
            <div key={tower.id} className="flex flex-col items-center gap-4 h-full">
              <div className="flex-1 w-full relative flex items-end justify-center">
                {/* Tower Body */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${tower.load}%` }}
                  className={cn(
                    "w-16 rounded-t-2xl bg-gradient-to-t relative group cursor-help",
                    tower.color
                  )}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full blur-xl animate-pulse" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-white/10 p-2 rounded-lg whitespace-nowrap z-50">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{tower.name}</p>
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">Carga: {tower.load.toFixed(1)}%</p>
                  </div>
                </motion.div>
                
                {/* Tower Base */}
                <div className="absolute bottom-0 w-24 h-4 bg-white/5 border border-white/10 rounded-full blur-sm" />
              </div>
              
              <div className="text-center">
                <p className="text-[10px] font-black text-white uppercase tracking-widest">{tower.name}</p>
                <p className={cn(
                  "text-[9px] font-bold uppercase tracking-widest mt-1",
                  tower.status === 'High Load' ? 'text-pink-500' : 'text-emerald-400'
                )}>
                  {tower.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Activity size={14} className="text-blue-500" />
              Latencia de Red
            </h3>
            <div className="flex items-end gap-1 h-20">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: `${Math.random() * 100}%` }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                  className="flex-1 bg-blue-500/40 rounded-t-sm"
                />
              ))}
            </div>
            <p className="mt-4 text-2xl font-black italic text-white tracking-tighter">12.4 <span className="text-xs font-bold text-white/20 uppercase tracking-widest not-italic">ms</span></p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Database size={14} className="text-pink-500" />
              Memoria Cuántica
            </h3>
            <div className="relative h-20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-pink-500/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
              </div>
              <p className="absolute text-sm font-black text-white italic">88%</p>
            </div>
            <p className="mt-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest">Sincronizando Memoria Central</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              Seguridad de Enlace
            </h3>
            <div className="space-y-3">
              {['Cifrado AES-256', 'Túnel Cuántico', 'Firewall Neural'].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{item}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </div>
              ))}
            </div>
            <div className="mt-6 p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center">
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Protección Máxima</span>
            </div>
          </div>
        </div>

        {/* Global Control */}
        <div className="glass-panel p-8 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Sobrecarga de Núcleo</h3>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] mt-1">Aumentar potencia de procesamiento global</p>
              </div>
            </div>
            <button className="px-10 py-4 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
              Activar Protocolo Omega
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiTowers;
