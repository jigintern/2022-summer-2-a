import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Dice } from "~/entity/game/dice/dice.ts";
import { GameParticipant } from "~/entity/game/participant/gameParticipant.ts";
import { GameParticipants } from "~/entity/game/participant/gameParticipants.ts";
import { GameDataJSON } from "$protocols/gameDataJSON.ts";
import { cellsData } from "~/entity/game/assets/data.ts";

interface User {
  type: "roulette" | "name" | "data";
  name: string;
}

let participants: GameParticipants = new GameParticipants();

const onMessageAction = (e: MessageEvent<string>, socket: WebSocket) => {
  const data: User = JSON.parse(e.data);
  if (data.type === "roulette") {
    const dice = Dice.generate(data.name);
    participants.notify(dice.notification());
    return;
  }
  if (data.type === "name") {
    const participant = new GameParticipant(data.name, socket);
    participants = participants.joined(participant);
    return;
  }
  console.error("Typeが間違っています");
};

const gameDataJSON = (): GameDataJSON => {
  return {
    participantCount: participants.count,
    cellCount: cellsData.length,
    cells: cellsData,
    participants: participants.data(),
  };
};

const onMessage = (e: MessageEvent<string>, socket: WebSocket) => {
  onMessageAction(e, socket);
  //データ送信操作
  socket.send(JSON.stringify(gameDataJSON()));
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
