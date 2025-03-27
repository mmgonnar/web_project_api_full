import { useContext } from "react";
import ImagePopup from "./ImagePopup";
import Cards from "./Cards";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

const Main = (props) => {
  const { currentUser } = useContext(CurrentUserContext);
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
      {props.selectedCard && props.isCardPopupOpen && (
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
      {props.isConfirmationPopupOpen && (
        <ConfirmationPopup
          isOpened={props.isConfirmationPopupOpen}
          //onConfirmationDelete={props.onConfirmDelete}
          onClose={props.onClose}
          onCardDelete={props.onCardDelete}
          onConfirmDelete={props.onConfirmDelete}
        ></ConfirmationPopup>
      )}
      {/* Cards */}
      <Cards
        onCardClick={props.onCardClick}
        cards={props.cards}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
        onConfirmationDelete={props.onConfirmDelete}
      />
    </>
  );
};

export default Main;
