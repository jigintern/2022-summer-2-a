import {GameData} from "@/models/game/data/gameData";
import {ParticipantCount} from "@/models/game/data/participantCount";
import {GameParticipant} from "@/models/game/data/gameParticipant";
import {CellCount} from "@/models/game/data/cellCount";
import { cellsData } from "../../../../../backend/entity/game/assets/data.ts"

export const mockGameData = new GameData(
    new ParticipantCount(4),
    new CellCount(cellsData.length),
    cellsData,
    [
        new GameParticipant("ryu",new Location(1),1),
        new GameParticipant("yoichi",new Location(2),2),
        new GameParticipant("kurakke",new Location(3),3),
        new GameParticipant("kei",new Location(4),4),
    ]
)