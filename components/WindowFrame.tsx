
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2, GripVertical } from 'lucide-react';
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
    ? "fixed inset-0 z-[100]"
    : "fixed rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden window-hardware-accel";

  const style: React.CSSProperties = isMaximized ? { zIndex } : {
    zIndex,
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    width: window.innerWidth < 768 ? '95vw' : '900px',
    height: window.innerWidth < 768 ? '75vh' : '600px',
    transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s',
    opacity: isOpen ? 1 : 0,
  };

  return (
    <div 
      ref={windowRef}
      className={`${windowClasses} glass-dark flex flex-col ${isDragging ? 'scale-[1.005]' : 'scale-100'}`}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="window-header h-10 flex items-center justify-between px-4 bg-white/5 border-b border-white/5 select-none touch-none">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded bg-indigo-500/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">{title}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={onMinimize} 
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg text-white/50 transition-colors"
          >
            <Minus size={14} />
          </button>
          <button 
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={onMaximize} 
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg text-white/50 transition-colors"
          >
            <Maximize2 size={12} />
          </button>
          <button 
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center hover:bg-red-500/80 rounded-lg text-white/80 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar pointer-events-auto bg-slate-950/20">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;
