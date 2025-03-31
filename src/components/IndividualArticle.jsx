import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";

const IndividualArticle = () => {
  const { article_id } = useParams();
  console.log(article_id, "<<<<ARTICLEID");
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then(({ data: { article } }) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;

  return (
    <div className="container mt-3">
      <h1>{article.title}</h1>
      <p className="card-subtitle text-muted mb-2">{article.topic}</p>
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
      <p className="card-text">Author: {article.author}</p>
      <p className="card-text">
        Date: {new Date(article.created_at).toLocaleDateString()}
      </p>
      <p className="card-text">Votes: {article.votes}</p>
      <p className="mt-3">{article.body}</p>
    </div>
  );
};

export default IndividualArticle;
