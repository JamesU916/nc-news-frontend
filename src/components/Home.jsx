import { UserContext } from "../contexts/User";
import { useContext } from "react";

const Home = () => {
  const loggedInUser = useContext(UserContext);
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
    </div>
  );
};

export default Home;
