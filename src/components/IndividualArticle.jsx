import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import NotFoundError from "./NotFoundError";
import ArticleComments from "./ArticleComments";
import ArticleVotes from "./ArticleVotes";

const IndividualArticle = () => {
  const loggedInUser = useContext(UserContext);
  const { article_id } = useParams();
  const {
    data: article,
    isLoading: articleLoading,
    error: articleError,
  } = useApiRequest(getArticleById, article_id);
  if (articleLoading)
    return <div className="spinner-border text-primary" role="status"></div>;
  if (articleError) {
    return (
      <NotFoundError type="The article you are looking for does not exist." />
    );
  }
  const formattedTopic =
    article.topic.charAt(0).toUpperCase() + article.topic.slice(1);

  return (
    <div className="container mt-3">
      <h1 className="fw-bold">{article.title}</h1>
      <small className="text-muted">
        By {article.author} on{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </small>
      <p className="card-subtitle text-muted mb-2">{formattedTopic}</p>
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={article.title}
          className="card-img-top img-fluid"
          style={{
            height: "300px",
            width: "500px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "5px",
          }}
        />
      )}
      <ArticleVotes article={article} initialVotes={article.votes} />
      <ArticleComments
        article_id={article.article_id}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default IndividualArticle;
