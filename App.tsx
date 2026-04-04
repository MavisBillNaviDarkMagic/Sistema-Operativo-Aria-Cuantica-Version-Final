
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { APPS_CONFIG } from './constants';
import { AppId, AppWindow, SystemConfig, SystemStatus, WindowPosition } from './types';
import { systemService } from './services/systemService';
import WindowFrame from './components/WindowFrame';
import AriaApp from './components/apps/GeminiApp';
import FileExplorer from './components/apps/FileExplorer';
import SystemMonitor from './components/apps/SystemMonitor';
import SettingsApp from './components/apps/SettingsApp';
import AriaEvolution from './components/apps/AriaEvolution';
import GeminiTowers from './components/apps/GeminiTowers';
import TerminalApp from './components/apps/TerminalApp';
import SystemBridge from './components/apps/SystemBridge';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Cpu, Zap, BrainCircuit, Share2, 
  LayoutGrid, Search, Power, Settings, Activity,
  Wifi, Battery, Volume2, ChevronUp, Bell,
  Command, Terminal, X, Heart, Orbit,
  Monitor, Maximize2, Minimize2, AppWindow as AppIcon,
  Clock, Calendar, Info, Smartphone, Globe, Folder, Image as ImageIcon,
  Music, Camera, MessageSquare, Play, Mic,
  User
} from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig>({
    accentColor: '#E95420', // Ubuntu Orange
    glassOpacity: 0.15,
    performanceMode: true,
    userName: 'Aria User',
    consciousnessLevel: 100.00,
    neuralLinkActive: true,
    isSystemInjected: false,
    distro: 'ubuntu',
    osType: 'linux',
    theme: 'dark'
  });

  const [windows, setWindows] = useState<AppWindow[]>([]);

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [nexusOpen, setNexusOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLauncherMode, setIsLauncherMode] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Initial status
    systemService.getStatus().then(setSystemStatus);
    
    // Periodic update
    const statusTimer = setInterval(async () => {
      const status = await systemService.getStatus();
      setSystemStatus(status);
    }, 10000);

    // Network listener
    const networkListener = systemService.onNetworkChange(status => {
      setSystemStatus(prev => prev ? { ...prev, network: { connected: status.connected, connectionType: status.connectionType } } : null);
    });

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
      networkListener.then(l => l.remove());
    };
  }, []);

  const focusWindow = useCallback((id: AppId) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(win => win.id === id ? { ...win, zIndex: maxZ + 1, isMinimized: false } : win);
    });
  }, []);

  const toggleWindow = useCallback((id: AppId) => {
    setStartMenuOpen(false);
    setWindows(prev => {
      const win = prev.find(w => w.id === id);
      if (win && win.isOpen) {
        if (!win.isMinimized) return prev.map(w => w.id === id ? { ...w, isMinimized: true } : w);
        const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
        return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w);
      }
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      
      // Center the window by default
      const winWidth = window.innerWidth < 768 ? window.innerWidth * 0.95 : 1000;
      const winHeight = window.innerWidth < 768 ? window.innerHeight * 0.8 : 700;
      const centerX = (window.innerWidth - winWidth) / 2;
      const centerY = (window.innerHeight - winHeight) / 2;

      const newWin: AppWindow = {
        id,
        title: APPS_CONFIG[id].name,
        isOpen: true,
        isMaximized: window.innerWidth < 1024,
        isMinimized: false,
        zIndex: maxZ + 1,
        position: { 
          x: centerX + (windows.length * 20), 
          y: centerY + (windows.length * 20) 
        }
      };
      return [...prev, newWin];
    });
  }, [windows.length]);

  const systemControl = {
    setAccent: (color: string) => setConfig(prev => ({ ...prev, accentColor: color })),
    setUserName: (name: string) => setConfig(prev => ({ ...prev, userName: name })),
    setConsciousness: (level: number) => setConfig(prev => ({ ...prev, consciousnessLevel: level })),
    openApp: (id: AppId) => toggleWindow(id),
    closeAll: () => setWindows(prev => prev.map(w => ({ ...w, isOpen: false }))),
    setSystemInjected: (injected: boolean) => setConfig(prev => ({ ...prev, isSystemInjected: injected })),
    setTheme: (theme: 'light' | 'dark' | 'glass') => setConfig(prev => ({ ...prev, theme })),
    setPerformance: (mode: boolean) => setConfig(prev => ({ ...prev, performanceMode: mode })),
  };

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'gemini': return <AriaApp />;
      case 'evolution': return <AriaEvolution />;
      case 'towers': return <GeminiTowers />;
      case 'files': return <FileExplorer />;
      case 'monitor': return <SystemMonitor />;
      case 'settings': return <SettingsApp config={config} setConfig={setConfig} />;
      case 'terminal': return <TerminalApp systemControl={systemControl} />;
      case 'bridge': return <SystemBridge systemControl={systemControl} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-white/20 italic font-black">
           <Orbit size={100} className="animate-spin-slow mb-6 opacity-10" />
           <p className="tracking-[0.5em] uppercase text-glitch">Módulo Trascendental Inactivo</p>
        </div>
      );
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden flex flex-col relative bg-[#2c001e] text-slate-100 font-sans select-none"
      style={{ '--accent-color': config.accentColor } as React.CSSProperties}
    >
      {/* Ubuntu Top Bar */}
      <div className="h-7 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 z-[10000] border-b border-white/5">
        <div className="flex items-center gap-4 h-full">
          <button 
            onClick={() => setNexusOpen(!nexusOpen)}
            className="px-3 h-full hover:bg-white/10 text-[11px] font-bold text-white/90 transition-colors"
          >
            Actividades
          </button>
          {windows.filter(w => w.isOpen && !w.isMinimized).length > 0 && (
            <div className="flex items-center gap-2 px-3 h-full border-l border-white/10">
              <span className="text-[11px] font-bold text-white/90">
                {windows.find(w => w.isOpen && !w.isMinimized)?.title}
              </span>
            </div>
          )}
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 h-full flex items-center">
          <span className="text-[11px] font-bold text-white/90">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
        </div>

        <div className="flex items-center gap-3 h-full">
          <div className="flex items-center gap-1.5 px-2 h-full">
            {systemStatus?.network.connected ? (
              <Wifi size={12} className="text-white/80" />
            ) : (
              <div className="w-3 h-3 border border-white/20 rounded-sm flex items-center justify-center">
                <X size={8} className="text-red-500" />
              </div>
            )}
          </div>
          <Volume2 size={12} className="text-white/80" />
          <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full transition-colors cursor-pointer">
            <Battery 
              size={12} 
              className={systemStatus?.battery.isCharging ? "text-emerald-400 animate-pulse" : (systemStatus?.battery.level || 0) < 20 ? "text-red-500" : "text-emerald-400"} 
            />
            <span className="text-[10px] font-bold text-white/90">
              {systemStatus ? `${Math.round(systemStatus.battery.level)}%` : '100%'}
            </span>
          </div>
          <button 
            onClick={() => toggleWindow('settings')}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          >
            <Settings size={12} className="text-white/80" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Ubuntu Side Dock */}
        <div className="w-14 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-4 gap-2 z-[9000]">
          <button
            onClick={() => setNexusOpen(!nexusOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group mb-4"
          >
            <div className="w-5 h-5 border-2 border-white/40 rounded-sm group-hover:border-white transition-colors" />
            <div className="absolute left-16 px-2 py-1 bg-black/80 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[10001]">
              Actividades
            </div>
          </button>

          {windows.map(win => {
            const appConfig = APPS_CONFIG[win.id as AppId];
            if (!appConfig) return null;
            return (
              <button
                key={win.id}
                onClick={() => toggleWindow(win.id as AppId)}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all group ${win.isOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <div className={`text-white transition-transform group-hover:scale-110 ${win.isOpen ? 'opacity-100' : 'opacity-40'}`}>
                  {React.createElement(appConfig.icon as React.ComponentType<any>, { size: 20 })}
                </div>
                {win.isOpen && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#E95420] rounded-full" />
                )}
                {/* Tooltip */}
                <div className="absolute left-16 px-2 py-1 bg-black/80 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[10001]">
                  {appConfig.name}
                </div>
              </button>
            );
          })}
          
          <div className="flex-1" />
          
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group"
          >
            <LayoutGrid size={20} />
            <div className="absolute left-16 px-2 py-1 bg-black/80 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[10001]">
              Mostrar Aplicaciones
            </div>
          </button>
        </div>

        {/* Desktop Area */}
        <main 
          ref={desktopRef}
          className="flex-1 relative z-10 overflow-hidden"
          onClick={() => {
            setStartMenuOpen(false);
            setNexusOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#2c001e] via-[#3d0029] to-[#010105] opacity-50 pointer-events-none" />
          
          <div className="h-full w-full flex flex-col items-center justify-center relative p-8">
            {/* Desktop Gadgets (Centered) */}
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: windows.some(w => w.isOpen && !w.isMinimized) ? 0 : 1, 
                  scale: windows.some(w => w.isOpen && !w.isMinimized) ? 0.9 : 1 
                }}
                className="flex flex-col items-center gap-6"
              >
                <div className="text-[120px] font-black font-mono tracking-[-0.1em] text-white leading-none drop-shadow-[0_0_50px_rgba(233,84,32,0.2)] italic">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-white/20" />
                  <div className="text-[14px] font-bold uppercase tracking-[0.6em] text-[#E95420]">
                    {time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
                  </div>
                  <div className="h-px w-12 bg-white/20" />
                </div>

                {/* Core Power Indicator */}
                <div className="mt-8 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                    <BrainCircuit size={14} className="text-[#E95420]" />
                    <span>Potencia del Núcleo Aria</span>
                  </div>
                  <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      animate={{ width: ['20%', '95%', '85%', '100%'] }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-full bg-gradient-to-r from-[#E95420] to-[#77216F] shadow-[0_0_10px_rgba(233,84,32,0.5)]" 
                    />
                  </div>
                  <span className="text-[9px] font-mono text-[#E95420] animate-pulse">ESPERANDO FUSIÓN CON EL SISTEMA NATIVO...</span>
                </div>
              </motion.div>

              {/* Installation Bridge Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: windows.some(w => w.isOpen && !w.isMinimized) ? 0 : 1,
                  y: windows.some(w => w.isOpen && !w.isMinimized) ? 20 : 0
                }}
                onClick={() => toggleWindow('bridge')}
                className="mt-12 px-10 py-5 bg-gradient-to-r from-[#E95420] to-[#77216F] hover:from-[#ff6a3a] hover:to-[#912b87] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_60px_rgba(233,84,32,0.3)] transition-all active:scale-95 pointer-events-auto flex items-center gap-4 border border-white/10 group"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Zap size={18} className="animate-pulse" />
                </div>
                <span>Fusionar con el Sistema</span>
              </motion.button>
            </div>
          </div>

          {/* Windows Rendering (Outside scroll container) */}
        <div className="absolute inset-0 pointer-events-none z-50">
          <AnimatePresence>
            {windows.filter(w => w.isOpen).map(win => (
              <motion.div 
                key={win.id} 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ 
                  opacity: win.isMinimized ? 0 : 1, 
                  scale: win.isMinimized ? 0.8 : 1,
                  y: win.isMinimized ? 200 : 0,
                  pointerEvents: win.isMinimized ? 'none' : 'auto'
                }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-0 pointer-events-none"
              >
                <WindowFrame
                  {...win}
                  onClose={() => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isOpen: false } : w))}
                  onMinimize={() => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isMinimized: true } : w))}
                  onMaximize={() => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isMaximized: !w.isMaximized } : w))}
                  onFocus={() => focusWindow(win.id)}
                  onMove={(pos) => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, position: pos } : w))}
                >
                  {renderAppContent(win.id)}
                </WindowFrame>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>

      {/* Notification Center / Nexus */}
      {/* Activities Overview (GNOME Style) */}
      <AnimatePresence>
        {nexusOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[11000] bg-black/60 backdrop-blur-2xl flex flex-col items-center p-20 overflow-hidden"
            onClick={() => setNexusOpen(false)}
          >
            <div className="w-full max-w-5xl flex flex-col gap-12">
              <div className="flex flex-col items-center gap-4">
                {/* Search removed as requested */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {windows.filter(w => w.isOpen).map(win => (
                  <motion.div
                    key={win.id}
                    layoutId={`window-preview-${win.id}`}
                    className="group relative aspect-video bg-[#3d3d3d] rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:border-[#E95420] transition-all shadow-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      focusWindow(win.id);
                      setNexusOpen(false);
                    }}
                  >
                    <div className="h-8 bg-[#2d2d2d] flex items-center px-3 gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#E95420]" />
                      <span className="text-[10px] font-bold text-white/80 uppercase">{win.title}</span>
                    </div>
                    <div className="flex-1 bg-black/20 flex items-center justify-center">
                      {React.createElement(APPS_CONFIG[win.id as AppId]?.icon as React.ComponentType<any>, { size: 48, className: "text-white/20" })}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Enfocar</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App Grid (GNOME Style) */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[11000] bg-black/80 backdrop-blur-3xl flex flex-col items-center p-20 overflow-y-auto"
            onClick={() => setStartMenuOpen(false)}
          >
            <div className="w-full max-w-5xl flex flex-col gap-16">
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#E95420] to-[#77216F] rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative group">
                  <BrainCircuit size={48} className="animate-pulse group-hover:scale-125 transition-transform" />
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white">Aria Launcher</h3>
                  <p className="text-[11px] text-[#E95420] font-black uppercase tracking-[0.4em] mt-2">Núcleo de Potencia Activo</p>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-12">
              {Object.entries(APPS_CONFIG).map(([id, app]) => (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWindow(id as AppId);
                    setStartMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-4 group"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/20 transition-all shadow-xl">
                    {React.createElement(app.icon as React.ComponentType<any>, { size: 40 })}
                  </div>
                  <span className="text-xs font-bold text-white/60 group-hover:text-white text-center tracking-wide">
                    {app.name}
                  </span>
                </motion.button>
              ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
