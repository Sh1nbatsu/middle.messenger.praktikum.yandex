import EventBus from "./EventBus";

export enum WSTransportEvents {
  MESSAGE = "message",
  ERROR = "error",
  CONNECTED = "connected",
  CLOSED = "closed",
}

export class WSTransport {
  socket: WebSocket | null = null;
  private eventBus: EventBus;

  constructor(private url: string) {
    this.eventBus = new EventBus();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener("open", () => {
      this.eventBus.emit(WSTransportEvents.CONNECTED);
    });

    this.socket.addEventListener("message", (event) => {
      console.log(event.data, "socket message");
      try {
        const data = JSON.parse(event.data);
        this.eventBus.emit(WSTransportEvents.MESSAGE, data);
      } catch (e) {
        this.eventBus.emit(WSTransportEvents.ERROR, e);
      }
    });

    this.socket.addEventListener("close", () => {
      this.eventBus.emit(WSTransportEvents.CLOSED);
    });

    this.socket.addEventListener("error", (e) => {
      this.eventBus.emit(WSTransportEvents.ERROR, e);
    });
  }

  send(message: unknown) {
    console.log(message);
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content: message, type: "message" }));
    }
  }

  getOld() {
    console.log("getting old");
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    }
  }

  on(event: WSTransportEvents, callback: (...args: unknown[]) => void) {
    this.eventBus.on(event, callback);
  }

  off(event: WSTransportEvents, callback: (...args: unknown[]) => void) {
    this.eventBus.off(event, callback);
  }

  close() {
    this.socket?.close();
  }
}
