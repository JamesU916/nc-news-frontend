import { useState } from "react";

const usePostRequest = (apiFunction) => {
  const [data, setData] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const startPost = (...args) => {
    setIsPosting(true);
    setError(null);
    setSuccess(null);

    return apiFunction(...args)
      .then((response) => {
        setData(response);
        setSuccess("Comment posted!");
        return response;
      })
      .catch((error) => {
        setError({ status: 400, statusText: "Failed to post comment" });
        throw error;
      })
      .finally(() => {
        setIsPosting(false);
      });
  };
  return { startPost, data, isPosting, error, success };
};

export default usePostRequest;
