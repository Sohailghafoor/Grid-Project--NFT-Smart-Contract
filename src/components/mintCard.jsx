import React from "react";
import "../css/styles.css";

const MintCard = ({ handleIncrement, handleDecrement, price, name, id }) => {
  return (
    <div className="mint-card">
      <div className="mint-card__heading">{name}</div>
      <div className="mint-card__price">0.001 SOL</div>
      <div className="mint-card__counter-box">
        <a
          className="mint-card__counter-box--inc"
          href="#"
          onClick={handleIncrement}
        >
          +
        </a>
        <span className="mint-card__counter-box--count">{price}</span>
        <a
          className="mint-card__counter-box--dec"
          href="#"
          onClick={handleDecrement}
        >
          -
        </a>
      </div>
    </div>
  );
};

export default MintCard;
