import { WaitParticipant } from "./waitParticipant.ts";

export class WaitParticipants {
  public constructor(
    private readonly participants: readonly WaitParticipant[] = [],
  ) {}

  public start = () => {
    this.participants.forEach((participant) => participant.start());
  };

  public joined = (joiner: WaitParticipant): WaitParticipants => {
    return new WaitParticipants(this.participants.concat([joiner]));
  };

  public clear = () => new WaitParticipants();

  public disconnected = (socket: WebSocket): WaitParticipants => {
    return new WaitParticipants(
      this.participants.filter((participant) =>
        !participant.isSameSocket(socket)
      ),
    );
  };
}
