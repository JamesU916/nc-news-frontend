import { UserContext } from "../contexts/User";
import { useContext } from "react";
const Header = () => {
  const loggedInUser = useContext(UserContext);
  return (
    <header className="header text-primary">
      <h1> NC NEWS </h1>
      <small className="text-secondary">Logged in as {loggedInUser}</small>
    </header>
  );
};

export default Header;
