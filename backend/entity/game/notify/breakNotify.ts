import { Notifiable } from "../participant/gameParticipants.ts";

export class BreakNotify implements Notifiable {
  public readonly type = "break";
}
