import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`}>
      <div
        className="card h-100 shadow-sm d-flex flex-column"
        style={{ minHeight: "500px" }}
      >
        {article.article_img_url && (
          <img
            src={article.article_img_url}
            alt={article.title}
            className="card-img-top img-fluid"
            style={{
              height: "200px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <p className="card-title fw-bold">{article.title}</p>
          <p className="card-subtitle text-muted mb-2">{article.topic}</p>
          <p className="card-text">Author: {article.author}</p>
          <p className="card-text">
            Date: {new Date(article.created_at).toLocaleDateString()}
          </p>
          <p className="card-text">Votes: {article.votes}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
