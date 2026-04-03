
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2, GripVertical, ChevronUp } from 'lucide-react';
import { WindowPosition } from '../types';

interface WindowFrameProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (pos: WindowPosition) => void;
  children: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title,
  isOpen,
  isMaximized,
  zIndex,
  position,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus();
    if (isMaximized) return;

    const target = e.target as HTMLElement;
    if (!target.closest('.window-header')) return;

    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isMaximized) return;
    onMove({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const windowClasses = isMaximized
    ? "fixed inset-0 z-[100] bg-black"
    : "fixed rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden window-hardware-accel glass-panel";

  const style: React.CSSProperties = isMaximized ? { zIndex } : {
    zIndex,
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    width: window.innerWidth < 768 ? '100vw' : '1000px',
    height: window.innerWidth < 768 ? '100vh' : '700px',
    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s, scale 0.3s',
    opacity: isOpen ? 1 : 0,
    top: 0,
    left: 0,
  };

  return (
    <div 
      ref={windowRef}
      className={`${windowClasses} flex flex-col ${isDragging ? 'scale-[1.01] shadow-pink-500/10' : 'scale-100'}`}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="window-header h-16 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md border-b border-white/5 select-none touch-none shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full text-white/60"
          >
            <ChevronUp size={24} className="-rotate-90" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            </div>
            <span className="text-[13px] font-black text-white tracking-[0.3em] uppercase italic">{title}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={onMinimize} 
            className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all"
          >
            <Minus size={20} />
          </button>
          <button 
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center hover:bg-red-500/80 rounded-2xl text-white/60 hover:text-white transition-all group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar pointer-events-auto bg-black/20">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;
