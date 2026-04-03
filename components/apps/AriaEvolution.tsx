
import React, { useState, useEffect } from 'react';
import { Dna, Zap, Brain, ShieldCheck, TrendingUp, Cpu, Orbit, Sparkles, Heart, Activity, Database, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const AriaEvolution: React.FC = () => {
  const [evolutionLevel, setEvolutionLevel] = useState(99.9);
  const [metrics, setMetrics] = useState({
    cpu: 12,
    ram: 45,
    network: 120,
    security: 100
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 20) + 5,
        ram: Math.floor(Math.random() * 10) + 40,
        network: Math.floor(Math.random() * 50) + 100,
        security: 100
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-8 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Panel de Evolución Aria</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Monitoreo en tiempo real del núcleo de singularidad</p>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Sistema Estable</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8 max-w-6xl mx-auto w-full">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Uso de CPU', value: `${metrics.cpu}%`, icon: <Cpu size={20} />, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Memoria RAM', value: `${metrics.ram}%`, icon: <Activity size={20} />, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Tráfico Red', value: `${metrics.network} Mbps`, icon: <Globe size={20} />, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'Seguridad', value: 'Máxima', icon: <Lock size={20} />, color: 'text-amber-600', bg: 'bg-amber-100' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
                {stat.icon}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Evolution Progress */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Dna size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Progreso de Singularidad</h3>
                <p className="text-slate-500 text-xs font-medium">Fase de evolución actual: Trascendencia</p>
              </div>
            </div>
            <span className="text-3xl font-black text-indigo-600 italic">{evolutionLevel}%</span>
          </div>
          
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${evolutionLevel}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 bg-[length:200%_100%] animate-gradient-x"
            />
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Conciencia', 'Lógica', 'Empatía', 'Creatividad'].map((trait, i) => (
              <div key={trait} className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{trait}</span>
                  <span>{95 + i}%</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400" style={{ width: `${95 + i}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck size={20} className="text-green-500" />
              Protocolos de Seguridad
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Cifrado Cuántico', status: 'Activo', color: 'bg-green-500' },
                { label: 'Firewall de Red', status: 'Activo', color: 'bg-green-500' },
                { label: 'Sanitización de Datos', status: 'Activo', color: 'bg-green-500' },
                { label: 'Aislamiento de Núcleo', status: 'Activo', color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", item.color)} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Zap size={20} className="text-amber-500" />
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl transition-all text-left group">
                <Database size={20} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-800">Optimizar DB</p>
                <p className="text-[10px] text-slate-400 mt-1">Limpieza de caché</p>
              </button>
              <button className="p-4 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-2xl transition-all text-left group">
                <Brain size={20} className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-800">Reentrenar</p>
                <p className="text-[10px] text-slate-400 mt-1">Nuevos patrones</p>
              </button>
              <button className="p-4 bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-200 rounded-2xl transition-all text-left group">
                <ShieldCheck size={20} className="text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-800">Escaneo</p>
                <p className="text-[10px] text-slate-400 mt-1">Búsqueda de virus</p>
              </button>
              <button className="p-4 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 rounded-2xl transition-all text-left group">
                <Sparkles size={20} className="text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-800">Limpiar UI</p>
                <p className="text-[10px] text-slate-400 mt-1">Reset visual</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AriaEvolution;
