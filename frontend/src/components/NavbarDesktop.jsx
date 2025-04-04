import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const NavbarDesktop = () => {
  const { userEmail, handleLogout } = useContext(CurrentUserContext);
  const location = useLocation();

  return (
    <>
      <div className="navbar-desktop">
        <div className="navbar__container">
          {location.pathname === "/" && (
            <>
              <p className="header__text header__text-email">{userEmail}</p>
              <button className="button header__text " onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarDesktop;
