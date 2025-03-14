import React, { useRef, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const avatarInputRef = useRef(null);
  const [link, setLink] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (avatarInputRef.current.validity.valid) {
      props.onUpdateAvatar(avatarInputRef.current.value);
    } else {
      console.error("Invalid link");
    }
  };

  const handleUpdateLink = (evt) => {
    setLink(evt.target.value);
    setIsFormValid(evt.target.validity.valid);
  };

  useEffect(() => {
    if (props.isOpened) {
      setLink("");
      setIsFormValid(false);
    }
  }, [props.isOpened]);

  return (
    <PopupWithForm
      title="Change Profile"
      name="avatar"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <fieldset className="popup__set">
        <div className="popup__container-input">
          <input
            type="url"
            name="url-avatar"
            id="input-image-avatar"
            className="popup__input popup__input-image"
            placeholder="Image URL"
            minLength="6"
            required
            autoComplete="on"
            onChange={handleUpdateLink}
            ref={avatarInputRef}
            value={link}
          />
          <span className="popup__error" id="input__error-url-avatar"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
