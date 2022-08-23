import { WaitParticipant } from "./waitParticipant.ts";
import { assert } from "assertion";

const generateFakeSocket = (): WebSocket => Symbol("") as any;

Deno.test("等価テスト", () => {
  const socket = generateFakeSocket();
  const participant = new WaitParticipant("Yoichi", socket);
  assert(participant.isSameSocket(socket));
});

Deno.test("非等価テスト", () => {
  const participant = new WaitParticipant("Yoichi", generateFakeSocket());
  assert(!participant.isSameSocket(generateFakeSocket()));
});
