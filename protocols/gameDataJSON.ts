export interface GameDataJSON {
  readonly participantCount: number;
  readonly cellCount: number;
  readonly cells: CellData[];
  readonly participants: ParticipantData[];
  readonly next: number;
  readonly rank: string[];
}

export interface CellData {
  readonly location: number;
  readonly title: string;
  readonly description: string;
  readonly rest: boolean;
  readonly forward: number;
}

export interface ParticipantData {
  readonly name: string;
  readonly location: number;
  readonly number: number;
}
