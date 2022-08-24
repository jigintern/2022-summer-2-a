import {Location} from "@/models/game/data/location";

export class Cell{
    public constructor(
        public readonly title:string,
        public readonly location:Location,
        public readonly description:string,
    ) {
    }
}