import React, { useState, useEffect, useRef } from "react";
import CellsComponent from "@/components/game/cellsComponent";
import { GameData } from "@/models/game/data/gameData";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeGameData } from "@/models/game/data/decodeGameData";
import { mockGameData } from "@/models/game/mock/mockGameData";
import { Socket } from "@/connect/socket"

const Game = () => {
  const location = useLocation();
  const name = (() => {
    try {
      return (location.state as { name: string }).name;
    } catch {
      return "default";
    }
  })();
  const navigate = useNavigate();
  const [data, setData] = useState<GameData>(mockGameData);
  const socket = useRef<Socket>(undefined as any);
  const [rouletteText, setRouletteText] = useState("");
  useEffect(() => {
    // const wsProtocol =
      // import.meta.env.VITE_PROTOCOL === "secure" ? "wss" : "ws";
    // socket.current = new WebSocket(
    //   `${wsProtocol}://${import.meta.env.VITE_HOST}/echo/game`
    // );
    socket.current = Socket.makeByEnv('/echo/game');
    socket.current.onopen = async () => {
      console.log("open");
      await socket.current.send(JSON.stringify({ type: "name", name: name }));
    };
    socket.current.onmessage = (socket, e) => {
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
      console.log(data.next);
      setData(decodeGameData(e.data))
      show(decodeGameData(e.data))
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
  const spinRoulette = async () => {
    const message = {
      type: "roulette",
      name,
    };
    await socket.current.send(JSON.stringify(message));
  };
  const [nextName, setNextName] = useState<string>("");

  const useShow = {
    onShow: (title: string, description: string) => {},
  };

  const show = (nextData: GameData) => {
    const movePerson = nextData.participants[nextData.before];
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
