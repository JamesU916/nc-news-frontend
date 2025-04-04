import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  const formattedTopic =
    topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1);
  return (
    <Link to={`/articles?topic=${topic.slug}`} className="text-decoration-none">
      <div
        className="card h-100 shadow-sm d-flex flex-column"
        style={{ minHeight: "300px" }}
      >
        {topic.img_url?.trim() !== "" ? (
          <img
            src={topic.img_url}
            alt={topic.slug}
            className="card-img-top img-fluid"
            style={{
              height: "100px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <img
            src="../src/assets/no-img-available.jpg"
            alt="No topic image avaialble"
            className="card-img-top img-fluid"
            style={{
              height: "100px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <p className="card-title fw-bold">{formattedTopic}</p>
          <p className="card-subtitle text-muted mb-2">{topic.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
