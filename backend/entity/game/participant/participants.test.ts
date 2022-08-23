import { GameParticipant } from "./gameParticipant.ts"
import { GameParticipants, Notifiable } from "./gameParticipants.ts"
import { assertEquals } from "assertion"

class FakeParticipant extends GameParticipant {
    constructor(
        name: string,
        readonly histories: string[] = []
    ) {
        super(name, undefined as any)
    }
    send = (message: string) => this.histories.push(message);
}

class Notification implements Notifiable {
    type = "test";
    constructor(
        public readonly message: string
    ) {}
}

const kurakke = new FakeParticipant('Kurakke');
const yoichi = new FakeParticipant('Yoichi');

Deno.test('通知のテスト', () => {
    const participants = new GameParticipants([yoichi, kurakke]);
    participants.notify(new Notification('Ya! Hello!'));
    assertEquals(
        JSON.stringify(yoichi.histories),
        JSON.stringify([JSON.stringify(new Notification('Ya! Hello!'))])
    )
})

Deno.test('参加のテスト', () => {
    const participants = new GameParticipants([yoichi])
    assertEquals(
        JSON.stringify(participants.joined(kurakke)),
        JSON.stringify(new GameParticipants([yoichi, kurakke]))
    )
})