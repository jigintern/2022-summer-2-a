import { HandlerContext, Handlers } from "$fresh/server.ts";

interface Roulette {
  type: "roulette";
  name: string;
}

interface RouletteResult extends Roulette {
  number: number;
}

let participants: WebSocket[] = [];

const genRandom = (): number => {
  const min = Math.ceil(1);
  const max = Math.floor(6);
  return Math.floor(Math.random() * (max - min) + min);
};

const onMessage = (e: MessageEvent<string>) => {
  const data: Roulette = JSON.parse(e.data);
  if (data.type === "roulette") {
    const result: RouletteResult = {
      type: data.type,
      name: data.name,
      number: genRandom(),
    };
    participants.forEach((socket) => socket.send(JSON.stringify(result)));
    return;
  }
  console.error("Typeが間違っています");
};

const disconnect = (exiter: WebSocket) => {
  participants = participants.filter((socket) => socket !== exiter);
};

const onOpen = (socket: WebSocket) => {
  participants.push(socket);
};

export const handler: Handlers = {
  GET(req: Request, _ctx: HandlerContext) {
    let response, socket: WebSocket;
    try {
      ({ response, socket } = Deno.upgradeWebSocket(req));
    } catch {
      return new Response("request isn't trying to upgrade to websocket.");
    }
    socket.onmessage = (e) => onMessage(e);
    socket.onerror = (e) => console.log("socket errored:", e);
    socket.onclose = () => disconnect(socket);
    socket.onopen = () => onOpen(socket);
    return response;
  },
};
