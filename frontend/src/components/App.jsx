import { useState, useEffect, use } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Login from "./Login";
import * as auth from "../utils/auth";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { getToken, setToken, removeToken } from "../utils/token";
import InfoTooltip from "./InfoToolTip";
import emailPattern from "../constants/constants";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  //const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setJwt] = useState(getToken());
  //const { setCurrentUser, setCards } = useContext(CurrentUserContext);

  const navigate = useNavigate();
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    //const jwt = getToken();
    if (!jwt) {
      setIsLoading(false);
      return;
    }

    api.setToken(jwt);
    api
      .getUserInfo()
      .then((userData) => {
        setIsLoggedIn(true);
        setUserEmail(userData.email);
        setCurrentUser(userData);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [jwt]);

  useEffect(() => {
    if (!isLoggedIn) return;
    console.log("loading cards.....");

    const fetchData = async () => {
      try {
        const cardsData = await api.getCards();
        if (Array.isArray(cardsData)) {
          setCards(cardsData);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isLoggedIn, jwt]);

  const handleCardLike = async (card) => {
    console.log(card, "card handlelike");
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(currentUser._id, "current user handle like APP 116");
    try {
      let newCard;
      if (isLiked) {
        console.log(isLiked, "add like");
        newCard = await api.deleteLikeCard(card._id);
      } else {
        newCard = await api.likeCard(card._id);
        console.log(isLiked, "remove like");
      }
      console.log(newCard, "NewCards, app 113");

      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  // const fetchUserEmail = async () => {
  //   try {
  //     const data = await auth.getUserEmail();
  //     if (data) {
  //       setUserEmail(data.email);
  //     } else {
  //       setErrorMessage("User does not exist");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setErrorMessage("Error getting data");
  //   }
  // };

  const handleCardDelete = async (cardId) => {
    try {
      await api.deleteCard(cardId);
      setCards((state) => state.filter((c) => c._id !== cardId));
    } catch (error) {
      console.error("Error deleting card");
    }
  };

  const handleEditAvatarClick = () => {
    setAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setCardPopupOpen(true);
    setSelectedCard(card);
  };

  const handlers = {
    add: setAddPlacePopupOpen,
    avatar: setAvatarPopupOpen,
    edit: setEditProfilePopupOpen,
    image: () => {
      setSelectedCard(null);
    },
  };

  const handleUpdateUser = (name, about) => {
    console.log(name, "Name");
    console.log(about, "About");
    api
      .updateUser(name, about)
      .then((updateUser) => {
        console.log(updateUser, "Update User");
        setCurrentUser(updateUser);
        handleClose("edit");
      })
      .catch((error) => {
        console.log(error);
        console.error("Error updating user");
      });
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .updateAvatar(avatar)
      .then((updateAvatar) => {
        setCurrentUser(updateAvatar);
        handleClose("avatar");
      })
      .catch((error) => {
        console.error("Error updating avatar");
      });
  };

  const handleNewCard = (link, name) => {
    setIsLoading(true);
    api
      .newCard(link, name)
      .then((addCard) => {
        setCards([addCard, ...cards]);
        handleClose("add");
      })
      .catch((error) => {
        console.error("Error adding new place");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = (popupId) => {
    const setClose = handlers[popupId];
    setClose(false);
  };

  const handleRegistration = async ({
    email,
    password,
    confirmPassword,
    name,
    link,
  }) => {
    if (!emailPattern.test(email)) {
      setIsOpen(true);
      setIsSuccess(false);
      return setErrorMessage("Please use a valid email");
    }

    if (password !== confirmPassword) {
      setIsOpen(true);
      setIsSuccess(false);
      return setErrorMessage("Passwords do not match!");
    }

    try {
      await auth.register(email, password, confirmPassword, name, link);
      setIsOpen(true);
      setIsSuccess(true);
      navigate("/signin");
    } catch (err) {
      setIsOpen(true);
      setIsSuccess(false);
      if (err.message === "Error: 400" || err.status === 400) {
        setErrorMessage("Something went wrong! Please try again.");
      } else {
        setErrorMessage("This email is already registered");
      }
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    if (!emailPattern.test(email)) {
      setIsOpen(true);
      setIsSuccess(false);
      return setErrorMessage("Please use a valid email");
    }
    auth
      .authorize(email, password)
      .then(({ token }) => {
        setToken(token);
        setJwt(token);
        //api.setJwt(token);

        return api.getCards();
      })
      .then((cards) => {
        //setUserData(email, password);
        setCards(cards);
        navigate("/");
        setIsLoggedIn(true);
        setErrorMessage(null);
      })
      .catch((err) => {
        setIsOpen(true);
        setIsSuccess(false);
        // if (err.message === "Error: 401" || err.status === 401) {
        //   setErrorMessage("Something went wrong! Please try again.");
        // } else {
        //   setErrorMessage("Incorrect email or password");
        // }

        const errorMessage =
          err.response?.data?.message ||
          "Service unavailable. Please try later.";
        setErrorMessage(errorMessage);

        console.error("Login error:", {
          status: err.response?.status,
          message: errorMessage,
        });
      });
  };

  const handleCloseTooltip = () => {
    setIsOpen(false);
  };

  //pasarlo como prpo y limpiar codigo
  function handleLogout({ token }) {
    setIsLoggedIn(false);
    navigate("/signin");
    removeToken();
    setCurrentUser({});
    setUserEmail("");
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        setIsLoggedIn,
        setCurrentUser,
        userEmail,
        setUserEmail,
        cards,
        handleLogout,
      }}
    >
      <Header />
      {isLoading ? (
        <LoadingSpinner loading={isLoading} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <Main
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  isAvatarPopupOpen={isAvatarPopupOpen}
                  isCardPopupOpen={isCardPopupOpen}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onClose={handleClose}
                  selectedCard={selectedCard}
                  //setCurrentUser={setCurrentUser}
                  onUpdateUser={handleUpdateUser}
                  onUpdateAvatar={handleUpdateAvatar}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  onAddCard={handleNewCard}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin} />}
            setIsLoggedIn={setIsLoggedIn}
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegistration={handleRegistration}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
        </Routes>
      )}
      {isOpen && (
        <InfoTooltip
          onSuccess={isSuccess}
          onClose={handleCloseTooltip}
          onOpen={isOpen}
          errorMessage={errorMessage}
        />
      )}
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
