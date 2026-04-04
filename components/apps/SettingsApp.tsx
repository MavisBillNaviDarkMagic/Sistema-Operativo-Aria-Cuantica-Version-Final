
import React, { useState } from 'react';
import { Palette, Monitor, Cpu, Shield, User as UserIcon, Bell, Info, Wifi, Volume2, Bluetooth, Globe, Lock, Search, BrainCircuit, Smartphone, Zap } from 'lucide-react';
import { SystemConfig } from '../../types';

interface SettingsAppProps {
  config: SystemConfig;
  setConfig: (config: SystemConfig) => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ config, setConfig }) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const categories = [
    { id: 'network', name: 'Red', icon: <Wifi size={16} /> },
    { id: 'bluetooth', name: 'Bluetooth', icon: <Bluetooth size={16} /> },
    { id: 'appearance', name: 'Apariencia', icon: <Palette size={16} /> },
    { id: 'fusion', name: 'Fusión de Sistema', icon: <Zap size={16} /> },
    { id: 'display', name: 'Pantalla', icon: <Monitor size={16} /> },
    { id: 'sound', name: 'Sonido', icon: <Volume2 size={16} /> },
    { id: 'privacy', name: 'Privacidad', icon: <Shield size={16} /> },
    { id: 'users', name: 'Usuarios', icon: <UserIcon size={16} /> },
    { id: 'about', name: 'Acerca de', icon: <Info size={16} /> }
  ];

  return (
    <div className="flex h-full bg-[#2d2d2d] text-[#f7f7f7]">
      {/* Sidebar */}
      <div className="w-64 bg-[#353535] border-r border-black/20 flex flex-col">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
            <input 
              type="text" 
              placeholder="Buscar"
              className="w-full bg-[#2d2d2d] border border-black/20 rounded-md py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-[#E95420]"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => setActiveTab(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs transition-all text-left ${activeTab === cat.id ? 'bg-[#E95420] text-white font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className={activeTab === cat.id ? 'text-white' : 'text-white/40'}>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-12">
        <div className="max-w-2xl mx-auto">
          {activeTab === 'appearance' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-8">Apariencia</h2>
              
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-white/90">Estilo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setConfig({ ...config, theme: 'dark' })}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 ${config.theme === 'dark' ? 'border-[#E95420] bg-white/5' : 'border-white/5 hover:border-white/10'}`}
                  >
                    <div className="aspect-video bg-[#1d1d1d] rounded-lg border border-white/10" />
                    <span className="text-xs font-bold">Oscuro</span>
                  </button>
                  <button 
                    onClick={() => setConfig({ ...config, theme: 'light' })}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 ${config.theme === 'light' ? 'border-[#E95420] bg-white/5' : 'border-white/5 hover:border-white/10'}`}
                  >
                    <div className="aspect-video bg-[#f7f7f7] rounded-lg border border-black/10" />
                    <span className="text-xs font-bold">Claro</span>
                  </button>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-white/90">Color de acento</h3>
                <div className="flex gap-3">
                  {['#E95420', '#1c71d8', '#2ec27e', '#f5c211', '#c061cb'].map(color => (
                    <button 
                      key={color}
                      onClick={() => setConfig({ ...config, accentColor: color })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${config.accentColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'fusion' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-8">Fusión de Sistema</h2>
              
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E95420]/20 rounded-xl flex items-center justify-center text-[#E95420]">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Estado de Integración Nativa</h3>
                    <p className="text-[10px] text-white/40">Control de hardware a nivel de Kernel</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
                    <span className="text-xs">Motor Háptico</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Conectado</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
                    <span className="text-xs">Sensores de Energía</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Conectado</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
                    <span className="text-xs">Control de Barra de Estado</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Conectado</span>
                  </div>
                </div>

                <button 
                  onClick={async () => {
                    const { systemService } = await import('../../services/systemService');
                    await systemService.vibrate();
                    alert('Vibración enviada al hardware nativo.');
                  }}
                  className="w-full py-3 bg-[#E95420] hover:bg-[#E95420]/80 text-white rounded-xl text-xs font-bold transition-all active:scale-95"
                >
                  Probar Vibración de Sistema
                </button>
              </div>

              <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                <div className="flex items-center gap-3 text-blue-400 mb-4">
                  <Info size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Nota Técnica</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  A diferencia de otros sistemas simulados, Aria Launcher utiliza el puente Capacitor para inyectar comandos directamente en el framework de Android/Linux. Todas las funciones de red, energía y periféricos son reales y no emuladas.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-8">Acerca de</h2>
              
              <div className="bg-[#353535] rounded-xl border border-black/20 overflow-hidden">
                <div className="p-8 flex flex-col items-center gap-4 border-b border-black/20">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#E95420] to-[#77216F] rounded-3xl flex items-center justify-center shadow-2xl">
                    <BrainCircuit size={48} className="text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold italic uppercase tracking-tighter">Aria Launcher</h3>
                    <p className="text-xs text-[#E95420] font-black uppercase tracking-widest mt-1">System Fusion Core</p>
                  </div>
                </div>
                
                <div className="p-4 space-y-1">
                  {[
                    { label: 'Nombre del dispositivo', value: 'aria-fusion-launcher' },
                    { label: 'Estado del Núcleo', value: 'Esperando Fusión' },
                    { label: 'Motor de Inteligencia', value: 'Aria Neural Engine v5' },
                    { label: 'Potencia de Procesamiento', value: 'Ubuntu Core 24.04' },
                    { label: 'Capacidad de Fusión', value: 'Total (Kernel Level)' },
                    { label: 'Versión del Launcher', value: '1.0.0-fusion' },
                    { label: 'Sistema de Ventanas', value: 'Aria Glass' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                      <span className="text-xs text-white/60">{item.label}</span>
                      <span className="text-xs font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
