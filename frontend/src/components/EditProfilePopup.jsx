import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (props.isOpened) {
      setName("");
      setDescription("");
      setIsFormValid(false);
    }
  }, [props.isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
    checkFormValidity(evt.target.name, evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
    checkFormValidity(evt.target.name, evt.target.value);
  };

  const checkFormValidity = (name, value) => {
    if (name === "name") {
      setIsFormValid(value.length >= 2 && value.length <= 40);
    }
    if (name === "job") {
      setIsFormValid(value.length >= 2 && value.length <= 40);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid) {
      props.onUpdateUser(name, description);
    } else {
      console.error("Error");
    }
  };

  useEffect(() => {
    setIsFormValid(
      name.length >= 2 &&
        name.length <= 40 &&
        description.length >= 2 &&
        description.length <= 40
    );
  }, [name, description]);

  return (
    <PopupWithForm
      title="Edit Profile"
      name="edit"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <fieldset className="popup__set">
        <div className="popup__container-input">
          <input
            type="text"
            name="name"
            id="input-name"
            className="popup__input popup__input-name"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            required
            autoComplete="on"
            onChange={handleChangeName}
            value={name}
          />
          <span className="popup__error" id="input__error-name"></span>
        </div>
        <div className="popup__container-input">
          <input
            type="text"
            name="job"
            id="input-job"
            className="popup__input popup__input-job"
            placeholder="Job"
            minLength="2"
            maxLength="200"
            required
            autoComplete="on"
            onChange={handleChangeDescription}
            value={description}
          />
          <span className="popup__error" id="input__error-job"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
