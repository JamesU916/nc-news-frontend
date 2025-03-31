import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav nav-pills justify-content-center">
      <Link className="nav-link" to="/">
        {" "}
        Home{" "}
      </Link>
      <Link className="nav-link" to="/articles">
        {" "}
        Articles{" "}
      </Link>
      <Link className="nav-link" to="/topics">
        Topics{" "}
      </Link>
      <Link className="nav-link" to="/users">
        Users{" "}
      </Link>
    </nav>
  );
};

export default Nav;
