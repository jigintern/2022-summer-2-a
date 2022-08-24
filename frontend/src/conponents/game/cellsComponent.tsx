import React from "react";
import { GameData } from "@/models/game/data/gameData";
import { css } from "@emotion/react";

type Props = { data: GameData };

const cellStyle = css`
  width: 60px;
  height: 60px;
  background-color: white;
  border: 1px solid black;
`;

const CellsComponent = ({ data }: Props) => {
  return (
    <>
      <h1>Cell!!!</h1>
      {data.cells.map((cell) => {
        return <div css={cellStyle} key={cell.location.location} />;
      })}
    </>
  );
};

export default CellsComponent;
