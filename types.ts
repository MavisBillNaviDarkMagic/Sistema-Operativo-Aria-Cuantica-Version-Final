
export type AppId = 'gemini' | 'files' | 'settings' | 'monitor' | 'browser' | 'terminal' | 'evolution' | 'nexus';

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
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
