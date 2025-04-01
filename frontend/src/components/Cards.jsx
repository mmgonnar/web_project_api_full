import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//import card from "../../../backend/models/card";

const Cards = (props) => {
  const { currentUser, cards = [] } = useContext(CurrentUserContext);

  console.log(cards, "card");
  console.log(currentUser, "currentUser");
  // if (currentUser && (!cards || cards.length === 0)) {
  //   return <p className="cards__message">No hay tarjetas disponibles</p>;
  // }

  //if (!currentUser) return null;
  //const isOwn = card.owner._id === currentUser._id;
  return (
    <div className="cards" id="cards-template">
      {cards
        .filter((card) => card && card.owner)
        .map((card) => {
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
                  className={`${
                    card.owner._id === currentUser._id ? "button_delete" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onCardDelete(card._id);
                  }}
                ></button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Cards;
