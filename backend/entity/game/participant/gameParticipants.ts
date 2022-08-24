import { GameParticipant } from "./gameParticipant.ts";

export interface Notifiable {
  type: string;
}

export class GameParticipants {
  public constructor(
    private readonly participants: GameParticipant[] = [],
  ) {}
  public notify = (notification: Notifiable) => {
    const message = JSON.stringify(notification);
    this.participants.forEach((participant) => participant.send(message));
  };

  public joined = (participant: GameParticipant): GameParticipants => {
    return new GameParticipants([...this.participants, participant]);
  };
}
