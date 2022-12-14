import { describe, expect, test } from "vitest";
import { GameData } from "@/models/game/data/gameData";
import { ParticipantCount } from "@/models/game/data/participantCount";
import { CellCount } from "@/models/game/data/cellCount";
import { Cell } from "@/models/game/data/cell";
import { Location } from "@/models/game/data/location";
import { GameParticipant } from "@/models/game/data/gameParticipant";

const data1 = new GameData(
  new ParticipantCount(2),
  new CellCount(5),
  [
    new Cell("aaa", new Location(0), "bbbb"),
    new Cell("ccc", new Location(1), "cccc"),
    new Cell("ddd", new Location(2), "dddd"),
    new Cell("eee", new Location(3), "ffff"),
    new Cell("ggg", new Location(4), "zzzz"),
  ],
  [
    new GameParticipant("kurakke", new Location(0), 0),
    new GameParticipant("yoichi", new Location(0), 1),
  ],
  0,
  0,
  []
);

const data2 = new GameData(
  new ParticipantCount(2),
  new CellCount(5),
  [
    new Cell("aaa", new Location(0), "bbbb"),
    new Cell("ccc", new Location(1), "cccc"),
    new Cell("ddd", new Location(2), "dddd"),
    new Cell("eee", new Location(3), "ffff"),
    new Cell("ggg", new Location(4), "zzzz"),
  ],
  [
    new GameParticipant("kurakke", new Location(0), 0),
    new GameParticipant("yoichi", new Location(1), 1),
  ],
  1,
  0,
  []
);
describe("gamedataのテスト", () => {
  test("次の人の名前のテスト", () => {
    expect(data1.nextName()).toBe("kurakke");
  });
  test("二番目の人のテスト", () => {
    expect(data2.nextName()).toBe("yoichi");
  });

  test("data1の0番地の人たちのテスト", () => {
    expect(JSON.stringify(data1.hereParticipants(new Location(0)))).toBe(
      JSON.stringify([
        new GameParticipant("kurakke", new Location(0), 0),
        new GameParticipant("yoichi", new Location(0), 1),
      ])
    );
  });
  test("data1の1番地の人たちのテスト", () => {
    expect(data1.hereParticipants(new Location(1))).toStrictEqual([]);
  });
});
