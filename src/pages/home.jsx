import React, { useEffect, useState } from "react";
import Box from "../components/box";
import "../css/styles.css";
import { getBoxSizes } from "../boxes/boxSizes";

const Home = () => {
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [id, setId] = useState(0);
  const [hiddenBar, setHiddenBar] = useState(false);
  const [boxSize, setBoxSize] = useState([]);

  useEffect(() => {
    setBoxSize(getBoxSizes());
  }, []);

  const handleClick = (id, x, y) => {
    setId(id);
    setXAxis(x);
    setYAxis(y);
    // console.log(id, x, y);
    setHiddenBar(true);
  };

  const handleCross = () => {
    setHiddenBar(false);
  };

  return (
    <main className="main">
      <div className="main__grid-box">
        {boxSize.map((box) => (
          // <div className="main__grid-box__box" key={box.id}>
          <Box {...box} onClick={handleClick} />
          // </div>
        ))}
      </div>
      <div className={hiddenBar ? "sidebar" : "hidden"}>
        <div className="sidebar__cross-btn" onClick={handleCross}>
          &#10005;
        </div>
        <h1>ID: {id}</h1>
        <h1>X Axis: {xAxis}</h1>
        <h1>Y Axix: {yAxis}</h1>
      </div>
    </main>
  );
};

export default Home;
