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
import { mockGameData } from "@/models/game/mock/mockGameData";

const Game = () => {
  const location = useLocation();
  const name = (() => {
    try {
      return (location.state as { name: string }).name;
    } catch {
      return "default";
    }
    return "default";
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
      setData(decodeGameData(e.data));
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
      <CellsComponent data={data} />
    </>
  );
};

export default Game;
