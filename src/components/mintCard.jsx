import React from "react";
import "../css/styles.css";

const MintCard = ({ incr, decr, name, counter }) => {
  return (
    <div className="mint-card">
      <div className="mint-card__heading">{name}</div>
      <div className="mint-card__price">0.001 SOL</div>
      <div className="mint-card__counter-box">
        <a className="mint-card__counter-box--inc" href="#" onClick={incr}>
          +
        </a>
        <span className="mint-card__counter-box--count">{counter}</span>
        <a className="mint-card__counter-box--dec" href="#" onClick={decr}>
          -
        </a>
      </div>
    </div>
  );
};

export default MintCard;
