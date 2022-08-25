import { GameControlActionable } from "./gameControlActionable.ts";
import { Dice } from "../dice/dice.ts";
import { cellsData } from "../assets/data.ts";

export const rouletteAction: GameControlActionable = (event, participants) => {
  if (!participants.isNext(event.name)) {
    console.error("関係ない人がルーレット回した！！");
    return participants;
  }
  const dice = Dice.generate(event.name);
  participants.notify(dice.notification());
  return participants.moved(dice, cellsData.length - 1);
};
