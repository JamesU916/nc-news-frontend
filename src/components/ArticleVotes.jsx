import { useState, useEffect } from "react";
import usePatchRequest from "../hooks/usePatchRequest";
import { patchArticleVotes } from "../../api";
import Lottie from "lottie-react";
import likeAnimation from "../assets/likeAnimation.json";
import dislikeAnimation from "../assets/dislikeAnimation.json";

const ArticleVotes = ({ article, initialVotes }) => {
  const [voteCount, setVoteCount] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0);
  const { startPatch, error: voteError } = usePatchRequest(patchArticleVotes);
  useEffect(() => {
    if (article) {
      setVoteCount(initialVotes);
    }
  }, [article]);

  const handleArticleVote = (increment) => {
    if (userVote === increment) {
      setVoteCount((current) => current - increment);
      setUserVote(0);
      startPatch(article.article_id, -increment).catch(() => {
        setVoteCount((current) => current + increment);
        setUserVote(increment);
      });
    } else {
      const change = increment - userVote;
      setVoteCount((current) => current + change);
      setUserVote(increment);
      startPatch(article.article_id, increment).catch(() => {
        setVoteCount((current) => current - change);
        setUserVote(userVote);
      });
    }
  };
  return (
    <div>
      <p className="card-text fw-bold">Votes: {voteCount}</p>
      <div className="mb-1">
        <button
          className={`btn me-1 ${
            userVote === 1 ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => handleArticleVote(1)}
        >
          <Lottie
            animationData={likeAnimation}
            style={{ width: "60px", height: "40px" }}
          />
          Like
        </button>
        <button
          className={`btn me-1 ${
            userVote === -1 ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => handleArticleVote(-1)}
        >
          <Lottie
            animationData={dislikeAnimation}
            style={{ width: "60px", height: "40px" }}
          />
          Dislike
        </button>
      </div>
      {voteError && <p className="text-danger">{voteError.statusText}</p>}
      <p className="mt-3 text-start">{article.body}</p>
    </div>
  );
};

export default ArticleVotes;
