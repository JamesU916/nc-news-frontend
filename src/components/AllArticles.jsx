import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../../api.js";
import useApiRequest from "../hooks/useApiRequest.jsx";

const AllArticles = () => {
  const { data: articles, isLoading, error } = useApiRequest(getArticles);
  if (isLoading) return <p>Loading articles...</p>;
  if (error) return { error };

  return (
    <div className="container mt-3">
      <div className="row">
        {articles.map((article) => (
          <div className="col-12 col-md-4 mb-4" key={article.article_id}>
            <div className="border p-3">
              <ArticleCard article={article} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
