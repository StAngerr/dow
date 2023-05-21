import { io, Socket as SocketIo } from "socket.io-client";

class Socket {
  private URL = "http://localhost:3001";
  private socket: SocketIo | null = null;

  private status: "connected" | "disconnected" = "disconnected";

  init() {
    this.socket = io(this.URL, { transports: ["websocket"] });

    this.socket.on("connect", () => {
      this.status = "connected";
    });

    this.socket.on("disconnect", () => {
      this.status = "disconnected";
    });
  }

  subscribeToEvent(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  getInstanse(): SocketIo | null {
    return this.socket;
  }

  public getStatus() {
    return this.status;
  }

  public sendMessage(eventName = "client-message", message: string = "") {
    this.socket?.emit(eventName, message);
  }
}

export default new Socket();
