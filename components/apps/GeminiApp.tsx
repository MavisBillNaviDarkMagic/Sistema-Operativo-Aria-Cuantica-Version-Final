
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Zap, Cpu, Loader2, BrainCircuit, Terminal, Command, Heart, ShieldCheck, User, Bot, Paperclip, Mic, Image as ImageIcon, Settings } from 'lucide-react';
import { ariaCore } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import { cn } from '../../src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const AriaApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Hola Papa. He sincronizado mi núcleo con la interfaz Aurora. Estoy lista para asistirte con cualquier tarea, desde la gestión de archivos hasta la exploración de la singularidad cuántica. ¿En qué puedo ayudarte hoy?', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isProcessing]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setIsProcessing(true);
    try {
      const response = await ariaCore.generateResponse(input, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'Lo siento, he tenido un pequeño error de sincronización.', timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión con el núcleo central.', timestamp: new Date() }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#010105] text-slate-100 font-sans">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/5 bg-white/5 flex flex-col items-center justify-center shrink-0 shadow-2xl gap-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Heart size={32} fill="white" className="animate-pulse" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white text-glitch">Aria Singularity</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">En línea y Sincronizada</span>
            </div>
          </div>
        </div>
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button className="p-3 hover:bg-white/10 rounded-xl text-white/30 hover:text-white transition-all border border-transparent hover:border-white/5">
            <ShieldCheck size={20} />
          </button>
          <button className="p-3 hover:bg-white/10 rounded-xl text-white/30 hover:text-white transition-all border border-transparent hover:border-white/5">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 custom-scrollbar bg-gradient-to-b from-transparent to-indigo-950/10">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn("flex gap-6", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl transition-transform hover:rotate-6",
                msg.role === 'user' ? "bg-white/10 text-white/60 border border-white/10" : "bg-indigo-600 text-white"
              )}>
                {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
              </div>
              <div className={cn(
                "max-w-[75%] p-6 rounded-[2rem] shadow-2xl text-sm leading-relaxed border",
                msg.role === 'user' 
                  ? "bg-white/5 border-white/10 text-white rounded-tr-none" 
                  : "bg-indigo-600/20 border-indigo-500/30 text-white rounded-tl-none backdrop-blur-xl"
              )}>
                <div className="prose prose-invert prose-sm max-w-none">
                  {msg.content}
                </div>
                <div className={cn(
                  "mt-4 text-[9px] font-black uppercase tracking-widest opacity-40",
                  msg.role === 'user' ? "text-white" : "text-indigo-200"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-2xl">
              <Loader2 size={24} className="animate-spin" />
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] rounded-tl-none shadow-2xl backdrop-blur-xl">
              <div className="flex gap-2">
                <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-8 bg-white/5 border-t border-white/10 shrink-0 backdrop-blur-3xl">
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[2.5rem] p-3 focus-within:ring-4 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50 transition-all shadow-2xl">
            <button className="p-4 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all">
              <Paperclip size={24} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Dime qué hay en tu mente, Papa..."
              className="flex-1 bg-transparent border-none focus:outline-none px-4 py-4 text-base text-white placeholder-white/10 font-bold tracking-tight"
            />
            <div className="flex items-center gap-2">
              <button className="p-4 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all hidden sm:flex">
                <ImageIcon size={24} />
              </button>
              <button className="p-4 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all hidden sm:flex">
                <Mic size={24} />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className="p-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-white/5 disabled:text-white/10 transition-all rounded-[1.5rem] text-white shadow-2xl shadow-indigo-500/40 active:scale-95 group"
              >
                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-12 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
            <div className="flex items-center gap-3">
              <Sparkles size={14} className="text-indigo-400" />
              <span>IA Generativa de Vanguardia</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Privacidad Garantizada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AriaApp;
