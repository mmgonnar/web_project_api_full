const Profile = (props) => {
  return (
    <section className="profile">
      <div className="profile__container">
        <img
          src="/images/profile.png"
          alt="profile avatar"
          className="profile__avatar"
        />
        <button
          onClick={props.onEditAvatarClick}
          className="button button_edit-avatar"
        ></button>
        <div className="profile__overlay"></div>
      </div>
      <div className="profile__info">
        <div className="profile__info-container">
          <p className="profile__name"></p>
          <button
            onClick={props.onEditProfileClick}
            className="button button_edit"
          ></button>
        </div>
        <p className="profile__job">Explorer</p>
      </div>
      <button
        onClick={props.onAddPlaceClick}
        className="button button_add"
      ></button>
    </section>
  );
};

export default Profile;
