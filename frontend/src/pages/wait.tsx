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

  const [name, setName] = useState("");

  const sendName = (): void => {
    new NameMessage(name).send(socket);
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
        <button onClick={sendName}>決定</button>
      </p>
    </>
  );
};

export default Wait;
