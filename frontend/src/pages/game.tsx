import React, { useState, useEffect, useRef } from "react";
import CellsComponent from "@/components/game/cellsComponent";
import { GameData } from "@/models/game/data/gameData";
import { Cell } from "@/models/game/data/cell";
import { Location } from "@/models/game/data/location";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeGameData } from "@/models/game/data/decodeGameData";
import { ParticipantCount } from "@/models/game/data/participantCount";
import { CellCount } from "@/models/game/data/cellCount";
import { GameParticipant } from "@/models/game/data/gameParticipant";

const Game = () => {
  const location = useLocation();
  const name = (location.state as { name: string }).name;
  const navigate = useNavigate();
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
      0,
        [],
    )
  );
  const socket = useRef<WebSocket>(undefined as any);
  const [rouletteText, setRouletteText] = useState("");
  useEffect(() => {
    const wsProtocol =
      import.meta.env.VITE_PROTOCOL === "secure" ? "wss" : "ws";
    socket.current = new WebSocket(
      `${wsProtocol}://${import.meta.env.VITE_HOST}/echo/game`
    );
    socket.current.onopen = () => {
      socket.current.send(JSON.stringify({ type: "name", name: name }));
    };
    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "roulette") {
        setRouletteText(`${data.name}さんが${data.number}を出しました。`);
        return;
      }
      if (data.type === "break") {
          alert("中断されました");
          navigate("/");
      }
      show(decodeGameData(e.data));
    };
  }, []);
  useEffect(() => {
      console.log("ranks", data.ranks)
    if (data.nextName() === null) {
      navigate("/rank", { state: { ranks: data.ranks } });
      return;
    }
    setNextName(data.nextName()!);
  }, [data]);
  const spinRoulette = () => {
    const message = {
      type: "roulette",
      name,
    };
    socket.current.send(JSON.stringify(message));
  };
  const [nextName, setNextName] = useState<string>("");

  const useShow = {
    onShow:  (title: string, descrioption: string) => {}
  }
  const show = (nextData: GameData) => {
    const before = data.next;
    console.log(data.next)
    const movePerson = nextData.participants[before];
    const title = nextData.cells[movePerson.location.location].title;
    const description = nextData.cells[movePerson.location.location].description;
    useShow.onShow(title, description);
    setData(nextData)
  }

    return (
    <>
      <h1>game!!!</h1>
      <p>{nextName}</p>
      {name === nextName ? (
        <p>
          <button onClick={spinRoulette}>ルーレットを回す</button>
        </p>
      ) : (
        <></>
      )}
      <p>{rouletteText}</p>
      <CellsComponent data={data} useShow={useShow} />
    </>
  );
};

export default Game;
