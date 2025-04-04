import { useEffect, useState, useContext } from "react";
import useApiRequest from "../hooks/useApiRequest";
import usePostRequest from "../hooks/usePostRequest";
import useDeleteRequest from "../hooks/useDeleteRequest";
import { getArticleCommentsById, postComment, deleteComment } from "../../api";
import { UserContext } from "../contexts/User";

const ArticleComments = ({ article_id }) => {
  const loggedInUser = useContext(UserContext);
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useApiRequest(getArticleCommentsById, article_id);

  const [newComment, setNewComment] = useState("");
  const [displayComments, setDisplayComments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (comments) {
      setDisplayComments(comments);
    }
  }, [comments]);

  const {
    startPost,
    isPosting,
    error: postError,
    success,
  } = usePostRequest(postComment);

  const { startDelete } = useDeleteRequest(deleteComment);

  if (commentsLoading)
    return <div className="spinner-border text-primary" role="status"></div>;
  if (commentsError) return <p>{error.statusText} comments</p>;

  return (
    <div>
      <hr />
      <h2 className="mt-3, fw-bold">Comments</h2>
      {comments && comments.length === 0 && <p>No comments yet</p>}

      <div className="my-2">
        <button
          className="btn btn-info"
          onClick={() => {
            setShowForm((previous) => !previous);
            if (!showForm) {
              setNewComment("");
            }
          }}
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
            }).then((newCommentData) => {
              setNewComment("");
              setShowForm(false);
              setDisplayComments((current) => [newCommentData, ...current]);
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
          {showForm && success && (
            <p className="text-success mt-2">{success}</p>
          )}
        </form>
      )}
      <ul className="list-group mt-2">
        {displayComments &&
          displayComments.map((comment) => {
            return (
              <li className="list-group-item" key={comment.comment_id}>
                <p className="mb-1 text-start">{comment.body}</p>
                <small className="text-muted">
                  By {comment.author} on{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
                </small>
                <br />
                <small>Votes: {comment.votes}</small>

                {comment.author === loggedInUser && (
                  <div className="mt-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        setDisplayComments((current) =>
                          current.filter(
                            (c) => c.comment_id !== comment.comment_id
                          )
                        );

                        startDelete(comment.comment_id).catch((error) => {
                          {
                            error.statusText;
                          }
                        });
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ArticleComments;
