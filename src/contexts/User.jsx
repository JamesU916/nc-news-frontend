import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value="cooljmessy">{children}</UserContext.Provider>
  );
};
