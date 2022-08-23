import { Notifiable } from "~/entity/game/participant/gameParticipants.ts";

interface DiceNotification extends Notifiable {
  type: "roulette";
  name: string;
  number: number;
}

export class Dice {
  public constructor(
    private readonly name: string,
    private readonly number: number,
  ) {}

  public static generate = (name: string): Dice => {
    const min = 1;
    const max = 6;
    return new Dice(name, Math.floor(Math.random() * (max - min) + min));
  };

  public notification = (): DiceNotification => {
    return {
      type: "roulette",
      name: this.name,
      number: this.number,
    };
  };
}
