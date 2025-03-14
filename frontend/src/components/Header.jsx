import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { removeToken } from "../utils/token";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavBarDesktop";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsLoggedIn, setCurrentUser, userEmail, setUserEmail } =
    useContext(CurrentUserContext);
  const navigate = useNavigate(CurrentUserContext);

  const location = useLocation();

  function handleLogout({ token }) {
    setIsLoggedIn(false);
    navigate("/signin");
    removeToken();
    setCurrentUser({});
    setUserEmail("");
    isOpen(false);
  }

  const handleLogin = () => {
    if (location.pathname.includes("/signin")) {
      navigate("/signup");
    }
    if (location.pathname === "/signup") {
      navigate("/signin");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <NavbarMobile
        isOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        showCloseButton={false}
      />
      <div className="header__container">
        <img
          src="/logo_aus.svg"
          alt="Logo Around the US"
          className="header__logo"
        />
        <div className="header__text-container">
          <div className="header__button-container">
            {location.pathname === "/" && (
              <button
                className={`button navbar__mobile-button ${
                  isMenuOpen && "button__animation_close"
                }`}
                onClick={toggleMenu}
              ></button>
            )}
            <button
              className={`button button_close navbar__button-close ${
                isMenuOpen && "button__animation_open"
              }`}
              onClick={() => setIsMenuOpen(false)}
            ></button>
          </div>

          {location.pathname !== "/" && (
            <button className="button header__text" onClick={handleLogin}>
              {location.pathname.includes("/signin") ? "Register" : "Login"}
            </button>
          )}

          <NavbarDesktop />
        </div>
      </div>
    </header>
  );
};

export default Header;
