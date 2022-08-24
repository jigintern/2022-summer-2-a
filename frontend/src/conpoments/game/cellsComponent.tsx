import React, { useCallback, useRef, useState } from "react";
import { GameData } from "@/models/game/data/gameData";
import { css } from "@emotion/react";
import Piece from "@/conpoments/game/Piece";
type Props = { data: GameData };
type PiecesType = {
  color: string;
  num: number;
};
const cellStyle = css`
  width: 60px;
  height: 60px;
  background-color: white;
  border: 1px solid black;
`;

const CellsComponent = ({ data }: Props) => {
  const ref: React.MutableRefObject<HTMLDialogElement | null> = useRef(null);

  const showModal = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);

  const stopPagination = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );
  const [num, setNum] = useState<number[]>([0, 3, 3]);
  const [pieces, setA] = useState<PiecesType[]>([
    { color: "red", num: 0 },
    { color: "blue", num: 1 },
  ]);
  return (
    <>
      <h1>Cell!!!</h1>
      {data.cells.map((cell, index) => {
        return (
          <div css={cellStyle} key={cell.location.location} onClick={showModal}>
            {pieces.map((item) => {
              return index === item.num ? <Piece color={item.color} /> : <></>;
            })}
          </div>
        );
      })}
      <dialog ref={ref} onClick={closeModal}>
        <div onClick={stopPagination}>
          <h2>title</h2>
          <p>description</p>
        </div>
      </dialog>
    </>
  );
};

export default CellsComponent;
