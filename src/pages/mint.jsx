import React, { useEffect, useState } from "react";
import { getMint } from "../boxes/mint";
import MintCard from "../components/mintCard";
import "../css/styles.css";

const Mint = () => {
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [mintData, setMintData] = useState([]);

  useEffect(() => {
    setMintData(getMint());
  }, []);

  const handleIncrement = () => {
    setPrice((current) => price + 1);
  };

  const handleDecrement = () => {
    setPrice((current) => price - 1);
  };

  return (
    <main className="mint">
      <div className="mint-container">
        <h1 className="mint-container__heading">Max Mint per Transaction: 5</h1>
        <div className="mint-card-container">
          {mintData.map((mint) => (
            <div key={mint.id}>
              <MintCard
                {...mint}
                price={price}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            </div>
          ))}
        </div>
        <div className="mint-container__pricebox">
          <span className="mint-container__pricebox__pricename">
            Total price:
          </span>
          <input
            className="mint-container__pricebox__input"
            type="text"
            name="price"
            value={totalPrice}
          />
        </div>
        <span className="seperator"></span>

        <div className=" u-mt">
          <a href="#" className="btn btn-oval">
            Mint now
          </a>
        </div>
      </div>
    </main>
  );
};

export default Mint;
