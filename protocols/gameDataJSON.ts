export interface GameDataJSON {
  readonly participantCount: number;
  readonly cellCount: number;
  readonly cells: {
    readonly location: number;
    readonly title: string;
    readonly description: string;
  }[];
  readonly participants: {
    readonly name: string;
    readonly location: number;
    readonly number: number;
  }[];
}
