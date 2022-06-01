import React, { useState } from "react";
import "../css/styles.css";

const Box = (props) => {
  const { width, height, id, onClick } = props;

  const [popup, setPopup] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  //   console.log(width, height);
  const style = {
    width: width,
    height: height,
  };

  const popupPos = {
    top: top,
    left: left,
  };

  const handleHover = (event) => {
    // console.log(event.pageX, event.pageY);
    let t = event.clientY;
    let l = event.clientX;
    setTop(t);
    setLeft(l);

    setPopup(true);
  };

  const handleLeave = () => {
    setPopup(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={() => onClick(id, left, top)}
        className="box__grid-box"
        style={style}
      ></div>
      <div className={popup ? "hover-popup" : "hidden"} style={popupPos}>
        {`X axis: ${left} Y axis: ${top}`}
      </div>
    </>
  );
};

export default Box;
