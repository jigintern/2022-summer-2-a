import React from "react";
import { css } from "@emotion/react";

const piece = (color: string) => css`
  background-color: ${color};
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;
type Props = {
  color: string;
};
const Piece = (props: Props) => {
  return <div css={piece(props.color)}></div>;
};

export default Piece;
