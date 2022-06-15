import React, { useEffect, useState } from "react";
import { getBoxSizes, getSmallBoxes } from "../boxes/boxSizes";
import MintCard from "../components/mintCard";
import nftMy from'../NFTmy.json';
import { ethers } from "ethers";
import "../css/styles.css";

const nftMyAddress = "0x1798F833c0f1A47C97E8744F37ec21FAf491Ceff";

const Mint = ({accounts, setAccounts}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [mintBoxes, setMintBoxes] = useState([]);

  const [smallCtr, setSmallCtr] = useState(0);
  const [mediumCtr, setMediumCtr] = useState(0);
  const [largeCtr, setLargeCtr] = useState(0);
  const [ultraCtr, setUltraCtr] = useState(0);

  const [smallBoxes, setSmallBoxes] = useState([]);
  //const [smallUsed, setSmallUsed] = useState(0);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMintBoxes(getBoxSizes());
    setSmallBoxes(getSmallBoxes());
  }, []);

  // const toMintSmall = () => {
  //   let count = 0;
  //   for (let i = smallUsed; i < smallBoxes.length; i++) {
  //     if (count === smallCtr) {
  //       setSmallUsed(smallCtr);
  //       break;
  //     }
  //     // console.log(el);
  //     count++;
  //   }
  //   console.log("small used: ", smallUsed);
  //   // for (let el of smallBoxes)
  // };

  async function boxSizes(){
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            nftMyAddress,
            nftMy.abi,
            signer
        );
        console.log('contract: ', contract);
        try {
        const respon = await contract.boxSizes('1', '10', '10', '10','40');
        console.log('respon:', respon);
        const respo = await contract.boxSizes('2', '10', '10', '10','40');
        console.log('respo:', respo);
        const resp = await contract.boxSizes('3', '10', '10', '10','40');
        console.log('resp:', resp);
        } catch (err) {
            console.log("error: ", err)
        }
    }
    setHidden((current) => !hidden);
}
  ///function mint
  async function mintNow(){
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            nftMyAddress,
            nftMy.abi,
            signer
        );
        console.log('contract: ', contract);
        try {

        const responses = await contract.countBox(smallCtr, mediumCtr, largeCtr, ultraCtr,0);
        console.log('responses:', responses); 
      
    
        } catch (err) {
            console.log("error: ", err)
        }
    }
    setHidden((current) => !hidden);
}

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
          <a href="#" className="btn btn-oval" onClick={() => { mintNow(); boxSizes();}}>
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
