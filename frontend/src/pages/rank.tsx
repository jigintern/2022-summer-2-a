import React from "react";
import { useLocation } from "react-router-dom"

const Rank = () => {
  const location = useLocation();
  const { ranks } = (location.state as { ranks: readonly string[] });
  console.log(location.state)
  console.log(ranks)
  return <ol>
    {ranks.map(rank => (<li key={rank}>{rank}</li>))}
  </ol>
};

export default Rank;
