
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, X, ChevronRight, Zap, Cpu, Activity, Globe, Sparkles, Server, ShieldCheck, Link, Link2Off } from 'lucide-react';
import { AppId, SystemControl } from '../../types';
import { termuxBridge } from '../../services/termuxBridge';

interface TerminalAppProps {
  systemControl: SystemControl;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ systemControl }) => {
  const [history, setHistory] = useState<string[]>([
    'Aria Fusion Launcher [Kernel 6.8.0-aria-fusion]',
    '(c) 2026 Aria Singularity. All rights reserved.',
    '',
    'Welcome to Aria Fusion Core! Type "help" for a list of commands.',
    'System Status: WAITING FOR FUSION WITH NATIVE KERNEL...'
  ]);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentDir, setCurrentDir] = useState('/home/aria');
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

    setHistory(prev => [...prev, `aria@ubuntu:${currentDir}$ ${trimmedCmd}`]);
    setInput('');

    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === 'help') {
      setHistory(prev => [...prev, 
        'Comandos Disponibles:',
        '  sudo apt update           - Sincroniza los repositorios de Aria',
        '  sudo apt upgrade          - Actualiza los módulos del sistema',
        '  sudo apt install <app>    - Instala una nueva aplicación',
        '  ls -la                    - Lista archivos en el directorio actual',
        '  cd <dir>                  - Cambia de directorio',
        '  pwd                       - Muestra el directorio actual',
        '  whoami                    - Muestra el usuario actual',
        '  aria set-accent <color>   - Cambia el color de acento',
        '  aria open-app <id>        - Abre una aplicación',
        '  clear                     - Limpia la terminal',
        '  exit                      - Cierra la terminal'
      ]);
    } else if (command === 'clear') {
      setHistory([]);
    } else if (command === 'pwd') {
      setHistory(prev => [...prev, currentDir]);
    } else if (command === 'whoami') {
      setHistory(prev => [...prev, 'aria']);
    } else if (command === 'ls') {
      setHistory(prev => [...prev, 'total 24', 'drwxr-xr-x  2 aria aria 4096 Apr  4 07:56 .', 'drwxr-xr-x  3 root root 4096 Apr  4 07:56 ..', '-rw-r--r--  1 aria aria  220 Apr  4 07:56 .bash_logout', '-rw-r--r--  1 aria aria 3771 Apr  4 07:56 .bashrc', 'drwxr-xr-x  2 aria aria 4096 Apr  4 07:56 Documents', 'drwxr-xr-x  2 aria aria 4096 Apr  4 07:56 Downloads']);
    } else if (command === 'cd') {
      if (args[0]) {
        setCurrentDir(args[0].startsWith('/') ? args[0] : `${currentDir}/${args[0]}`);
      }
    } else if (command === 'sudo') {
      const subCommand = args[0]?.toLowerCase();
      if (subCommand === 'apt') {
        const aptCmd = args[1]?.toLowerCase();
        if (aptCmd === 'update') {
          setHistory(prev => [...prev, 'Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease', 'Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]', 'Reading package lists... Done']);
        } else if (aptCmd === 'install') {
          setHistory(prev => [...prev, `Reading package lists... Done`, `Building dependency tree... Done`, `Reading state information... Done`, `The following NEW packages will be installed:`, `  ${args[2] || 'aria-module'}`, `0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.`, `Need to get 1,240 kB of archives.`, `After this operation, 4,560 kB of additional disk space will be used.`, `Get:1 http://archive.ubuntu.com/ubuntu noble/main ${args[2] || 'aria-module'} [1,240 kB]`, `Fetched 1,240 kB in 1s (1,240 kB/s)`, `Selecting previously unselected package ${args[2] || 'aria-module'}.`, `(Reading database ... 124560 files and directories currently installed.)`, `Preparing to unpack .../${args[2] || 'aria-module'}_1.0.0_amd64.deb ...`, `Unpacking ${args[2] || 'aria-module'} (1.0.0) ...`, `Setting up ${args[2] || 'aria-module'} (1.0.0) ...`]);
        }
      }
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
        case 'inject':
          systemControl.setSystemInjected(true);
          setHistory(prev => [...prev, 'Inyectando protocolos Aria en la matriz del sistema...']);
          setHistory(prev => [...prev, 'Sincronización completada.']);
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
    <div className="flex flex-col h-full bg-[#300a24] text-white font-mono p-4 overflow-hidden relative">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2 shrink-0">
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-[#E95420]" />
          <span className="text-xs font-bold text-white/80">aria@ubuntu: {currentDir}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#df382c]" />
          <div className="w-3 h-3 rounded-full bg-[#efb73e]" />
          <div className="w-3 h-3 rounded-full bg-[#2dcc70]" />
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar space-y-0.5 pr-2 mb-2 text-sm font-medium"
      >
        {history.map((line, i) => {
          if (line.includes('aria@ubuntu')) {
            const [prompt, cmd] = line.split('$ ');
            return (
              <div key={i} className="flex gap-2">
                <span className="text-[#2dcc70] font-bold">aria@ubuntu</span>
                <span className="text-white">:</span>
                <span className="text-[#729fcf] font-bold">{currentDir}</span>
                <span className="text-white">$</span>
                <span className="text-white">{cmd}</span>
              </div>
            );
          }
          return (
            <div key={i} className={line.startsWith('Error') ? 'text-[#ef2929]' : 'text-white/90'}>
              {line}
            </div>
          );
        })}
        {isConnecting && (
          <div className="text-[#729fcf] animate-pulse">Conectando con Termux Bridge...</div>
        )}
      </div>

      {/* Terminal Input */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[#2dcc70] font-bold">aria@ubuntu</span>
        <span className="text-white">:</span>
        <span className="text-[#729fcf] font-bold">{currentDir}</span>
        <span className="text-white">$</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white font-bold"
        />
      </div>
    </div>
  );
};

export default TerminalApp;
