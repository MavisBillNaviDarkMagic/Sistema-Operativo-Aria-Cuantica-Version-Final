
export type TermuxCommand = {
  command: string;
  args: string[];
};

export type TermuxResponse = {
  output: string;
  error?: string;
};

class TermuxBridge {
  private socket: WebSocket | null = null;
  private onOutputCallback: ((output: string) => void) | null = null;

  connect(url: string) {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(url);
        
        this.socket.onopen = () => {
          console.log('Connected to Termux Bridge');
          resolve(true);
        };

        this.socket.onmessage = (event) => {
          if (this.onOutputCallback) {
            this.onOutputCallback(event.data);
          }
        };

        this.socket.onerror = (error) => {
          console.error('Termux Bridge Error:', error);
          reject(error);
        };

        this.socket.onclose = () => {
          console.log('Termux Bridge Disconnected');
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(command: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(command);
      return true;
    }
    return false;
  }

  onOutput(callback: (output: string) => void) {
    this.onOutputCallback = callback;
  }

  isConnected() {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

export const termuxBridge = new TermuxBridge();
