import { UserContext } from "../contexts/User";
import { useContext } from "react";
import Lottie from "lottie-react";
import newsAnimation from "../assets/newsAnimation.json";

const Home = () => {
  const loggedInUser = useContext(UserContext);
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <Lottie
        animationData={newsAnimation}
        style={{ width: "500px", height: "600px" }}
      ></Lottie>
    </div>
  );
};

export default Home;
