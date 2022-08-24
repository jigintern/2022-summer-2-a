import { GameParticipant } from "./gameParticipant.ts";
import { GameParticipants, Notifiable } from "./gameParticipants.ts";
import { assertEquals } from "assertion";
import { Dice } from "../dice/dice.ts";

class FakeParticipant extends GameParticipant {
  constructor(
    name: string,
    location: number = 0,
    readonly histories: string[] = [],
  ) {
    super(name, undefined as any, location);
  }
  send = (message: string) => this.histories.push(message);
}

class Notification implements Notifiable {
  type = "test";
  constructor(
    public readonly message: string,
  ) {}
}

const kurakke = new FakeParticipant("Kurakke");
const yoichi = new FakeParticipant("Yoichi");

Deno.test("通知のテスト", () => {
  const participants = new GameParticipants([yoichi, kurakke]);
  participants.notify(new Notification("Ya! Hello!"));
  assertEquals(
    JSON.stringify(yoichi.histories),
    JSON.stringify([JSON.stringify(new Notification("Ya! Hello!"))]),
  );
});

Deno.test("参加のテスト", () => {
  const participants = new GameParticipants([yoichi]);
  assertEquals(
    JSON.stringify(participants.joined(kurakke)),
    JSON.stringify(new GameParticipants([yoichi, kurakke])),
  );
});

Deno.test("次のターンの名前かどうかの識別テスト", () => {
  const participants = new GameParticipants([yoichi, kurakke], 1);
  assertEquals(participants.isNext("Kurakke"), true);
});

Deno.test("参加者の人数のテスト", () => {
  const participants = new GameParticipants([yoichi, kurakke], 1);
  assertEquals(participants.count, 2);
});

Deno.test("移動のテスト", () => {
  const yoichi = new GameParticipant("Yoichi", undefined as any);
  const kurakke = new GameParticipant("Kurakke", undefined as any);

  let participants = new GameParticipants([yoichi, kurakke]);

  participants = participants.moved(new Dice("Yoichi", 6));

  assertEquals(
    JSON.stringify(participants),
    JSON.stringify(
      new GameParticipants([
        new GameParticipant("Yoichi", undefined as any, 6),
        kurakke,
      ], 1),
    ),
  );

  participants = participants.moved(new Dice("Kurakke", 1));

  assertEquals(
    JSON.stringify(participants),
    JSON.stringify(
      new GameParticipants([
        new GameParticipant("Yoichi", undefined as any, 6),
        new GameParticipant("Kurakke", undefined as any, 1),
      ], 0),
    ),
  );
});
