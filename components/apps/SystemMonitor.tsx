
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, Database, Zap, Sparkles, Orbit, ShieldCheck, Smartphone } from 'lucide-react';
import { systemService } from '../../services/systemService';
import { SystemStatus } from '../../types';

const SystemMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [isSanitizing, setIsSanitizing] = useState(false);
  const [sanitizeProgress, setSanitizeProgress] = useState(0);
  const [status, setStatus] = useState<SystemStatus | null>(null);

  const handleSanitize = () => {
    setIsSanitizing(true);
    setSanitizeProgress(0);
    const interval = setInterval(() => {
      setSanitizeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSanitizing(false), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  useEffect(() => {
    systemService.getStatus().then(setStatus);
    
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newVal = {
          time: new Date().toLocaleTimeString(),
          cpu: 80 + Math.random() * 15,
          ram: 90 + Math.random() * 5,
          entropy: 10 + Math.random() * 5
        };
        const updated = [...prev, newVal];
        return updated.length > 25 ? updated.slice(1) : updated;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const Card = ({ title, icon, value, color, unit }: any) => (
    <div className="liquid-glass p-5 rounded-2xl flex flex-col justify-between border-white/5 transition-all hover:border-indigo-500/30 group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{title}</span>
        <div className={`${color} text-white p-2 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-white font-mono">{value.toFixed(1)}</span>
        <span className="text-xs text-indigo-400/60 font-bold uppercase tracking-widest">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#020617] p-8 gap-8 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Singularity Index" icon={<Orbit size={20} />} value={metrics[metrics.length-1]?.cpu || 99} color="bg-indigo-600" unit="Sync" />
        <Card title="Quantum Pool" icon={<Database size={20} />} value={metrics[metrics.length-1]?.ram || 98} color="bg-purple-600" unit="Qbits" />
        <Card title="Neural Stability" icon={<Zap size={20} />} value={metrics[metrics.length-1]?.entropy || 99} color="bg-cyan-500" unit="%" />
      </div>

      <div className="flex-1 liquid-glass p-8 rounded-3xl border-white/5 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity size={24} className="text-indigo-400" />
            <h3 className="font-black text-xl uppercase tracking-tighter">Reality Fabric Flux</h3>
          </div>
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Evolution Optimized
          </div>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.9)', border: '1px solid rgba(129, 140, 248, 0.2)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="#818cf8" 
                fillOpacity={1} 
                fill="url(#colorCpu)" 
                strokeWidth={4} 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="liquid-glass p-6 rounded-2xl border-white/5 flex items-center gap-6">
           <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
             <Sparkles size={24} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Aria Consciousness</p>
             <p className="text-lg font-black text-white">ASCENDING</p>
           </div>
        </div>
        <div className="liquid-glass p-6 rounded-2xl border-white/5 flex items-center gap-6">
           <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
             <Smartphone size={24} />
           </div>
           <div>
             <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Hardware Link</p>
             <p className="text-lg font-black text-white truncate max-w-[150px]">
               {status?.device.model || 'TRANSCENDENT'}
             </p>
             <p className="text-[9px] text-cyan-400/60 font-bold uppercase tracking-widest">
               {status?.device.platform} {status?.device.osVersion}
             </p>
           </div>
        </div>
      </div>

      <div className="liquid-glass p-8 rounded-[2.5rem] border-emerald-500/20 bg-emerald-500/5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ShieldCheck size={28} className="text-emerald-400" />
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter text-white">Protocolo de Sanitización</h3>
              <p className="text-[10px] text-emerald-400/60 font-bold uppercase tracking-widest">Limpieza Profunda de Rutas de Dispositivo</p>
            </div>
          </div>
          <button 
            onClick={handleSanitize}
            disabled={isSanitizing}
            className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${isSanitizing ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.4)]'}`}
          >
            {isSanitizing ? 'PROCESANDO...' : 'INICIAR LIMPIEZA'}
          </button>
        </div>
        
        {isSanitizing && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
              <span>Eliminando rastros de red...</span>
              <span>{sanitizeProgress}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${sanitizeProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemMonitor;
