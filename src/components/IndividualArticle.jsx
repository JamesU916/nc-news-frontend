import { useParams } from "react-router-dom";
import {
  getArticleById,
  getArticleCommentsById,
  patchArticleVotes,
  postComment,
} from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import usePatchRequest from "../hooks/usePatchRequest";
import { useEffect, useState, useContext } from "react";
import usePostRequest from "../hooks/usePostRequest";
import { UserContext } from "../contexts/User";

const IndividualArticle = () => {
  const loggedInUser = useContext(UserContext);
  const { article_id } = useParams();
  const {
    data: article,
    isLoading: articleLoading,
    error: articleError,
  } = useApiRequest(getArticleById, article_id);

  const [voteCount, setVoteCount] = useState(0);
  useEffect(() => {
    if (article) {
      setVoteCount(article.votes);
    }
  }, [article]);
  const { startPatch, error: voteError } = usePatchRequest(patchArticleVotes);

  const handleArticleVote = (increment) => {
    setVoteCount((current) => current + increment);
    startPatch(article.article_id, increment).catch(() => {
      setVoteCount((current) => current - increment);
    });
  };

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useApiRequest(getArticleCommentsById, article_id);

  const [newComment, setNewComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const {
    startPost,
    data,
    isPosting,
    error: postError,
    success,
  } = usePostRequest(postComment);

  if (articleLoading) return <p>Loading articles...</p>;
  if (articleError) return <p>{error.statusText} articles</p>;

  if (commentsLoading) return <p>Loading comments...</p>;
  if (commentsError) return <p>{error.statusText} comments</p>;

  return (
    <div className="container mt-3">
      <h1 className="fw-bold">{article.title}</h1>
      <small className="text-muted">
        By {article.author} on{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </small>
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
      <p className="card-text fw-bold">Votes: {voteCount}</p>
      <div className="mb-1">
        <button
          className="btn btn-outline-success me-1"
          onClick={() => handleArticleVote(1)}
        >
          🩷 Like
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => handleArticleVote(-1)}
        >
          ❌ Dislike
        </button>
      </div>
      {voteError && <p className="text-danger">{voteError.statusText}</p>}
      <p className="mt-3 text-start">{article.body}</p>

      <hr />
      <h2 className="mt-3, fw-bold">Comments</h2>
      {comments && comments.length === 0 && <p>No comments yet</p>}

      <div className="my-2">
        <button
          className="btn btn-info"
          onClick={() => setShowForm((previous) => !previous)}
        >
          {showForm ? "Close Form" : "✍️ Add Comment"}
        </button>
      </div>
      {showForm && (
        <form
          className="mb-2"
          onSubmit={(event) => {
            event.preventDefault();
            startPost(article_id, {
              username: loggedInUser,
              body: newComment,
            }).then(() => {
              setNewComment("");
              setShowForm(false);
            });
          }}
        >
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Type your comment here..."
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Post Comment"}
          </button>
          {postError && (
            <p className="text-danger mt-2">{postError.statusText}</p>
          )}
          {success && <p className="text-success mt-2">{success}</p>}
        </form>
      )}
      <ul className="list-group mt-2">
        {comments &&
          comments.map((comment) => {
            return (
              <li className="list-group-item" key={comment.comment_id}>
                <p className="mb-1 text-start">{comment.body}</p>
                <small className="text-muted">
                  By {comment.author} on{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
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
