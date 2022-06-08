import React, { useEffect, useState } from "react";
import { getBoxSizes, getSmallBoxes } from "../boxes/boxSizes";
import MintCard from "../components/mintCard";
import "../css/styles.css";

const Mint = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [mintBoxes, setMintBoxes] = useState([]);

  const [smallCtr, setSmallCtr] = useState(0);
  const [mediumCtr, setMediumCtr] = useState(0);
  const [largeCtr, setLargeCtr] = useState(0);
  const [ultraCtr, setUltraCtr] = useState(0);

  const [smallBoxes, setSmallBoxes] = useState([]);
  const [smallUsed, setSmallUsed] = useState(0);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMintBoxes(getBoxSizes());
    setSmallBoxes(getSmallBoxes());
  }, []);

  const toMintSmall = () => {
    let count = 0;
    for (let i = smallUsed; i < smallBoxes.length; i++) {
      if (count === smallCtr) {
        setSmallUsed(smallCtr);
        break;
      }
      // console.log(el);
      count++;
    }
    console.log("small used: ", smallUsed);
    // for (let el of smallBoxes)
  };

  const mintNow = () => {
    let totalCount = smallCtr;
    if (totalCount > 3) {
      alert("1 address can mint maximum 3 boxes!!");
      return;
    }
    toMintSmall();
    setHidden((current) => !hidden);
  };

  const handleCross = () => {
    setHidden((current) => !hidden);
  };

  const smallIncrement = () => {
    setSmallCtr((current) => smallCtr + 1);
  };

  const smallDecrement = () => {
    setSmallCtr((current) => smallCtr - 1);
  };

  const mediumIncrement = () => {
    setMediumCtr((current) => mediumCtr + 1);
  };

  const mediumDecrement = () => {
    setMediumCtr((current) => mediumCtr - 1);
  };

  const largeIncrement = () => {
    setLargeCtr((current) => largeCtr + 1);
  };

  const largeDecrement = () => {
    setLargeCtr((current) => largeCtr - 1);
  };

  const ultraIncrement = () => {
    setUltraCtr((current) => ultraCtr + 1);
  };

  const ultraDecrement = () => {
    setUltraCtr((current) => ultraCtr - 1);
  };

  return (
    <main className="mint">
      <div className="mint-container">
        <h1 className="mint-container__heading">Max Mint per Transaction: 5</h1>
        <div className="mint-card-container">
          <MintCard
            name="Small"
            counter={smallCtr}
            incr={smallIncrement}
            decr={smallDecrement}
            // boxes={smallBoxes}
          />
          <MintCard
            name="Medium"
            counter={mediumCtr}
            incr={mediumIncrement}
            decr={mediumDecrement}
            // boxes={}
          />
          <MintCard
            name="Large"
            counter={largeCtr}
            incr={largeIncrement}
            decr={largeDecrement}
            // boxes={largeBoxes}
          />
          <MintCard
            name="Ultra"
            counter={ultraCtr}
            incr={ultraIncrement}
            decr={ultraDecrement}
            // boxes={megaBoxes}
          />
        </div>
        <div className="mint-container__pricebox">
          <span className="mint-container__pricebox__pricename">
            Total price:
          </span>
          <div className="mint-container__pricebox__input">{totalPrice}</div>
        </div>
        <span className="seperator"></span>

        <div className=" u-mt">
          <a href="#" className="btn btn-oval" onClick={mintNow}>
            Mint now
          </a>
        </div>
      </div>
      <div
        // className="mint-modal hidden"
        className={hidden ? "mint-modal" : "hidden"}
      >
        <span className="mint-modal__cross" onClick={handleCross}>
          &times;
        </span>
        <h1 className="mint-modal__heading">Minting in Process</h1>
        <a href="#" className="btn btn-oval">
          View Transaction
        </a>
      </div>
      <div
        // className="overlay hidden"
        className={hidden ? "overlay" : "hidden"}
      ></div>
    </main>
  );
};

export default Mint;
