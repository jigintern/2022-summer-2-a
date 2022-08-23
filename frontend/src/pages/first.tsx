import React from "react";
import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>First</h1>
      <button onClick={() => navigate("/wait")}>Go to wait</button>
      {/* <button onClick={() => history.push("/wait")}>Go to wait</button> */}
    </>
  );
};

export default First;
