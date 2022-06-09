import React, { useEffect, useState } from "react";
import AddCard from "../components/addCard";
import zombie from "../assets/zombie.PNG";
import upload from "../assets/upload.png";
import Card from "../components/card";
import { getCard, setCard } from "../boxes/card";
import "../css/styles.css";
import { id } from "ethers/lib/utils";
import nftMy from'../NFTmy.json';
import { ethers } from "ethers";

const nftMyAddress = "0x8fF47ec2f6209667FFA54042521eaAF42fA9F2F2";

const Account = (accounts, setAccounts) => {
  const [hidden, setHidden] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setCardData(getCard());
  }, []);

  

  const handleClick = () => {
    setHidden((currnet) => !hidden);
  };

  const handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleBio = (event) => {
    setBio(event.target.value);
  };

  const handleLink = (event) => {
    setLink(event.target.value);
  };

async function addCard(){
  setHidden((current) => !hidden);
  setCard(name, bio, link, image);
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
          
         // const response = await contract.countBox(smallCtr, mediumCtr, largeCtr, ultraCtr);
          //console.log('response:', response);
  
             const response = await contract.UpdateNewURI(link,name);
             console.log('response:', response);
        } catch (err) {
            console.log("error: ", err)
        }
    }
    setHidden((current) => !hidden);
}






  return (
    <main className="account">
      <div className="account__card-container">
        {cardData.map((card) => (
          <div key={card.name}>
            <Card {...card} />
          </div>
        ))}
        <AddCard handleClick={handleClick} />

        <div className={hidden ? "add-card-container" : "hidden"}>
          <div className="add-card-container__cross" onClick={handleClick}>
            &times;
          </div>
          <h1 className="add-card-container__heading">NFT ID: 12345</h1>
          <span className="add-card-container__line"></span>
          <div className="add-card-container__grid-row">
            <div className="add-card-container__grid-row__1">
              <div className="add-card-container__grid-row__1-grid">
                <div className="add-card-container__grid-row__1-grid-row">
                  <div className="add-card-container__grid-row__1-grid-row__title">
                    ID:
                  </div>
                  <div className="add-card-container__grid-row__1-grid-row__input">
                    <input
                      className="input-field"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleName}
                    />
                  </div>
                </div>
                <div className="add-card-container__grid-row__1-grid-row">
                  <div className="add-card-container__grid-row__1-grid-row__title">
                    Bio:
                  </div>
                  <div className="add-card-container__grid-row__1-grid-row__input">
                    <textarea
                      cols="20"
                      rows="5"
                      className="input-area u-ml-5"
                      type="text"
                      name="bio"
                      value={bio}
                      onChange={handleBio}
                    />
                  </div>
                </div>
                <div className="add-card-container__grid-row__1-grid-row u-mt-5">
                  <div className="add-card-container__grid-row__1-grid-row__title">
                    Link:
                  </div>
                  <div className="add-card-container__grid-row__1-grid-row__input">
                    <input
                      className="input-field u-ml"
                      type="text"
                      name="link"
                      value={link}
                      onChange={handleLink}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="add-card-container__grid-row__2">
              <img src={zombie} alt="not found" />
              <a href="#" className="btn btn-oval">
                <img className="up-img" src={upload} alt="not found" />{" "}
                <input
                  type="file"
                  onChange={handleImage}
                  className="image-picker"
                />{" "}
                upload image
              </a>
            </div>
          </div>
          <a href="#" className="btn btn-square" onClick={addCard}>
            Done
          </a>
        </div>
        <div className={hidden ? "overlay" : "overlay hidden"}></div>
      </div>
    </main>
  );
};

export default Account;
