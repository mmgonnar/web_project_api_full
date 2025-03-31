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
import InfoTooltip from "./InfoTooltip";
import { emailPattern, passwordPattern } from "../constants/constants";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
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

  // const tryCatch = async (callback, errorMessage) => {
  //   try {
  //     //await auth.register(email, password, confirmPassword, name, link);
  //     await callback();
  //     setIsOpen(true);
  //     setIsSuccess(true);
  //     navigate("/signin");
  //   } catch (err) {
  //     console.log(typeof err, "app.jsx 129");
  //     setIsOpen(true);
  //     setIsSuccess(false);
  //     const errorMessage =
  //       err || "Account already . Please register or check your email.";
  //     setErrorMessage(errorMessage);

  //     console.error("Register error:", {
  //       status: err.response?.status,
  //       message: errorMessage,
  //     });
  //   }
  // };

  useEffect(() => {
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
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    try {
      let newCard;
      if (isLiked) {
        newCard = await api.deleteLikeCard(card._id);
      } else {
        newCard = await api.likeCard(card._id);
      }

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
    if (!selectedCard) {
      return;
    }

    try {
      console.log("bbbb");
      await api.deleteCard(selectedCard);
      console.log("cccccccccc");
      setCards((state) => state.filter((c) => c._id !== selectedCard));
      handleClose("confirmation");
    } catch (error) {
      console.log(error);
      console.error("Error deleting card");
    }
  };

  const handleConfirmationPopup = (cardId) => {
    console.log(cardId);
    setSelectedCard(cardId);
    setConfirmationPopupOpen(true);
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
    confirmation: setConfirmationPopupOpen,
    image: () => {
      setSelectedCard(null);
      setCardPopupOpen(false);
    },
  };

  const handleUpdateUser = (name, about) => {
    api
      .updateUser(name, about)
      .then((updateUser) => {
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
    // -----> Password validation pattern
    // if (!passwordPattern.test(password)) {
    //   setIsOpen(true);
    //   setIsSuccess(false);
    //   return setErrorMessage(
    //     "The password must meet the following requirements: be at least 5 characters long, include uppercase, lowercase, and numbers."
    //   );
    // }

    //-----> Try this later
    //tryCatch(auth.register, "");

    try {
      await auth.register(email, password, confirmPassword, name, link);
      setIsOpen(true);
      setIsSuccess(true);
      navigate("/signin");
    } catch (err) {
      setIsOpen(true);
      setIsSuccess(false);
      setErrorMessage(
        err?.message || err || "Registration failed. Please try again."
      );
      console.error("Register error:", err);
    }
  };

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    if (!emailPattern.test(email)) {
      setIsOpen(true);
      setIsSuccess(false);
      return setErrorMessage("Please use a valid email");
    }
    try {
      const { token } = await auth.authorize(email, password);
      setToken(token);
      setJwt(token);

      const cards = await api.getCards();
      setCards(cards);
      // Redirect and clean state
      navigate("/");
      setIsLoggedIn(true);
      setErrorMessage(null);
    } catch (err) {
      setIsOpen(true);
      setIsSuccess(false);
      setErrorMessage(
        err?.message || err || "Service unavailable. Please try later."
      );
      console.error("Login error:", err);
    }
  };

  const handleCloseTooltip = () => {
    setIsOpen(false);
  };

  // -----> Clean code and use it as a prop
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
                  isConfirmationPopupOpen={isConfirmationPopupOpen}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onClose={handleClose}
                  selectedCard={selectedCard}
                  onUpdateUser={handleUpdateUser}
                  onUpdateAvatar={handleUpdateAvatar}
                  cards={cards}
                  onCardDelete={handleConfirmationPopup}
                  onConfirmDelete={handleCardDelete}
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
