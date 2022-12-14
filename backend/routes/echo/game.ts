import { HandlerContext, Handlers } from "$fresh/server.ts";
import { GameParticipants } from "~/entity/game/participant/gameParticipants.ts";
import { generateGameDataJSON } from "~/entity/game/data/generateGameDataJSON.ts";
import { gameControlActions } from "~/entity/game/actions/gameControlActionable.ts";
import { cellsData } from "~/entity/game/assets/data.ts";
import { BreakNotify } from "~/entity/game/notify/breakNotify.ts";

export interface GameControlEvent {
  type: "roulette" | "name";
  name: string;
}

let participants: GameParticipants = new GameParticipants();
let ranks: string[] = [];
let before = 0;

const reset = () => {
  participants = new GameParticipants();
  ranks = [];
  before = 0;
}

const onMessage = (e: MessageEvent<string>, socket: WebSocket) => {
  const event: GameControlEvent = JSON.parse(e.data);

  if (gameControlActions[event.type] === undefined) {
    console.error("Typeが間違っています", event);
    return;
  }

  const nextParticipants = gameControlActions[event.type]!(
    event,
    participants,
    socket,
  );
  ranks = ranks.concat(
    nextParticipants.newGoaledNames(participants, cellsData.length - 1),
  );
  before = participants.next;
  participants = nextParticipants;
  participants.sendGameData(generateGameDataJSON(participants, ranks, before));
  if (participants.isFinished()) {
    reset();
  }
};
const onClose = () => {
  participants.notify(new BreakNotify());
  reset();
};

export const handler: Handlers = {
  GET(req: Request, _ctx: HandlerContext) {
    let response, socket: WebSocket;
    try {
      ({ response, socket } = Deno.upgradeWebSocket(req));
    } catch {
      return new Response("request isn't trying to upgrade to websocket.");
    }
    socket.onmessage = (e) => onMessage(e, socket);
    socket.onerror = (e) => console.log("socket errored:", e);
    socket.onclose = () => onClose();
    return response;
  },
};
