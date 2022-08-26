import { ParticipantCount } from "@/models/game/data/participantCount";
import { CellCount } from "@/models/game/data/cellCount";
import { Cell } from "@/models/game/data/cell";
import { GameParticipant } from "@/models/game/data/gameParticipant";
import { Location } from "@/models/game/data/location";

export class GameData {
  public constructor(
    public readonly participantCount: ParticipantCount,
    public readonly cellCount: CellCount,
    public readonly cells: Cell[],
    public readonly participants: GameParticipant[],
    public readonly next: number,
    public readonly before: number = 0,
    public readonly ranks: readonly string[],
  ) {}
  public nextName = ():string | null => {
    if (this.next === -1) return null;
    return this.participants[this.next].name;
  };

  public hereParticipants = (location: Location): GameParticipant[] => {
    return this.participants.filter((participant) => {
      return participant.isLocated(location);
    });
  };

  public equals = (compared: GameData): boolean => {
    return JSON.stringify(this) === JSON.stringify(compared);
  }
}
