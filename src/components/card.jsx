import React from "react";
import "../css/styles.css";

const Card = ({ name, bio, link, image }) => {
  return (
    <div className="account-card">
      <img className="account-card__img" src={image} alt="zombie" />
      <div className="account-card__dimension">
        <div className="account-card__dimension--left">Size: 6x6</div>
        <div className="account-card__dimension--right">ID: 150006</div>
      </div>
      <div className="account-card__info">
        <div className="account-card__info__name">
          <div className="account-card__info__name--name">Name:</div>
          <div className="account-card__info__name--description">{name}</div>
        </div>
        <div className="account-card__bio">
          <div className="account-card__bio--bio">Bio:</div>
          <div className="account-card__bio--description">{bio}</div>
        </div>
        <div className="account-card__info__name u-margintop-1">
          <div className="account-card__info__name--name">Link:</div>
          <div className="account-card__info__name--description">{link}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
