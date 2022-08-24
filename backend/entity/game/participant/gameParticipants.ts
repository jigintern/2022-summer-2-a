import { GameParticipant } from "./gameParticipant.ts";
import { ParticipantData } from "$protocols/gameDataJSON.ts";
import { Dice } from "../dice/dice.ts";

export interface Notifiable {
  type: string;
}

export class GameParticipants {
  public constructor(
    private readonly participants: readonly GameParticipant[] = [],
    private readonly next: number = 0,
  ) {}
  public notify = (notification: Notifiable) => {
    const message = JSON.stringify(notification);
    this.participants.forEach((participant) => participant.send(message));
  };

  public joined = (participant: GameParticipant): GameParticipants => {
    return new GameParticipants([...this.participants, participant]);
  };

  public get count() {
    return this.participants.length;
  }

  public isNext = (name: string): boolean => {
    return this.participants[this.next].isName(name);
  };

  public moved = (name: string, dice: Dice): GameParticipants => {
    return new GameParticipants(
      this.participants.map((participant) => {
        if (!participant.isName(name)) return participant;
        return participant.moved(dice);
      }),
      this.nextNumber(),
    );
  };

  private nextNumber = (): number => {
    if (this.next + 1 < this.count) return this.next + 1;
    return 0;
  };

  public data = (): ParticipantData[] => {
    return this.participants.map((participant, index) => {
      return participant.data(index);
    });
  };
}
