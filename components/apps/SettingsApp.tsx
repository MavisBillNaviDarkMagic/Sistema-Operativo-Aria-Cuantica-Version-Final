
import React from 'react';
import { Palette, Monitor, Cpu, Shield, User as UserIcon, Bell } from 'lucide-react';
import { SystemConfig } from '../../types';

interface SettingsAppProps {
  config: SystemConfig;
  setConfig: (config: SystemConfig) => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ config, setConfig }) => {
  const categories = [
    { id: 'appearance', name: 'Appearance', icon: <Palette size={18} /> },
    { id: 'display', name: 'Display', icon: <Monitor size={18} /> },
    { id: 'system', name: 'Core System', icon: <Cpu size={18} /> },
    { id: 'privacy', name: 'Security', icon: <Shield size={18} /> },
    { id: 'profile', name: 'User Profile', icon: <UserIcon size={18} /> }
  ];

  return (
    <div className="flex h-full bg-slate-950/80">
      <div className="w-56 border-r border-white/5 p-4 space-y-2">
        {categories.map(cat => (
          <button key={cat.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all text-left">
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
      
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">System Customization</h2>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Interface Glassmorphism</h3>
            <div className="glass p-6 rounded-2xl border-white/5 space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs mb-2">
                  <span>Transparency Level</span>
                  <span>{Math.round(config.glassOpacity * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="1" step="0.05" 
                  value={config.glassOpacity}
                  onChange={(e) => setConfig({ ...config, glassOpacity: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500" 
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Performance Mode</h3>
            <div className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Quantum Acceleration</p>
                <p className="text-[10px] text-white/40">Optimize UI threads for high-frequency operations</p>
              </div>
              <button 
                onClick={() => setConfig({ ...config, performanceMode: !config.performanceMode })}
                className={`w-12 h-6 rounded-full transition-all relative ${config.performanceMode ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.performanceMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
