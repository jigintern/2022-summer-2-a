import { HandlerContext, Handlers } from "$fresh/server.ts";
import { GameParticipants } from "~/entity/game/participant/gameParticipants.ts";
import { generateGameDataJSON } from "~/entity/game/data/generateGameDataJSON.ts";
import { gameControlActions } from "../../entity/game/actions/gameControlActionable.ts";

export interface GameControlEvent {
  type: "roulette" | "name";
  name: string;
}

let participants: GameParticipants = new GameParticipants();

const onMessage = (e: MessageEvent<string>, socket: WebSocket) => {
  const event: GameControlEvent = JSON.parse(e.data);

  if (gameControlActions[event.type] === undefined) {
    console.error("Typeが間違っています", event);
    return;
  }

  participants = gameControlActions[event.type]!(event, participants, socket);
  participants.sendGameData(generateGameDataJSON(participants));
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
    return response;
  },
};
