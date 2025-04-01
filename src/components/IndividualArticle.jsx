import { useParams } from "react-router-dom";
import { getArticleById, getArticleCommentsById } from "../../api";
import useApiRequest from "../hooks/useApiRequest";

const IndividualArticle = () => {
  const { article_id } = useParams();
  const {
    data: article,
    isLoading: articleLoading,
    error: articleError,
  } = useApiRequest(getArticleById, article_id);

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useApiRequest(getArticleCommentsById, article_id);

  if (articleLoading) return <p>Loading articles...</p>;
  if (articleError) return <p>{error.statusText} articles</p>;

  if (commentsLoading) return <p>Loading comments...</p>;
  if (commentsError) return <p>{error.statusText} comments</p>;
  if (!commentsLoading && comments && comments.length === 0)
    return <p>No comments yet</p>;

  return (
    <div className="container mt-3">
      <h1 className="fw-bold">{article.title}</h1>
      <p className="card-subtitle text-muted mb-2">{article.topic}</p>
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
      <p className="card-text">Author: {article.author}</p>
      <p className="card-text">
        Date: {new Date(article.created_at).toLocaleDateString()}
      </p>
      <p className="card-text">Votes: {article.votes}</p>
      <p className="mt-3 text-start">{article.body}</p>

      <hr />
      <h2 className="mt-3">Comments</h2>

      <ul className="list-group mt-2">
        {comments &&
          comments.map((comment) => {
            return (
              <li className="list-group-item" key={comment.comment_id}>
                <p className="mb-1 text-start">{comment.body}</p>
                <small className="text-muted">
                  By {comment.author} on{" "}
                  {new Date(article.created_at).toLocaleDateString()}
                </small>
                <br />
                <small>Votes: {comment.votes}</small>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default IndividualArticle;
