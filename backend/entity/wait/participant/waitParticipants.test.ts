import { WaitParticipants } from "./waitParticipants.ts";
import { WaitParticipant } from "./waitParticipant.ts";
import { assertEquals } from "assertion";

class FakeSocket {
  public constructor(
    public readonly sendHistories: string[] = [],
  ) {}

  public send = (message: string): void => {
    this.sendHistories.push(message);
  };
}

Deno.test("追加のテスト", () => {
  const socket: WebSocket = undefined as any;
  const yoichi = new WaitParticipant("Yoichi", socket);
  const ryu = new WaitParticipant("Ryu", socket);

  const participants = new WaitParticipants([yoichi]);
  assertEquals(
    JSON.stringify(participants.joined(ryu)),
    JSON.stringify(new WaitParticipants([yoichi, ryu])),
  );
});
