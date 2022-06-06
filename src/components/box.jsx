import React, { useState } from "react";
import "../css/styles.css";

const Box = ({ id, row1, row2, col1, col2, size }) => {
  const styles = {
    gridRow: `${row1} / ${row2}`,
    gridColumn: `${col1} / ${col2}`,
  };
  return <div key={id} className="box" style={styles}></div>;
};

export default Box;
