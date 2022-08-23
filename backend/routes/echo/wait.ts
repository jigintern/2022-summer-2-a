import { HandlerContext, Handlers } from "$fresh/server.ts";
import { NameMessage, WaitMessage } from "~/entity/wait/waitMessage.ts";
import { WaitParticipant } from "~/entity/wait/participant/waitParticipant.ts";
import { WaitParticipants } from "~/entity/wait/participant/waitParticipants.ts";

let participants: WaitParticipants = new WaitParticipants();

const onMessage = (socket: WebSocket, e: MessageEvent<WaitMessage>) => {
  const message = e.data;
  switch (message.type) {
    case "name":
      const name = (message as NameMessage).name;
      const participant = new WaitParticipant(name, socket);
      participants = participants.joined(participant);
      break;
    case "start":
      participants.start();
      participants = participants.clear();
      break;
    default:
      socket.send("error bad request");
  }
};

export const handler: Handlers = {
  GET(req: Request, _ctx: HandlerContext) {
    let response, socket: WebSocket;
    try {
      ({ response, socket } = Deno.upgradeWebSocket(req));
    } catch {
      return new Response("request isn't trying to upgrade to websocket.");
    }
    socket.onmessage = (e) => onMessage(socket, e);
    socket.onerror = (e) => console.log("socket errored:", e);
    socket.onclose = () => participants = participants.disconnected(socket);
    return response;
  },
};
