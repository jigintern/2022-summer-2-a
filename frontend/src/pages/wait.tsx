import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NameMessage } from "@/models/wait/nameMessage";

const Wait = () => {
  const navigate = useNavigate();
  const socket = new WebSocket(`ws://${import.meta.env.VITE_HOST}/echo/wait`);
  socket.onmessage = (e) => {
    if (e.data === "start") {
      navigate("/game");
      return;
    }
    console.error("start以外が渡された: " + e.data);
  };
  const [isNameSended, setIsNameSended] = useState<boolean>(false);
  const [name, setName] = useState("");
  const isNameSendible = name !== "";
  const sendName = (): void => {
    new NameMessage(name).send(socket);
    setIsNameSended(true);
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
      </p>
    </>
  );
};

export default Wait;
