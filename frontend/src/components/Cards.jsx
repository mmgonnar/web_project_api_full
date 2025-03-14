import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Cards = (props) => {
  const { currentUser, cards } = useContext(CurrentUserContext);

  return (
    <div className="cards" id="cards-template">
      {cards.map((card) => {
        const isOwn = card.owner._id === currentUser._id;

        return (
          <div className="card" id={card._id} key={card._id}>
            <div onClick={() => props.onCardClick(card)}>
              <img className="card__image" alt={card.name} src={card.link} />
            </div>
            <div className="card__info">
              <p className="card__title">
                <strong className="card__title-strong">{card.name}</strong>
              </p>
              <div className="card__likes">
                <button
                  className={`button_like ${
                    card.likes.some((like) => like._id === currentUser._id)
                      ? "button_like liked"
                      : ""
                  }`}
                  onClick={() => props.onCardLike(card)}
                ></button>
                <p className="card__counter">{card.likes.length}</p>
              </div>
              <button
                className={`${isOwn ? "button_delete" : ""}`}
                onClick={() => props.onCardDelete(card._id)}
              ></button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
