import { ParticipantData } from "$protocols/gameDataJSON.ts";

export class GameParticipant {
  public constructor(
    private readonly name: string,
    private readonly socket: WebSocket,
  ) {}

  public send = (message: string) => {
    this.socket.send(message);
  };

  public data = (index: number): ParticipantData => {
    return {
      name: this.name,
      location: Math.floor(Math.random() * 18),
      number: index,
    };
  };
}
