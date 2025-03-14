import React from "react";
import { useEffect } from "react";

const ImagePopup = ({ card, onClose }) => {
  useEffect(() => {
    const handleKeyPress = (evt) => {
      if (evt.key === "Escape") {
        onClose("image");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <>
      <div className="popup popup_image popup_show">
        <div
          className="popup__overlay"
          onClick={() => {
            onClose("image");
          }}
        ></div>
        <div className="popup__content popup__content-image">
          <button
            className="button button_close"
            onClick={() => {
              onClose("image");
            }}
          ></button>
          <img src={card.link} alt={card.name} className="popup__element" />
          <span className="popup__title popup__title_img">{card.name}</span>
        </div>
      </div>
    </>
  );
};

export default ImagePopup;
