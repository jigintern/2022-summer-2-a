import { Dice } from "./dice.ts"
import { assertEquals } from "assertion"

Deno.test("Notificationオブジェクトのテスト", () => {
    const dice = new Dice("Taro", 6);
    const notification = dice.notification();
    assertEquals(notification.name, "Taro");
    assertEquals(notification.number, 6);
    assertEquals(notification.type, "roulette");
})