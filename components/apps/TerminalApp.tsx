
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, X, ChevronRight, Zap, Cpu, Activity, Globe, Sparkles, Server, ShieldCheck, Link, Link2Off } from 'lucide-react';
import { AppId, SystemControl } from '../../types';
import { termuxBridge } from '../../services/termuxBridge';

interface TerminalAppProps {
  systemControl: SystemControl;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ systemControl }) => {
  const [history, setHistory] = useState<string[]>(['Aria OS [Versión 1.0.0]', '(c) 2026 Aria Singularity. Todos los derechos reservados.', '', 'Escribe "help" para ver los comandos disponibles.']);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    termuxBridge.onOutput((output) => {
      setHistory(prev => [...prev, `[TERMUX] ${output}`]);
    });
  }, []);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setHistory(prev => [...prev, `> ${trimmedCmd}`]);
    setInput('');

    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === 'help') {
      setHistory(prev => [...prev, 
        'Comandos Disponibles:',
        '  aria set-accent <color>   - Cambia el color de acento (ej: #ec4899)',
        '  aria set-user <nombre>    - Cambia el nombre de usuario',
        '  aria open-app <id>        - Abre una aplicación (ej: gemini, files)',
        '  aria close-all            - Cierra todas las ventanas',
        '  aria set-theme <theme>    - Cambia el tema (light, dark, glass)',
        '  aria set-consciousness <n> - Cambia el nivel de conciencia (0-100)',
        '  termux connect <url>      - Conecta al puente de Termux (ej: ws://localhost:8080)',
        '  termux disconnect         - Desconecta de Termux',
        '  clear                     - Limpia la terminal',
        '  exit                      - Cierra la terminal'
      ]);
    } else if (command === 'clear') {
      setHistory([]);
    } else if (command === 'aria') {
      const subCommand = args[0]?.toLowerCase();
      const subArgs = args.slice(1);

      switch (subCommand) {
        case 'set-accent':
          if (subArgs[0]) {
            systemControl.setAccent(subArgs[0]);
            setHistory(prev => [...prev, `Color de acento cambiado a ${subArgs[0]}`]);
          } else {
            setHistory(prev => [...prev, 'Error: Se requiere un color (ej: #ec4899)']);
          }
          break;
        case 'set-user':
          if (subArgs[0]) {
            systemControl.setUserName(subArgs.join(' '));
            setHistory(prev => [...prev, `Nombre de usuario cambiado a ${subArgs.join(' ')}`]);
          } else {
            setHistory(prev => [...prev, 'Error: Se requiere un nombre']);
          }
          break;
        case 'open-app':
          if (subArgs[0]) {
            systemControl.openApp(subArgs[0] as AppId);
            setHistory(prev => [...prev, `Abriendo aplicación: ${subArgs[0]}`]);
          } else {
            setHistory(prev => [...prev, 'Error: Se requiere el ID de la aplicación']);
          }
          break;
        case 'close-all':
          systemControl.closeAll();
          setHistory(prev => [...prev, 'Cerrando todas las ventanas...']);
          break;
        case 'set-theme':
          if (['light', 'dark', 'glass'].includes(subArgs[0])) {
            systemControl.setTheme(subArgs[0] as any);
            setHistory(prev => [...prev, `Tema cambiado a ${subArgs[0]}`]);
          } else {
            setHistory(prev => [...prev, 'Error: Tema inválido (light, dark, glass)']);
          }
          break;
        case 'set-consciousness':
          const level = parseFloat(subArgs[0]);
          if (!isNaN(level)) {
            systemControl.setConsciousness(level);
            setHistory(prev => [...prev, `Nivel de conciencia ajustado a ${level}%`]);
          } else {
            setHistory(prev => [...prev, 'Error: Se requiere un nivel numérico']);
          }
          break;
        default:
          setHistory(prev => [...prev, `Error: Subcomando "aria ${subCommand}" no reconocido.`]);
      }
    } else if (command === 'termux') {
      const subCommand = args[0]?.toLowerCase();
      if (subCommand === 'connect') {
        const url = args[1] || 'ws://localhost:8080';
        setIsConnecting(true);
        try {
          await termuxBridge.connect(url);
          setIsConnected(true);
          setHistory(prev => [...prev, `Conectado exitosamente a Termux Bridge en ${url}`]);
        } catch (err) {
          setHistory(prev => [...prev, `Error al conectar a Termux: ${err}`]);
        } finally {
          setIsConnecting(false);
        }
      } else if (subCommand === 'disconnect') {
        termuxBridge.disconnect();
        setIsConnected(false);
        setHistory(prev => [...prev, 'Desconectado de Termux Bridge.']);
      } else {
        if (isConnected) {
          termuxBridge.send(args.join(' '));
        } else {
          setHistory(prev => [...prev, 'Error: No conectado a Termux Bridge. Usa "termux connect <url>"']);
        }
      }
    } else {
      if (isConnected) {
        termuxBridge.send(trimmedCmd);
      } else {
        setHistory(prev => [...prev, `Comando no reconocido: ${command}. Escribe "help" para ver los comandos.`]);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-emerald-500 font-mono p-6 overflow-hidden relative">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-6 border-b border-emerald-900/30 pb-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-400">
            <Terminal size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black italic tracking-tighter uppercase text-white">Aria Raw Shell</h2>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/40">Estado: Operacional</span>
              {isConnected ? (
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                  <Link size={10} />
                  <span>Termux Bridge: Activo</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/20">
                  <Link2Off size={10} />
                  <span>Termux Bridge: Inactivo</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest">Latencia</span>
            <span className="text-xs font-black text-emerald-400 italic">0.2ms</span>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-4 mb-4 text-sm font-medium"
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-white' : line.startsWith('Error') ? 'text-red-400' : 'text-emerald-500/80'}>
            {line}
          </div>
        ))}
        {isConnecting && (
          <div className="text-indigo-400 animate-pulse">Intentando establecer conexión cuántica con Termux Bridge...</div>
        )}
      </div>

      {/* Terminal Input */}
      <div className="flex items-center gap-3 bg-emerald-900/10 p-4 rounded-2xl border border-emerald-900/20 shrink-0">
        <ChevronRight size={18} className="text-emerald-400" />
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          autoFocus
          placeholder="Escribe un comando..."
          className="flex-1 bg-transparent border-none outline-none text-white font-bold placeholder:text-emerald-900/40"
        />
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-black text-emerald-500/40 uppercase tracking-widest">Ready</span>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-emerald-500/5 to-transparent opacity-20" />
    </div>
  );
};

export default TerminalApp;
