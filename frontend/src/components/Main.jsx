import { useContext } from "react";
import ImagePopup from "./ImagePopup";
import Cards from "./Cards";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

const Main = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser, "Current user");
  return (
    <>
      <section className="profile">
        <div className="profile__container">
          {currentUser.avatar && (
            <img
              src={currentUser.avatar}
              alt="profile avatar"
              className="profile__avatar"
            />
          )}
          <button
            onClick={props.onEditAvatarClick}
            className="button button_edit-avatar"
          ></button>
          <div className="profile__overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-container">
            <p className="profile__name">{currentUser.name}</p>
            <button
              onClick={props.onEditProfileClick}
              className="button button_edit"
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlaceClick}
          className="button button_add"
        ></button>
      </section>
      {/* Popup Edit */}
      {props.isEditProfilePopupOpen && (
        <EditProfilePopup
          isOpened={props.isEditProfilePopupOpen}
          onClose={props.onClose}
          onUpdateUser={props.onUpdateUser}
        ></EditProfilePopup>
      )}
      {/* Popup Add */}
      {props.isAddPlacePopupOpen && (
        <AddPlacePopup
          isOpened={props.isAddPlacePopupOpen}
          onClose={props.onClose}
          onAddCard={props.onAddCard}
        ></AddPlacePopup>
      )}
      {/* Popup Image */}
      {props.selectedCard && (
        <ImagePopup card={props.selectedCard} onClose={props.onClose} />
      )}
      {/* Popup Avatar */}
      {props.isAvatarPopupOpen && (
        <EditAvatarPopup
          isOpened={props.isAvatarPopupOpen}
          onClose={props.onClose}
          onUpdateUser={props.onUpdateUser}
          onUpdateAvatar={props.onUpdateAvatar}
        ></EditAvatarPopup>
      )}
      {/* Popup Confirmation */}
      <div className="popup popup_confirmation">
        <div className="popup__overlay"></div>
        <div className="popup__content popup__content-confirmation">
          <div className="popup__container">
            <button className="button button_close"></button>
            <span className="popup__title">Are you sure?</span>
            <form
              className="popup__form popup__form_add"
              id="form-add-place-confirmation"
              noValidate
            >
              <fieldset className="popup__set">
                <button
                  type="submit"
                  className="button button_submit button_submit-disabled"
                >
                  Yes
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      {/* Cards */}
      <Cards
        onCardClick={props.onCardClick}
        cards={props.cards}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    </>
  );
};

export default Main;
