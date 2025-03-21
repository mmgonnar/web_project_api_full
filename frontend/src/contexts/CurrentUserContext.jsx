import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext();

// export const CurrentUserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [cards, setCards] = useState([]);

//   return (
//     <CurrentUserContext.Provider
//       value={{ currentUser, setCurrentUser, cards, setCards }}
//     >
//       {children}
//     </CurrentUserContext.Provider>
//   );
// };
