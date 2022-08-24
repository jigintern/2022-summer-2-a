export interface GameDataJSON {
  readonly participantCount: number;
  readonly cellCount: number;
  readonly cells: CellData[];
  readonly participants: {
    readonly name: string;
    readonly location: number;
    readonly number: number;
  }[];
}

export interface CellData {
  readonly location: number;
  readonly title: string;
  readonly description: string;
  readonly rest: boolean;
  readonly forward: number;
}
