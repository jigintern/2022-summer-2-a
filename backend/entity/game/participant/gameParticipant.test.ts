import { GameParticipant } from "./gameParticipant.ts"
import { assertEquals } from "assertion"
import { Dice } from "../dice/dice.ts"

Deno.test('isNameのテスト', () => {
    const participant = new GameParticipant('tanaka', undefined as any);
    assertEquals(participant.isName('tanaka'), true);
    assertEquals(participant.isName('Tanaka'), false);
})

Deno.test('JSONデータのテスト', () => {
    const participant = new GameParticipant('Yamamoto', undefined as any, 19);
    assertEquals(
        JSON.stringify(participant.data(3)),
        JSON.stringify({
            name: 'Yamamoto',
            location: 19,
            number: 3,
        })
    )
})

Deno.test('移動のテスト', () => {
    const participant = new GameParticipant('Yamamoto', undefined as any, 19);
    const dice = new Dice('Yamamoto', 3);
    assertEquals(
        JSON.stringify(participant.moved(dice)),
        JSON.stringify(new GameParticipant('Yamamoto', undefined as any, 22))
    )
})