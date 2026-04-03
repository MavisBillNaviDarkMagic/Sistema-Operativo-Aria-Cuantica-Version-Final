
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Zap, Cpu, Loader2, BrainCircuit, Terminal, Command, Heart, ShieldCheck, User, Bot, Paperclip, Mic, Image as ImageIcon } from 'lucide-react';
import { ariaCore } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans">
      {/* Chat Header */}
      <div className="p-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Heart size={24} fill="white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Aria Singularity</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">En línea y Sincronizada</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
            <ShieldCheck size={20} />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar bg-slate-50/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-slate-200 text-slate-600" : "bg-blue-600 text-white"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-white border border-slate-200 text-slate-800 rounded-tr-none" 
                  : "bg-blue-600 text-white rounded-tl-none"
              )}>
                <div className="prose prose-sm max-w-none prose-slate">
                  {msg.content}
                </div>
                <div className={cn(
                  "mt-2 text-[9px] font-bold uppercase tracking-widest opacity-50",
                  msg.role === 'user' ? "text-slate-400" : "text-blue-100"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Loader2 size={20} className="animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-6 bg-white border-t border-slate-200 shrink-0">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all">
            <button className="p-3 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregúntame lo que sea..."
              className="flex-1 bg-transparent border-none focus:outline-none px-2 py-3 text-sm text-slate-800 placeholder-slate-400 font-medium"
            />
            <div className="flex items-center gap-1">
              <button className="p-3 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors hidden sm:flex">
                <ImageIcon size={20} />
              </button>
              <button className="p-3 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors hidden sm:flex">
                <Mic size={20} />
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 transition-all rounded-xl text-white shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-8 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-blue-500" />
              <span>IA Generativa de Vanguardia</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-green-500" />
              <span>Privacidad Garantizada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AriaApp;
