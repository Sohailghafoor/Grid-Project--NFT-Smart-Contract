import React from "react";
import "../css/styles.css";
import discord from "../assets/discord.png";
import twitter from "../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__copyright-box">
        <span className="footer__copyright-box__text">
          &#169; all rights reserved
        </span>
      </div>
      <div className="footer__buy-box">
        <a href="#" className="btn btn-square">
          Buy on OS
        </a>
      </div>
      <div className="footer__social-box">
        <img
          className="footer__social-box__socail"
          src={discord}
          alt="not found"
        />
        <img
          className="footer__social-box__socail"
          src={twitter}
          alt="not found"
        />
      </div>
    </footer>
  );
};

export default Footer;
