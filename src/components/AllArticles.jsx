import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../../api.js";
import useApiRequest from "../hooks/useApiRequest.jsx";
import SortBy from "./SortBy.jsx";

const AllArticles = () => {
  const { data: articles, isLoading, error } = useApiRequest(getArticles);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error.statusText}</p>;

  const filtered = topic
    ? articles.filter((article) => article.topic === topic)
    : articles;

  const sorted = [...filtered].sort((a, b) => {
    if (order === "asc") {
      return a[sort_by] > b[sort_by] ? 1 : -1;
    } else {
      return a[sort_by] < b[sort_by] ? 1 : -1;
    }
  });

  const handleSortChange = (newSortBy, newOrder) => {
    searchParams.set("sort_by", newSortBy);
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
  };

  return (
    <div className="container mt-3">
      <SortBy
        onSortChange={handleSortChange}
        defaultSort={sort_by}
        defaultOrder={order}
      />
      <div className="row">
        {sorted.map((article) => (
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
