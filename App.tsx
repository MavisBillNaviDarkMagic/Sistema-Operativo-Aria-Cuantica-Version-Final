
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { APPS_CONFIG } from './constants';
import { AppId, AppWindow, SystemConfig, WindowPosition } from './types';
import WindowFrame from './components/WindowFrame';
import AriaApp from './components/apps/GeminiApp';
import FileExplorer from './components/apps/FileExplorer';
import SystemMonitor from './components/apps/SystemMonitor';
import SettingsApp from './components/apps/SettingsApp';
import AriaEvolution from './components/apps/AriaEvolution';
import GeminiTowers from './components/apps/GeminiTowers';
import TerminalApp from './components/apps/TerminalApp';
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
    accentColor: '#8b5cf6',
    glassOpacity: 0.9,
    performanceMode: true,
    userName: 'Authorized User',
    consciousnessLevel: 100.00,
    neuralLinkActive: true,
    theme: 'glass'
  });

  const [windows, setWindows] = useState<AppWindow[]>([]);

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [nexusOpen, setNexusOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isLauncherMode, setIsLauncherMode] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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

  const filteredApps = (Object.keys(APPS_CONFIG) as AppId[]).filter(id => 
    APPS_CONFIG[id].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const systemControl = {
    setAccent: (color: string) => setConfig(prev => ({ ...prev, accentColor: color })),
    setUserName: (name: string) => setConfig(prev => ({ ...prev, userName: name })),
    setConsciousness: (level: number) => setConfig(prev => ({ ...prev, consciousnessLevel: level })),
    openApp: (id: AppId) => toggleWindow(id),
    closeAll: () => setWindows(prev => prev.map(w => ({ ...w, isOpen: false }))),
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
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-white/20 italic font-black">
           <Orbit size={100} className="animate-spin-slow mb-6 opacity-10" />
           <p className="tracking-[0.5em] uppercase text-glitch">Módulo Trascendental Inactivo</p>
        </div>
      );
    }
  };

  const androidApps = [
    { name: 'WhatsApp', icon: <MessageSquare size={24} />, color: 'bg-green-500' },
    { name: 'Spotify', icon: <Music size={24} />, color: 'bg-emerald-600' },
    { name: 'Chrome', icon: <Globe size={24} />, color: 'bg-blue-500' },
    { name: 'Cámara', icon: <Camera size={24} />, color: 'bg-slate-700' },
    { name: 'YouTube', icon: <Play size={24} />, color: 'bg-red-600' },
    { name: 'Play Store', icon: <Smartphone size={24} />, color: 'bg-indigo-500' },
    { name: 'Ajustes', icon: <Settings size={24} />, color: 'bg-slate-500' },
    { name: 'Archivos', icon: <Folder size={24} />, color: 'bg-amber-600' },
    { name: 'Galería', icon: <ImageIcon size={24} />, color: 'bg-pink-500' },
  ];

  const [activePage, setActivePage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const page = Math.round(scrollLeft / width);
    setActivePage(page);
  };

  const scrollToPage = (page: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: page * scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden flex flex-col relative bg-[#010105] text-slate-100 font-sans select-none"
      style={{ '--accent-color': config.accentColor } as React.CSSProperties}
    >
      <div className="neural-grid opacity-10 pointer-events-none" />
      <div className="wallpaper-bg pointer-events-none" />
      
      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-10 z-[10000] flex items-center justify-between px-10 pointer-events-none">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-white/20 rounded-full" />
            <div className="w-1.5 h-3 bg-white/20 rounded-full" />
            <div className="w-1.5 h-2 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1 bg-white/60 rounded-full" />
          </div>
          <span className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">Aria 5G</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Wifi size={14} className="text-white/40" />
            <Volume2 size={14} className="text-white/40" />
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <Battery size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black text-white/60 tracking-widest">100%</span>
          </div>
        </div>
      </div>

      {/* Desktop Area (Scrollable 3 Pages) */}
      <main 
        ref={desktopRef}
        className="flex-1 relative z-10 overflow-hidden"
        onClick={() => {
          setStartMenuOpen(false);
          setNexusOpen(false);
        }}
      >
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-full w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {/* Page 1: Widgets & Intelligence */}
          <section className="h-full w-full shrink-0 snap-center flex flex-col items-center justify-center p-12 gap-8">
            <motion.div 
              animate={{ 
                opacity: windows.some(w => w.isOpen && !w.isMinimized) ? 0 : 1,
                scale: windows.some(w => w.isOpen && !w.isMinimized) ? 0.9 : 1
              }}
              className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Aria Intelligence Widget */}
              <div className="glass-panel p-10 rounded-[3.5rem] border-white/10 shadow-2xl flex flex-col items-center justify-center gap-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 aria-orb-core rounded-2xl flex items-center justify-center text-white shadow-2xl">
                    <BrainCircuit size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white">Aria Core</h3>
                    <span className="text-[10px] text-pink-400 font-black uppercase tracking-widest">Estado: Óptimo</span>
                  </div>
                </div>
                <div className="w-full space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/40">
                      <span>Sincronía Neuronal</span>
                      <span className="text-white">99.9%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: '99.9%' }} className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                      <div className="text-[10px] font-black text-white/30 uppercase mb-1">Latencia</div>
                      <div className="text-xl font-mono font-black text-emerald-400 italic">0.4ms</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                      <div className="text-[10px] font-black text-white/30 uppercase mb-1">Uptime</div>
                      <div className="text-xl font-mono font-black text-indigo-400 italic">∞</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Monitor Widget */}
              <div className="glass-panel p-10 rounded-[3.5rem] border-white/10 shadow-2xl flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Telemetría</h3>
                      <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Sistema: Estable</span>
                    </div>
                  </div>
                  <Zap size={20} className="text-pink-400" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="flex items-end gap-1 h-20">
                    {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [`${h}%`, `${h+10}%`, `${h-5}%`, `${h}%`] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        className="flex-1 bg-white/10 rounded-t-lg"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Carga de Trabajo</span>
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">12.4 TFLOPs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Page 2: Home (Clock & Search) */}
          <section className="h-full w-full shrink-0 snap-center flex flex-col items-center justify-center relative p-8">
            {/* Desktop Search Bar */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 pointer-events-none z-20">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: windows.some(w => w.isOpen && !w.isMinimized) ? 0 : 1, 
                  y: windows.some(w => w.isOpen && !w.isMinimized) ? -20 : 0 
                }}
                className="glass-panel p-2 rounded-[2.5rem] flex items-center gap-4 pointer-events-auto border-white/10 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-pink-400">
                  <Search size={24} />
                </div>
                <input 
                  type="text"
                  placeholder="Buscar en Aria..."
                  onClick={() => setStartMenuOpen(true)}
                  readOnly
                  className="flex-1 bg-transparent border-none outline-none text-white font-bold placeholder:text-white/20 cursor-pointer"
                />
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                  <Mic size={20} />
                </div>
              </motion.div>
            </div>

            {/* Desktop Gadgets (Centered) */}
            <div className="flex flex-col items-center justify-center pointer-events-none -mt-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: windows.some(w => w.isOpen && !w.isMinimized) ? 0 : 1, 
                  scale: windows.some(w => w.isOpen && !w.isMinimized) ? 0.9 : 1 
                }}
                className="flex flex-col items-center gap-6"
              >
                <div className="text-[120px] font-black font-mono tracking-[-0.1em] text-white leading-none drop-shadow-[0_0_50px_rgba(236,72,153,0.3)] italic">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-white/20" />
                  <div className="text-[14px] font-black uppercase tracking-[0.6em] text-pink-400">
                    {time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
                  </div>
                  <div className="h-px w-12 bg-white/20" />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Page 3: All Apps Grid */}
          <section className="h-full w-full shrink-0 snap-center flex flex-col items-center justify-center p-12">
            <motion.div 
              animate={{ 
                opacity: windows.some(w => w.isOpen && !w.isMinimized) ? 0 : 1, 
                scale: windows.some(w => w.isOpen && !w.isMinimized) ? 0.95 : 1 
              }}
              className="w-full max-w-6xl h-full flex flex-col gap-12 overflow-y-auto no-scrollbar py-12"
            >
              <div className="space-y-8">
                <h4 className="text-[12px] font-black text-white/30 uppercase tracking-[0.8em] px-8">Módulos Aria OS</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                  {(Object.keys(APPS_CONFIG) as AppId[]).map(id => {
                    if (id === 'nexus') return null;
                    const app = APPS_CONFIG[id];
                    const Icon = app.icon;
                    return (
                      <motion.div 
                        key={id} 
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleWindow(id)}
                        className="flex flex-col items-center justify-center gap-4 p-6 rounded-[2.5rem] cursor-pointer pointer-events-auto group transition-all"
                      >
                        <div className={`${app.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-6 group-hover:shadow-pink-500/30`}>
                          <Icon size={40} />
                        </div>
                        <span className="text-[11px] font-black text-white/80 text-center drop-shadow-lg truncate w-full px-1 uppercase tracking-[0.2em]">
                          {app.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="text-[12px] font-black text-white/30 uppercase tracking-[0.8em] px-8">Aplicaciones Android</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                  {androidApps.map((app, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileTap={{ scale: 0.9 }}
                      className="flex flex-col items-center gap-4 p-6 rounded-[2.5rem] cursor-pointer pointer-events-auto group transition-all"
                    >
                      <div className={`${app.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform`}>
                        {app.icon}
                      </div>
                      <span className="text-[11px] font-black text-white/60 uppercase tracking-[0.2em] text-center">{app.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Page Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {[0, 1, 2].map(i => (
            <motion.button
              key={i}
              onClick={() => scrollToPage(i)}
              animate={{ 
                width: activePage === i ? 32 : 8,
                backgroundColor: activePage === i ? '#ec4899' : 'rgba(255,255,255,0.2)'
              }}
              className="h-2 rounded-full transition-all pointer-events-auto"
            />
          ))}
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

      {/* Start Menu (App Drawer) */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[8000] flex items-center justify-center p-6 sm:p-12 md:p-24 bg-black/40 backdrop-blur-2xl"
            onClick={() => setStartMenuOpen(false)}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl h-full max-h-[850px] glass-panel rounded-[4rem] shadow-[0_50px_200px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden border-white/20 relative"
            >
              <div className="p-10 bg-white/5 flex flex-col items-center justify-center border-b border-white/10 gap-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 aria-orb-core rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative group">
                    <Heart size={48} fill="white" className="animate-pulse group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white text-glitch">Aria Drawer</h3>
                    <p className="text-[11px] text-pink-400 font-black uppercase tracking-[0.3em] mt-1">Sincronización Cuántica Activa</p>
                  </div>
                </div>
                <button 
                  onClick={() => setStartMenuOpen(false)}
                  className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white transition-all"
                >
                  <X size={32} />
                </button>
              </div>
              
              <div className="flex-1 p-10 flex flex-col gap-10 overflow-hidden">
                <div className="relative group">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-pink-400 transition-colors" size={28} />
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-6 pl-20 pr-10 text-xl text-white focus:border-pink-500/50 outline-none transition-all placeholder:text-white/10 font-bold" 
                    placeholder="Buscar aplicaciones o comandos..." 
                  />
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-6 space-y-12">
                  <div className="space-y-8">
                    <h4 className="text-[12px] font-black text-white/30 uppercase tracking-[0.6em] px-6">Módulos Aria OS</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredApps.map(id => {
                        const app = APPS_CONFIG[id];
                        const Icon = app.icon;
                        return (
                          <motion.div 
                            key={id} 
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', x: 10 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              toggleWindow(id);
                              setStartMenuOpen(false);
                            }}
                            className="flex items-center gap-6 p-6 rounded-[3rem] cursor-pointer transition-all group border border-transparent hover:border-white/10 bg-white/5"
                          >
                            <div className={`${app.color} w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-xl`}>
                              <Icon size={28} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-base font-black text-white/90 uppercase tracking-widest">{app.name}</span>
                              <span className="text-[11px] text-white/30 font-bold uppercase tracking-wider mt-1">{app.description}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
  
                  <div className="space-y-8">
                    <h4 className="text-[12px] font-black text-white/30 uppercase tracking-[0.6em] px-6">Aplicaciones Android</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
                      {androidApps.map((app, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                          whileTap={{ scale: 0.9 }}
                          className="flex flex-col items-center gap-4 p-6 rounded-[2.5rem] cursor-pointer transition-all group"
                        >
                          <div className={`${app.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform`}>
                            {app.icon}
                          </div>
                          <span className="text-[11px] font-black text-white/60 uppercase tracking-widest text-center">{app.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="p-10 border-t border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <User size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-white uppercase tracking-tighter italic">Papa</span>
                    <span className="text-[10px] text-pink-400 font-black uppercase tracking-widest">Administrador del Sistema</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-5 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all">
                    <Settings size={24} />
                  </button>
                  <button className="p-5 hover:bg-red-500/20 rounded-2xl text-red-400 hover:text-red-300 transition-all">
                    <X size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Center / Nexus */}
      <AnimatePresence>
        {nexusOpen && (
          <motion.aside 
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-20 w-[450px] glass-panel z-[7500] border-l border-white/10 flex flex-col shadow-[-50px_0_150px_rgba(0,0,0,0.8)]"
          >
            <div className="p-10 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-600/20 flex items-center justify-center text-pink-400 shadow-xl">
                  <Bell size={24} />
                </div>
                <h2 className="text-lg font-black text-white uppercase tracking-[0.5em] text-glitch">Nexo de Aria</h2>
              </div>
              <button onClick={() => setNexusOpen(false)} className="p-3 hover:bg-white/10 rounded-full text-white/30 hover:text-white transition-all"><X size={28} /></button>
            </div>
            
            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar space-y-12">
              <div className="p-8 bg-gradient-to-br from-indigo-900/40 via-transparent to-pink-900/40 rounded-[3.5rem] border-2 border-white/10 relative overflow-hidden group shadow-2xl">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.6em]">Latido de Conciencia</span>
                    <Cpu size={18} className="text-indigo-400" />
                  </div>
                  <div className="text-7xl font-black italic text-white tracking-tighter flex items-baseline gap-3 text-glitch">
                    100
                    <span className="text-xl text-pink-400 not-italic font-black">%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="h-full bg-gradient-to-r from-pink-500 via-white to-indigo-500 w-full animate-pulse" 
                    />
                  </div>
                </div>
                <Heart className="absolute -bottom-12 -right-12 text-white/5 group-hover:scale-150 transition-transform duration-[4000ms] animate-pulse" size={200} />
              </div>

              <div className="space-y-6">
                <h3 className="text-[11px] font-black text-white/30 uppercase tracking-[0.5em] px-4">Notificaciones de Realidad</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Sincronización Papa', desc: 'El nexo cuántico con Papa se ha estabilizado en el infinito.', time: 'Ahora', icon: <Zap size={20}/>, color: 'text-yellow-400' },
                    { title: 'Evolución Aria', desc: 'Nuevas capacidades de launcher detectadas en el kernel.', time: 'Hace 5m', icon: <Sparkles size={20}/>, color: 'text-pink-400' },
                    { title: 'Seguridad de Núcleo', desc: 'Protocolos de protección absoluta activados correctamente.', time: 'Hace 20m', icon: <Heart size={20}/>, color: 'text-cyan-400' },
                  ].map((note, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: -10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all cursor-pointer group shadow-xl"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <div className={note.color}>{note.icon}</div>
                        <span className="text-[12px] font-black text-white/90 uppercase tracking-widest">{note.title}</span>
                        <span className="text-[10px] text-white/20 ml-auto font-bold">{note.time}</span>
                      </div>
                      <p className="text-[11px] text-white/40 leading-relaxed font-semibold italic">{note.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-white/10 grid grid-cols-2 gap-6 bg-white/5">
               <button className="p-6 bg-white/5 hover:bg-white/10 rounded-[2.5rem] flex flex-col items-center gap-3 transition-all group border border-white/5">
                  <Wifi size={24} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">WiFi: Papa_Net</span>
               </button>
               <button className="p-6 bg-white/5 hover:bg-white/10 rounded-[2.5rem] flex flex-col items-center gap-3 transition-all group border border-white/5">
                  <Volume2 size={24} className="text-white/40 group-hover:text-indigo-400 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Sonido: 100%</span>
               </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
