import { GameControlActionable } from "./gameControlActionable.ts";
import { GameParticipant } from "../participant/gameParticipant.ts";

export const nameAction: GameControlActionable = (
  event,
  participants,
  socket,
) => {
  const participant = new GameParticipant(event.name, socket);
  return participants.joined(participant);
};
