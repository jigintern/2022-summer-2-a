import React, {useCallback, useRef} from "react";
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

    const stopPagination = useCallback((e:React.MouseEvent<HTMLDivElement,MouseEvent>)=> {
        e.stopPropagation()
    }, [])

    return (
    <>
      <h1>Cell!!!</h1>
      {data.cells.map((cell) => {
        return <div css={cellStyle} key={cell.location.location} onClick={showModal} />;
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
