import React, { useCallback, useRef, useState } from "react";
import { GameData } from "@/models/game/data/gameData";
import { css } from "@emotion/react";
import Piece from "@/components/game/Piece";
import { Location } from "@/models/game/data/location";
//import { name2pic } from "https://code4fukui.github.io/name2pic/fukui.ts";

// 本当は URL import したいけど、現行TypeScriptではできないので、下記コピペ
const url = "https://code4fukui.github.io/fukui-spot/fuku-e-spot.jsonld";
let data: any = null;

export async function name2pic(name: string): Promise<string | null> {
  if (!data) {
    data = await (await fetch(url)).json();
  }
  for (const d of data) {
    if (d.name == name) {
      return d.image;
    }
  }
  for (const d of data) {
    if (d.name.indexOf(name) >= 0) {
      return d.image;
    }
  }
  return null;
};
// ここまで

type Props = { data: GameData, useShow: {
  onShow(title: string, description: string): void
  }};

const pieceColor = ["red", "blue", "aqua", "purple"];
const cellStyle = css`
  width: 60px;
  height: 60px;
  background-color: white;
  border: 1px solid black;
`;

const CellsComponent = ({ data, useShow }: Props) => {
  const ref: React.MutableRefObject<HTMLDialogElement | null> = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const showModal = useCallback(async (title: string, description: string) => {
    setTitle(title);
    setDescription(description);
    if (ref.current) {
      ref.current.showModal();
    }
    // 現在位置の画像を取得して背景にする
    const img = await name2pic(title);
    document.body.style.backgroundImage = `url(${img})`;
  }, []);

  useShow.onShow = (title, description) => {
    showModal(title, description);
  }

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

  return (
    <>
      <h1>Cell!!!</h1>
      {data.cells.map((cell, index) => {
        return (
          <div
            css={cellStyle}
            key={cell.location.location}
            onClick={() => showModal(cell.title, cell.description)}
          >
            {data.hereParticipants(new Location(index)).map((participant) => {
              return index === participant.location.location ? (
                <Piece
                  color={pieceColor[participant.number]}
                  key={participant.number}
                />
              ) : (
                <></>
              );
            })}
          </div>
        );
      })}
      <dialog ref={ref} onClick={closeModal}>
        <div onClick={stopPagination}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </dialog>
    </>
  );
};

export default CellsComponent;
