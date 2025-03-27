import React, { useEffect } from "react";

const ConfirmationPopup = (props) => {
  useEffect(() => {
    const handleKeyPress = (evt) => {
      if (evt.key === "Escape") {
        props.onClose("image");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="popup popup_confirmation popup_show">
      <div
        className="popup__overlay"
        onClick={() => props.onClose("confirmation")}
      ></div>
      <div className="popup__content popup__content-confirmation">
        <div className="popup__container">
          <button
            className="button button_close"
            onClick={() => {
              props.onClose("confirmation");
            }}
          ></button>
          <span className="popup__title">Are you sure?</span>
          <form
            className="popup__form popup__form_add"
            id="form-add-place-confirmation"
            noValidate
          >
            <fieldset className="popup__set">
              <button
                className="button button_submit button_submit-disabled"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onConfirmDelete();
                }}
              >
                Yes
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
