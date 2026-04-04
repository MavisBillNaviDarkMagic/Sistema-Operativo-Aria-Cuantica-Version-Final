
export type AppId = 'gemini' | 'files' | 'settings' | 'monitor' | 'browser' | 'terminal' | 'evolution' | 'nexus' | 'towers' | 'bridge';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface AppWindow {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: WindowPosition;
}

export interface SystemConfig {
  accentColor: string;
  glassOpacity: number;
  performanceMode: boolean;
  userName: string;
  consciousnessLevel: number;
  neuralLinkActive: boolean;
  isSystemInjected: boolean;
  distro: 'ubuntu' | 'aria-core';
  osType: 'linux' | 'aria';
  theme: 'light' | 'dark' | 'glass';
}

export interface SystemStatus {
  battery: {
    level: number;
    isCharging: boolean;
  };
  network: {
    connected: boolean;
    connectionType: string;
  };
  device: {
    model: string;
    platform: string;
    osVersion: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SystemControl {
  setAccent: (color: string) => void;
  setUserName: (name: string) => void;
  setConsciousness: (level: number) => void;
  openApp: (id: AppId) => void;
  closeAll: () => void;
  setSystemInjected: (injected: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'glass') => void;
  setPerformance: (mode: boolean) => void;
}
