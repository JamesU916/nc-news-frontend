import { Link } from "react-router-dom";

const NotFoundError = ({ type }) => {
  return (
    <div>
      <h1 className="text-danger">404 Not Found</h1>
      <p className="text-danger">
        {type || "The page you were looking for does not exist"}
      </p>
      <Link className="nav-link" to="/">
        {" "}
        Return Home{" "}
      </Link>
    </div>
  );
};

export default NotFoundError;
