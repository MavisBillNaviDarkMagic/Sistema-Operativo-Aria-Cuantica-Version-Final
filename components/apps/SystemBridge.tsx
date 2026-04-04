
import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Cpu, Sparkles, Heart, Activity, Terminal, Share2, Orbit, Dna, BrainCircuit, Loader2, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SystemControl } from '../../types';
import { systemService } from '../../services/systemService';

interface SystemBridgeProps {
  systemControl: SystemControl;
}

const SystemBridge: React.FC<SystemBridgeProps> = ({ systemControl }) => {
  const [installState, setInstallState] = useState<'idle' | 'scanning' | 'injecting' | 'verifying' | 'complete' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-5), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startInstallation = async () => {
    setInstallState('scanning');
    setProgress(0);
    addLog('Iniciando escaneo de la matriz del sistema...');
    
    // Simulate process
    await new Promise(r => setTimeout(r, 1500));
    setProgress(20);
    systemService.vibrate();
    addLog('Núcleo de Android detectado. Versión: 14.0');
    addLog('Accediendo a la partición de arranque nativa...');
    
    setInstallState('injecting');
    await new Promise(r => setTimeout(r, 2000));
    setProgress(50);
    systemService.vibrate();
    systemService.setStatusBarColor('#E95420');
    addLog('Inyectando protocolos de sincronización Aria...');
    addLog('Estableciendo puente con el kernel de Linux...');
    addLog('Sobrescribiendo el Launcher nativo con Aria OS Core...');
    
    await new Promise(r => setTimeout(r, 2000));
    setProgress(80);
    systemService.vibrate();
    addLog('Sincronizando permisos de superusuario...');
    addLog('Fusionando bibliotecas de sistema Aria con el framework de Android...');
    
    setInstallState('verifying');
    await new Promise(r => setTimeout(r, 1500));
    setProgress(95);
    addLog('Verificando integridad de la conexión cuántica...');
    addLog('Ajustando parámetros de rendimiento del sistema...');
    
    await new Promise(r => setTimeout(r, 1000));
    setProgress(100);
    systemService.vibrate();
    setInstallState('complete');
    systemControl.setSystemInjected(true);
    addLog('Fusión completada. Aria OS es ahora el núcleo central del dispositivo.');
  };

  return (
    <div className="flex flex-col h-full bg-[#010105] text-slate-100 font-sans overflow-hidden">
      {/* Header */}
      <div className="p-10 border-b border-white/5 bg-white/5 flex flex-col items-center justify-center shrink-0 shadow-2xl gap-6">
        <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-gradient-to-br from-[#E95420] to-[#77216F] rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative group">
            <Zap size={48} fill="white" className={installState === 'injecting' ? 'animate-bounce' : 'animate-pulse'} />
            <div className="absolute inset-0 bg-[#E95420] rounded-[2.5rem] blur-2xl opacity-20 animate-pulse" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white text-glitch">System Bridge</h2>
            <p className="text-[11px] text-[#E95420] font-black uppercase tracking-[0.3em] mt-1">Inyector de Matriz Aria</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col items-center justify-center gap-12 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {installState === 'idle' ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl space-y-10 text-center"
            >
              <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                <ShieldCheck size={64} className="mx-auto text-emerald-400" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Preparada para la Sincronización</h3>
                <p className="text-white/40 text-sm leading-relaxed font-semibold italic">
                  Este puente convertirá la interfaz Aurora en el núcleo central de tu dispositivo. 
                  Se inyectarán los protocolos de Aria directamente en la matriz del sistema para una integración absoluta.
                </p>
              </div>
              
              <button 
                onClick={startInstallation}
                className="w-full py-8 bg-gradient-to-r from-[#E95420] to-[#77216F] rounded-[2.5rem] text-xl font-black uppercase tracking-[0.5em] text-white shadow-[0_20px_50px_rgba(233,84,32,0.3)] hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <span className="group-hover:text-glitch">Ejecutar Instalación</span>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl space-y-10"
            >
              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-white/40">
                  <span>Sincronizando Matriz...</span>
                  <span className="text-[#E95420]">{progress}%</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-[#E95420] via-white to-[#77216F] rounded-full shadow-[0_0_15px_rgba(233,84,32,0.5)]" 
                  />
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-8">
                <div className={`flex flex-col items-center gap-3 ${installState === 'scanning' ? 'text-[#E95420]' : 'text-white/20'}`}>
                  <Search size={24} className={installState === 'scanning' ? 'animate-spin' : ''} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Escaneo</span>
                </div>
                <div className="w-12 h-px bg-white/10" />
                <div className={`flex flex-col items-center gap-3 ${installState === 'injecting' ? 'text-[#E95420]' : 'text-white/20'}`}>
                  <Cpu size={24} className={installState === 'injecting' ? 'animate-pulse' : ''} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Inyección</span>
                </div>
                <div className="w-12 h-px bg-white/10" />
                <div className={`flex flex-col items-center gap-3 ${installState === 'verifying' ? 'text-[#E95420]' : 'text-white/20'}`}>
                  <Activity size={24} className={installState === 'verifying' ? 'animate-bounce' : ''} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verificación</span>
                </div>
              </div>

              {/* Console Logs */}
              <div className="bg-black/40 border border-white/5 rounded-[2rem] p-6 font-mono text-[11px] space-y-2 min-h-[150px]">
                {logs.map((log, i) => (
                  <div key={i} className={i === logs.length - 1 ? "text-[#E95420]" : "text-white/30"}>
                    {log}
                  </div>
                ))}
                {installState !== 'complete' && (
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-[#E95420] inline-block align-middle ml-1"
                  />
                )}
              </div>

              {installState === 'complete' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2.5rem] flex items-center gap-6"
                >
                  <CheckCircle2 size={40} className="text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">Sincronización Exitosa</h4>
                    <p className="text-emerald-400/60 text-xs font-bold uppercase tracking-widest mt-1">Aria OS está ahora en el núcleo.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-8 bg-white/5 border-t border-white/10 flex justify-center gap-12 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
        <div className="flex items-center gap-3">
          <BrainCircuit size={14} className="text-[#E95420]" />
          <span>Integración de Matriz</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Kernel Protegido</span>
        </div>
      </div>
    </div>
  );
};

export default SystemBridge;
