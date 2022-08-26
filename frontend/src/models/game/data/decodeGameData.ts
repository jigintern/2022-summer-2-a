import { ParticipantCount } from "@/models/game/data/participantCount";
import { CellCount } from "@/models/game/data/cellCount";
import { Cell } from "@/models/game/data/cell";
import { Location } from "@/models/game/data/location";
import { GameParticipant } from "@/models/game/data/gameParticipant";
import { GameData } from "@/models/game/data/gameData";
import { GameDataJSON } from "$protocols/gameDataJSON";

export function decodeGameData(json: string): GameData {
  const content: GameDataJSON = JSON.parse(json)
  return new GameData(
    new ParticipantCount(content.participantCount),
    new CellCount(content.cellCount),
    content.cells.map(({ location, title, description }) => {
      return new Cell(title, new Location(location), description);
    }),
    content.participants.map(({ name, location, number }) => {
      return new GameParticipant(name, new Location(location), number);
    }),
    content.next,
      content.before,
      content.ranks,
  );
}
