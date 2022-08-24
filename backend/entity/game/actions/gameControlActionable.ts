import { GameControlEvent } from "~/routes/echo/game.ts";
import { GameParticipants } from "../participant/gameParticipants.ts";
import { rouletteAction } from "./rouletteAction.ts";
import { nameAction } from "./nameAction.ts";

export type GameControlActionable = (
  event: GameControlEvent,
  participants: GameParticipants,
  socket: WebSocket,
) => GameParticipants;

export const gameControlActions: Record<
  string,
  GameControlActionable | undefined
> = {
  "name": nameAction,
  "roulette": rouletteAction,
};
