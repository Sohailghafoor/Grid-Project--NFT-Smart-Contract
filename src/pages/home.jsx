import React, { useEffect, useState } from "react";
import { getBoxes } from "../boxes/boxes";
import Box from "../components/box";
import "../css/styles.css";

const Home = () => {
  const [boxes, setBoxes] = useState([]);
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [id, setId] = useState(0);
  const [hiddenBar, setHiddenBar] = useState(false);

  useEffect(() => {
    setBoxes(getBoxes());
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
        {boxes.map((box) => (
          <div className="main__grid-box__box" key={box.id}>
            <Box
              width={box.width}
              height={box.height}
              id={box.id}
              onClick={handleClick}
            />
          </div>
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
