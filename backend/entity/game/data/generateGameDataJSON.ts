import { GameDataJSON } from "$protocols/gameDataJSON.ts";
import { GameParticipants } from "../participant/gameParticipants.ts";
import { cellsData } from "~/entity/game/assets/data.ts";

export function generateGameDataJSON(
  participants: GameParticipants,
): GameDataJSON {
  return {
    participantCount: participants.count,
    cellCount: cellsData.length,
    cells: cellsData,
    participants: participants.data(),
    next: participants.next,
  };
}
