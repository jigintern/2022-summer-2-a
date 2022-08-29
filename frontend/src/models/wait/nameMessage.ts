import { Socket } from "@/connect/socket"

export class NameMessage {
  private readonly type = "name";

  public constructor(private readonly name: string) {}

  public send = async (socket: Socket): Promise<void> => {
    await socket.send(this);
  };
}
