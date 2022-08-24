import React　from "react";
import CellsComponent from "@/conponents/game/cellsComponent";
import {GameData} from "@/models/game/data/gameData";
import {Cell} from "@/models/game/data/cell";
import {Location} from "@/models/game/data/location";
import {useLocation} from "react-router-dom";

const Game = () => {
    const location = useLocation();
    const name = (location.state as {name: string}).name;
    const wsProtocol = import.meta.env.VITE_PROTOCOL === "secure" ? "wss" : "ws";
    const socket = new WebSocket(
        `${wsProtocol}://${import.meta.env.VITE_HOST}/echo/wait`
    );
    socket.onopen = () => {
        socket.send(JSON.stringify({type: "name", name: name}));
    }
    const data = new GameData(
        undefined as any,
        undefined as any,
        [
            new Cell('aaa', new Location(0), 'bbbb'),
            new Cell('ccc', new Location(1), 'cccc'),
            new Cell('ddd', new Location(2), 'dddd'),
            new Cell('eee', new Location(3), 'ffff'),
            new Cell('ggg', new Location(4), 'zzzz'),
        ],
        undefined as any
    )
    return (
        <>
            <h1>game!!!</h1>
            <CellsComponent data={data}/>
        </>
    );
};

export default Game;
