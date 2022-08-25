import { ParticipantData } from "$protocols/gameDataJSON.ts";
import { Dice } from "../dice/dice.ts";

export class GameParticipant {
  public constructor(
    private readonly name: string,
    private readonly socket: WebSocket,
    private readonly location: number = 0,
  ) {}

  public send = (message: string) => {
    if(! this.isSendable()) return
    this.socket.send(message);
  };

  private isSendable = () => this.socket.readyState === 1



  public isName = (name: string) => {
    return this.name === name;
  };

  public moved = (dice: Dice): GameParticipant => {
    return new GameParticipant(
      this.name,
      this.socket,
      this.location + dice.number,
    );
  };

  public data = (index: number): ParticipantData => {
    return {
      name: this.name,
      location: this.location,
      number: index,
    };
  };
}
