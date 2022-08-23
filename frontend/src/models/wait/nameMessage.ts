export class NameMessage {
  private readonly type = "name";

  public constructor(private readonly name: string) {}

  public send = (socket: WebSocket): void => {
    socket.send(JSON.stringify(this));
  };
}
