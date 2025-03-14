import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { removeToken } from "../utils/token";

const NavbarMobile = ({ isOpen, setIsMenuOpen, showCloseButton = true }) => {
  const {
    setIsLoggedIn,
    setCurrentUser,
    userEmail,
    setUserEmail,
    handleLogout,
  } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // function handleLogout() {
  //   setIsMenuOpen(false);
  //   setIsLoggedIn(false);
  //   navigate("/signin");
  //   removeToken();
  //   setCurrentUser({});
  //   setUserEmail("");
  // }

  return (
    <>
      {location.pathname === "/" && (
        <div className={`navbar-mobile ${isOpen ? "navbar_open" : ""}`}>
          <div className="navbar__container">
            {showCloseButton && (
              <button
                className="button button_close navbar__button-close"
                onClick={() => setIsMenuOpen(false)}
              ></button>
            )}
            <div className="navbar__links">
              <div className="navbar__link"></div>
              {userEmail && (
                <p className="header__text header__text-email">{userEmail}</p>
              )}
              <button className="button header__text" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
