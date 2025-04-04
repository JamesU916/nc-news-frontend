import { useState, useEffect } from "react";
import TopicCard from "./TopicCard";
import { getTopics } from "../../api.js";
import useApiRequest from "../hooks/useApiRequest.jsx";

const AllTopics = () => {
  const { data: topics, isLoading, error } = useApiRequest(getTopics);
  if (isLoading)
    return <div className="spinner-border text-primary" role="status"></div>;
  if (error) return { error };

  return (
    <div className="container mt-3">
      <div className="row">
        {topics.map((topic) => (
          <div className="col-12 col-md-4 mb-4" key={topic.slug}>
            <div className="border p-3 article-hover">
              <TopicCard topic={topic} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTopics;
