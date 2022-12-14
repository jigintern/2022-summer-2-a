import { GameData } from "@/models/game/data/gameData";
import { ParticipantCount } from "@/models/game/data/participantCount";
import { GameParticipant } from "@/models/game/data/gameParticipant";
import { CellCount } from "@/models/game/data/cellCount";
import { cellsData } from "@/models/game/mock/cellsData"
import { Location } from "@/models/game/data/location";
import { Cell } from "@/models/game/data/cell"
export const mockGameData = new GameData(
  new ParticipantCount(4),
  new CellCount(cellsData.length),
    cellsData.map(({ location, title, description }) => {
        return new Cell(title, new Location(location), description);
    }),
  [
    new GameParticipant("ryu", new Location(1), 0),
    new GameParticipant("yoichi", new Location(2), 1),
    new GameParticipant("kurakke", new Location(3), 2),
    new GameParticipant("kei", new Location(4), 3),
  ],
  0,
  0,
  []
);
