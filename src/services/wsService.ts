import { WSTransport, WSTransportEvents } from "../core/websocketTransport.ts";

class WSService {
  private static instance: WSService;
  private transport: WSTransport | null = null;
  private currentUrl: string | null = null;

  private constructor() {}

  public static getInstance(): WSService {
    if (!WSService.instance) {
      WSService.instance = new WSService();
    }
    return WSService.instance;
  }

  public async connect(url: string) {
    if (
      this.currentUrl === url &&
      this.transport?.socket?.readyState === WebSocket.OPEN
    ) {
      console.log("WebSocket already connected to", url);
      return;
    }

    await this.close();

    return new Promise<void>((resolve, reject) => {
      this.currentUrl = url;
      this.transport = new WSTransport(url);

      const onConnected = () => {
        this.transport?.off(WSTransportEvents.ERROR, onError);
        this.transport?.getOld();
        resolve();
      };

      const onError = (error: unknown) => {
        const err = error as Error;
        reject(err);
        reject(error);
      };

      this.transport.on(WSTransportEvents.CONNECTED, onConnected);
      this.transport.on(WSTransportEvents.ERROR, onError);

      this.transport.connect();
    });
  }

  public send(message: unknown) {
    if (this.transport?.socket?.readyState === WebSocket.OPEN) {
      this.transport.send(message);
    } else {
      console.error("WebSocket is not connected");
    }
  }

  public on(event: WSTransportEvents, callback: (...args: unknown[]) => void) {
    this.transport?.on(event, callback);
  }

  public off(event: WSTransportEvents, callback: (...args: unknown[]) => void) {
    this.transport?.off(event, callback);
  }

  public async close() {
    if (this.transport) {
      this.transport.close();
      this.transport = null;
    }
    this.currentUrl = null;
  }

  public isConnected(): boolean {
    return this.transport?.socket?.readyState === WebSocket.OPEN;
  }
}

export const wsService = WSService.getInstance();
