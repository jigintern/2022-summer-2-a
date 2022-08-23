import { Handlers } from "$fresh/server.ts";

interface Data {
    results: string[];
    query: string;
}

interface WaitMessage {
    type: 'name' | 'start'
}

interface NameMessage extends WaitMessage {
    type: "name"
    name: string
}

interface StartMessage extends WaitMessage {
    type: "start"
}

class Participant {
    public constructor(
        public readonly name: string,
        private readonly socket: WebSocket
    ) {}

    public start = () => this.socket.send("start")
}

class Participants {
    public constructor(
        private readonly participants: readonly Participant[] = []
    ) {}

    public start = () => {
        this.participants.forEach(participant => participant.start());
    }

    public joined = (joiner: Participant): Participants => {
        return new Participants(this.participants.concat([joiner]));
    }

    public clear = () => new Participants();
}

let participants: Participants = new Participants();

const onMessage = (socket: WebSocket, e: MessageEvent<WaitMessage>) => {
    const message = e.data;
    switch (message.type) {
        case "name":
            const name = (message as NameMessage).name;
            const participant = new Participant(name, socket);
            participants = participants.joined(participant);
            break;
        case "start":
            participants.start();
            participants = participants.clear();
            break;
        default:
            socket.send("error bad request")
    }
}

export const handler: Handlers<Data> = {
    GET(req, ctx) {
        // const upgrade = req.headers.get("upgrade") || "";
        let response, socket: WebSocket;
        try {
            ({ response, socket } = Deno.upgradeWebSocket(req));
        } catch {
            return new Response("request isn't trying to upgrade to websocket.");
        }
        socket.onmessage = (e) => onMessage(socket, e);
        socket.onerror = (e) => console.log("socket errored:", e);
        socket.onclose = () => console.log("socket closed");
        return response;
    },
};
