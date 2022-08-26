import { GameDataJSON } from "$protocols/gameDataJSON.ts";
import { GameParticipant } from "./gameParticipant.ts";
import { ParticipantData } from "$protocols/gameDataJSON.ts";
import { Dice } from "../dice/dice.ts";

export interface Notifiable {
  type: string;
}

export class GameParticipants {
  public constructor(
    private readonly participants: readonly GameParticipant[] = [],
    public readonly next: number = 0,
  ) {}
  public notify = (notification: Notifiable) => {
    const message = JSON.stringify(notification);
    this.participants.forEach((participant) => participant.send(message));
  };

  public sendGameData = (data: GameDataJSON): void => {
    this.participants.forEach((participant) =>
      participant.send(JSON.stringify(data))
    );
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

  public moved = (dice: Dice, maxCellCount: number): GameParticipants => {
    return new GameParticipants(
      this.participants.map((participant) => {
        if (!participant.isName(dice.name)) return participant;
        return participant.moved(dice, maxCellCount);
      }),
      this.nextNumber(maxCellCount),
    );
  };

  public isFinished = () => this.next === null;

  /** @return 全員がゴールしていた場合-1を返す */
  private nextNumber = (
    maxCellCount: number,
    candidate: number = this.nextCandidate(),
  ): number => {
    if (!this.participants[candidate].isGoaled(maxCellCount)) {
      return candidate;
    }
    if (candidate === this.next) {
      return -1;
    }
    return this.nextNumber(maxCellCount, this.nextCandidate(candidate));
  };

  private nextCandidate = (candidate: number = this.next) => {
    return candidate + 1 < this.count ? candidate + 1 : 0;
  };

  public data = (): ParticipantData[] => {
    return this.participants.map((participant, index) => {
      return participant.data(index);
    });
  };
  public newGoaledNames = (
    before: GameParticipants,
    maxCellCount: number,
  ): string[] => {
    return this.goaledNames(maxCellCount).filter(
      (name) => !before.goaledNames(maxCellCount).includes(name),
    );
  };

  private goaledNames = (maxCellCount: number) => {
    return this.participants
      .filter((participant) => participant.isGoaled(maxCellCount))
      .map((participant) => participant.name);
  };
}
