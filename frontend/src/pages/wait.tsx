import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NameMessage } from "@/models/wait/nameMessage";
import { Socket } from "@/connect/socket";

const Wait = () => {
  const navigate = useNavigate();
  // const wsProtocol = import.meta.env.VITE_PROTOCOL === "secure" ? "wss" : "ws";
  // const socket = new WebSocket(
  //   `${wsProtocol}://${import.meta.env.VITE_HOST}/echo/wait`
  // );
  const socket = Socket.makeByEnv("/echo/wait");
  socket.onmessage = (socket, e) => {
    if (e.data === "start") {
      navigate("/game", { state: { name: name } });
      return;
    }
    console.error("start以外が渡された: " + e.data);
  };
  const [isNameSended, setIsNameSended] = useState<boolean>(false);
  const [name, setName] = useState("");
  const isNameSendible = name !== "";
  const sendName = async (): Promise<void> => {
    await new NameMessage(name).send(socket);
    setIsNameSended(true);
  };
  const [isStartSended, setIsStartSended] = useState<boolean>(false);
  const sendStart = async (): Promise<void> => {
    await socket.send({ type: "start" });
    setIsStartSended(true);
  };

  return (
    <>
      <h1>Wait</h1>
      <p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
        />
        <button
          style={{
            pointerEvents: isNameSended || !isNameSendible ? "none" : "auto",
          }}
          onClick={sendName}
        >
          決定
        </button>
        <button
          style={{ pointerEvents: isStartSended ? "none" : "auto" }}
          onClick={sendStart}
        >
          START
        </button>
      </p>
    </>
  );
};

export default Wait;
