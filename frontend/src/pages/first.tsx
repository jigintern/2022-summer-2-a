import React from "react";
import { useState } from "react";
import { A } from "@/pages/firstcss";
import { css } from "@emotion/react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const First = () => {
  const yahharo = "yahharo";
  //   const history = useHistory();
  const navigate = useNavigate();
  return (
    <>
      {yahharo}
      <h1>First</h1>
      <div css={A}>
        <h1>Hello</h1>
      </div>
      <button onClick={() => navigate("/wait")}>Go to wait</button>
      {/* <button onClick={() => history.push("/wait")}>Go to wait</button> */}
    </>
  );
};

export default First;
