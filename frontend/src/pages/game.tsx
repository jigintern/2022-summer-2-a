import React, { useState, useEffect, useRef } from "react";
import CellsComponent from "@/components/game/cellsComponent";
import { GameData } from "@/models/game/data/gameData";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeGameData } from "@/models/game/data/decodeGameData";
import { mockGameData } from "@/models/game/mock/mockGameData";

const Game = () => {
  const location = useLocation();
  // const name = (location.state as { name: string }).name;
  const name = (() => {
    try {
      return (location.state as { name: string }).name;
    } catch {
      return "default";
    }
  })();
  const navigate = useNavigate();
  const [data, setData] = useState<GameData>(mockGameData);
  const socket = useRef<WebSocket>(undefined as any);
  const [rouletteText, setRouletteText] = useState("");
  useEffect(() => {
    const wsProtocol =
      import.meta.env.VITE_PROTOCOL === "secure" ? "wss" : "ws";
    socket.current = new WebSocket(
      `${wsProtocol}://${import.meta.env.VITE_HOST}/echo/game`
    );
    socket.current.onopen = () => {
      console.log("open");
      socket.current.send(JSON.stringify({ type: "name", name: name }));
    };
    socket.current.onmessage = (e) => {
      console.log("receive");
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
    console.log("ranks", data.ranks);
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
    onShow: (title: string, description: string) => {},
  };
  const show = (nextData: GameData) => {
    const before = data.next;
    console.log("next", data.next);
    setData(nextData);
    const movePerson = nextData.participants[before];
    const title = nextData.cells[movePerson.location.location].title;
    const description =
      nextData.cells[movePerson.location.location].description;
    useShow.onShow(title, description);
  };

  console.dir(data);
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
