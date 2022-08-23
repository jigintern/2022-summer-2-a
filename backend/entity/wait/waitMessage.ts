export interface WaitMessage {
  type: "name" | "start";
}

export interface NameMessage extends WaitMessage {
  type: "name";
  name: string;
}

export interface StartMessage extends WaitMessage {
  type: "start";
}
