import React, { useState, useEffect } from "react";
import CellsComponent from "@/components/game/cellsComponent";
import { GameData } from "@/models/game/data/gameData";
import { Cell } from "@/models/game/data/cell";
import { Location } from "@/models/game/data/location";
import { useLocation } from "react-router-dom";
import { decodeGameData } from "@/models/game/data/decodeGameData";
import { ParticipantCount } from "@/models/game/data/participantCount";
import { CellCount } from "@/models/game/data/cellCount";
import { GameParticipant } from "@/models/game/data/gameParticipant";

const Game = () => {
  const location = useLocation();
  const name = (location.state as { name: string }).name;
  const [data, setData] = useState<GameData>(
    new GameData(
      new ParticipantCount(2),
      new CellCount(5),
      [
        new Cell("aaa", new Location(0), "bbbb"),
        new Cell("ccc", new Location(1), "cccc"),
        new Cell("ddd", new Location(2), "dddd"),
        new Cell("eee", new Location(3), "ffff"),
        new Cell("ggg", new Location(4), "zzzz"),
      ],
      [
        new GameParticipant("kurakke", new Location(0), 0),
        new GameParticipant("yoichi", new Location(1), 1),
      ],
      0
    )
  );
  useEffect(() => {
    const wsProtocol =
      import.meta.env.VITE_PROTOCOL === "secure" ? "wss" : "ws";
    const socket = new WebSocket(
      `${wsProtocol}://${import.meta.env.VITE_HOST}/echo/game`
    );
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "name", name: name }));
    };
    socket.onmessage = (e) => {
      const A = decodeGameData(e.data);
      console.log(A);
      setData(decodeGameData(e.data));
    };
  }, []);
  return (
    <>
      <h1>game!!!</h1>
      <p>{data.nextName()}</p>
      <CellsComponent data={data} />
    </>
  );
};

export default Game;
