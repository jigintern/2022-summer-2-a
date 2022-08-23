import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Dice } from "~/entity/game/dice/dice.ts";
import { GameParticipant } from "~/entity/game/participant/gameParticipant.ts";
import { GameParticipants } from "~/entity/game/participant/gameParticipants.ts";
interface Roulette {
  type: "roulette";
  name: string;
}

let participants: GameParticipants = new GameParticipants();

const onMessage = (e: MessageEvent<string>, socket: WebSocket) => {
  const data: Roulette = JSON.parse(e.data);
  if (data.type === "roulette") {
    const dice = Dice.genarate(data.name);
    participants.notify(dice.notification());
    return;
  }
  if (data.type === "join") {
    const participant = new GameParticipant(data.name, socket);
    participants = participants.joined(participant);
    return;
  }
  console.error("Typeが間違っています");
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
