import { io, Socket as SocketIo } from "socket.io-client";
import { rootUrl } from "../api";

class Socket {
  private URL = rootUrl;
  private socket: SocketIo | null = null;
  private inited = false;

  private status: "connected" | "disconnected" = "disconnected";

  init() {
    if (this.inited) return false;

    this.socket = io(this.URL, { transports: ["websocket"] });
    this.inited = true;

    this.socket.on("connect", () => {
      this.status = "connected";
    });

    this.socket.on("disconnect", () => {
      this.status = "disconnected";
    });
  }

  subscribeToEvent(event: string, callback: (data: any) => void) {
    return this.socket?.on(event, callback);
  }

  getInstance(): SocketIo | null {
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
