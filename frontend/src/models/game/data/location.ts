export class Location {
  public constructor(public readonly location: number) {}

  public is = (compared: Location): boolean => {
    return this.location === compared.location;
  };
}
