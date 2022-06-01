import React from "react";
import "../css/styles.css";

const AddCard = ({ handleClick }) => {
  return (
    <div className="add-card">
      <a href="#" className="btn-round" onClick={handleClick}>
        &#x2B;
      </a>
    </div>
  );
};

export default AddCard;
