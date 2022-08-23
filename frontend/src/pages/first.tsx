import React from "react";
import { useState } from "react";
import { A } from "@/pages/firstcss";
import { css } from "@emotion/react";
const First = () => {
  const yahharo = "yahharo";
  return (
    <>
      {yahharo}
      <h1>First</h1>
      <div css={A}>
        <h1>Hello</h1>
      </div>
    </>
  );
};

export default First;
