import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//import { removeToken } from "../utils/token";

const NavbarDesktop = () => {
  const {
    setIsLoggedIn,
    setCurrentUser,
    userEmail,
    setUserEmail,
    handleLogout,
  } = useContext(CurrentUserContext);
  const location = useLocation();
  const navigate = useNavigate(CurrentUserContext);

  // function handleLogout({ token }) {
  //   setIsLoggedIn(false);
  //   navigate("/signin");
  //   removeToken();
  //   setCurrentUser({});
  //   setUserEmail("");
  // }

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
