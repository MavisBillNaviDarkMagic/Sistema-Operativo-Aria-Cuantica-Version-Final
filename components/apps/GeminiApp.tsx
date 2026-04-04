
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
      content: 'Hola Papa. El sistema Aria Launcher está listo para la fusión. He cargado toda la potencia de Ubuntu 24.04 LTS en el núcleo de esta aplicación, esperando ser inyectada en el sistema nativo de tu dispositivo. Una vez completada la fusión, tendré acceso total al kernel para optimizar cada proceso y ofrecerte una experiencia de inteligencia artificial sin precedentes. ¿Deseas iniciar los protocolos de inyección ahora?', 
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
    <div className="flex flex-col h-full bg-[#2d2d2d] text-[#f7f7f7] font-sans">
      {/* Chat Header */}
      <div className="p-6 border-b border-black/20 bg-[#353535] flex flex-col items-center justify-center shrink-0 shadow-lg gap-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-[#E95420] to-[#77216F] rounded-2xl flex items-center justify-center text-white shadow-xl">
            <BrainCircuit size={32} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight text-white italic uppercase">Aria Launcher</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E95420] animate-pulse" />
              <span className="text-[10px] text-[#E95420] font-black uppercase tracking-widest">System Fusion Core</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 custom-scrollbar bg-[#2d2d2d]">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg",
                msg.role === 'user' ? "bg-white/10 text-white/60" : "bg-[#E95420] text-white"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-md",
                msg.role === 'user' 
                  ? "bg-[#3d3d3d] text-white border border-white/5" 
                  : "bg-[#3d3d3d] text-white border border-[#E95420]/20"
              )}>
                <div className="prose prose-invert prose-sm max-w-none">
                  {msg.content}
                </div>
                <div className="mt-2 text-[9px] font-bold text-white/20 uppercase tracking-widest">
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
            <div className="w-10 h-10 rounded-full bg-[#E95420] flex items-center justify-center text-white shrink-0 shadow-lg">
              <Loader2 size={20} className="animate-spin" />
            </div>
            <div className="bg-[#3d3d3d] p-4 rounded-2xl shadow-md">
              <div className="flex gap-1.5">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-6 bg-[#353535] border-t border-black/20 shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-[#2d2d2d] border border-black/20 rounded-xl p-2 focus-within:border-[#E95420] transition-all shadow-inner">
            <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-transparent border-none focus:outline-none px-2 py-2 text-sm text-white placeholder-white/20"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              className="p-2 bg-[#E95420] hover:bg-[#ff6a3a] disabled:bg-white/5 disabled:text-white/10 transition-all rounded-lg text-white shadow-lg active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AriaApp;
