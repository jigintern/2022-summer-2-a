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

const yoichSocket= new FakeSocket();
const yoichi = new WaitParticipant("Yoichi", yoichSocket as any);
const ryuSocket = new FakeSocket();
const ryu = new WaitParticipant("Ryu", ryuSocket as any);

Deno.test("追加のテスト", () => {
  const participants = new WaitParticipants([yoichi]);
  assertEquals(
    JSON.stringify(participants.joined(ryu)),
    JSON.stringify(new WaitParticipants([yoichi, ryu])),
  );
});

Deno.test("clearのテスト", () => {
  const participants = new WaitParticipants([yoichi]);
  assertEquals(
      JSON.stringify(participants.clear()),
      JSON.stringify(new WaitParticipants())
  )
})

Deno.test("脱退のテスト", () => {
  const participants = new WaitParticipants([yoichi, ryu]);
  assertEquals(
      JSON.stringify(participants.disconnected(yoichSocket as any)),
      JSON.stringify(new WaitParticipants([ryu]))
  )
})

Deno.test("開始のテスト", () => {
  const participants = new WaitParticipants([yoichi, ryu]);
  participants.start();
  assertEquals(
      JSON.stringify(yoichSocket.sendHistories),
      JSON.stringify(["start"])
  )
  assertEquals(
      JSON.stringify(ryuSocket.sendHistories),
      JSON.stringify(["start"])
  )
})
