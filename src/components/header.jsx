import React, {useState} from "react";
import "../css/styles.css";
import logo from "../assets/logo-white.png";
import account from "../assets/user.png";
import light from "../assets/light.png";

const Header = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);


  async function connectAccount(){
    if (window.ethereum){
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(accounts);
    }
}
  return (
    <header className="header">
      <div className="header__logo-box">
        <img className="header__logo-box__logo" src={logo} alt="not found" />
        <span className="header__logo-box__text">Logo</span>
      </div>
      <div className="header__profile-box">
        <img
          className="header__profile-box__account"
          src={account}
          alt="not found"
        />
        {isConnected ? ( <p>Connected</p> ) : (<a href="#" className="btn btn-oval" onClick={connectAccount}>
          Connect Wallet
        </a>)
        }
        
        <img
          className="header__profile-box__theme"
          src={light}
          alt="not found"
        />
      </div>
    </header>
  );
};

export default Header;
