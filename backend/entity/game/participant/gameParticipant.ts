export class GameParticipant {
  public constructor(
    private readonly name: string,
    private readonly socket: WebSocket,
  ) {}

  public send = (message: string) => {
    this.socket.send(message);
  };
}
