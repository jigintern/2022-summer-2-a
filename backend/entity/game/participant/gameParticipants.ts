import { GameParticipant } from "./gameParticipant.ts";
import { ParticipantData } from "$protocols/gameDataJSON.ts";

export interface Notifiable {
  type: string;
}

export class GameParticipants {
  public constructor(
    private readonly participants: readonly GameParticipant[] = [],
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

  public data = (): ParticipantData[] => {
    return this.participants.map((participant, index) => {
      return participant.data(index);
    });
  };
}
