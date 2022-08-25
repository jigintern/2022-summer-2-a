import { ParticipantCount } from "@/models/game/data/participantCount";
import { CellCount } from "@/models/game/data/cellCount";
import { Cell } from "@/models/game/data/cell";
import { GameParticipant } from "@/models/game/data/gameParticipant";

export class GameData {
  public constructor(
    public readonly participantCount: ParticipantCount,
    public cellCount: CellCount,
    public cells: Cell[],
    public participants: GameParticipant[],
    public next: number
  ) {}
  public nextName = () => {
    return this.participants[this.next].name;
  };
}
