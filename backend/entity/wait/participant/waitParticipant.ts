export class WaitParticipant {
  public constructor(
    public readonly name: string,
    private readonly socket: WebSocket,
  ) {}

  public start = () => this.socket.send("start");

  public isSameSocket = (socket: WebSocket) => this.socket === socket;
}
