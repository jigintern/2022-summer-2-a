import { Location } from "@/models/game/data/location";

export class GameParticipant {
  public constructor(
    public readonly name: string,
    public readonly location: Location,
    public readonly number: number
  ) {}

  public isLocated = (location: Location): boolean => {
    return this.location.is(location);
  };
}
