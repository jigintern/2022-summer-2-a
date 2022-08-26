import { GameParticipant } from "./gameParticipant.ts";
import { assertEquals } from "assertion";
import { Dice } from "../dice/dice.ts";

Deno.test("isNameのテスト", () => {
  const participant = new GameParticipant("tanaka", undefined as any);
  assertEquals(participant.isName("tanaka"), true);
  assertEquals(participant.isName("Tanaka"), false);
});

Deno.test("JSONデータのテスト", () => {
  const participant = new GameParticipant("Yamamoto", undefined as any, 19);
  assertEquals(
    JSON.stringify(participant.data(3)),
    JSON.stringify({
      name: "Yamamoto",
      location: 19,
      number: 3,
    }),
  );
});

Deno.test("移動のテスト", () => {
  const participant = new GameParticipant("Yamamoto", undefined as any, 19);
  const dice = new Dice("Yamamoto", 3);
  assertEquals(
    JSON.stringify(participant.moved(dice, 30)),
    JSON.stringify(new GameParticipant("Yamamoto", undefined as any, 22)),
  );
});

Deno.test("ゴールした時のテスト", () => {
  const participant = new GameParticipant("Yamamoto", undefined as any, 19);
  const dice = new Dice("Yamamoto", 3);
  assertEquals(
    JSON.stringify(participant.moved(dice, 20)),
    JSON.stringify(new GameParticipant("Yamamoto", undefined as any, 20)),
  );
});

Deno.test("ゴールしていないときのテスト", () => {
  const participant = new GameParticipant("Yamamoto", undefined as any, 19);
  assertEquals(
    participant.isGoaled(20),
    false,
  );
});
Deno.test("ゴールぴったりのときのテスト", () => {
  const participant = new GameParticipant("Yamamoto", undefined as any, 19);
  assertEquals(
    participant.isGoaled(19),
    true,
  );
});
Deno.test("ゴールをオーバーしているときのテスト", () => {
  const participant = new GameParticipant("Yamamoto", undefined as any, 19);
  assertEquals(
    participant.isGoaled(18),
    true,
  );
});
