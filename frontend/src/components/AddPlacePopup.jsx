import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    if (props.isOpened) {
      setTitle("");
      setLink("");
      setIsFormValid(false);
      setIsTitleValid(false);
      setIsLinkValid(false);
      setTitleError("");
      setLinkError("");
    }
  }, [props.isOpened]);

  useEffect(() => {
    setIsFormValid(isTitleValid && isLinkValid);
  }, [isTitleValid, isLinkValid]);

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
    setIsTitleValid(evt.target.validity.valid);
    setTitleError(evt.target.validationMessage);
  };

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
    setIsLinkValid(evt.target.validity.valid);
    setLinkError(evt.target.validationMessage);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid) {
      props.onAddCard(link, title);
    }
  };

  return (
    <PopupWithForm
      title="New Place"
      name="add"
      isOpened={props.isOpened}
      onClose={props.onClose}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <div className="popup__container-input">
          <input
            type="text"
            name="title"
            id="input-title"
            className={`popup__input popup__input-title ${
              !isTitleValid && title !== "" ? "popup__input_type_error" : ""
            }`}
            placeholder="Title"
            minLength="2"
            maxLength="30"
            required
            autoComplete="on"
            value={title}
            onChange={handleChangeTitle}
          />
          <span className="popup__error" id="input__error-title">
            {titleError}
          </span>
        </div>
        <div className="popup__container-input">
          <input
            type="url"
            name="url"
            id="input-image-add"
            className={`popup__input popup__input-image ${
              !isLinkValid && link !== "" ? "popup__input_type_error" : ""
            }`}
            placeholder="Image URL"
            minLength="6"
            required
            autoComplete="on"
            value={link}
            onChange={handleChangeLink}
          />
          <span className="popup__error" id="input__error-url">
            {linkError}
          </span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
