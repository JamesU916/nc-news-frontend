import { useState } from "react";

const usePatchRequest = (apiFunction) => {
  const [data, setData] = useState(null);
  const [isPatching, setIsPatching] = useState(false);
  const [error, setError] = useState(null);

  const startPatch = (...args) => {
    setIsPatching(true);
    setError(null);

    return apiFunction(...args)
      .then((response) => {
        setData(response);
        return response;
      })
      .catch((error) => {
        setError({ status: 400, statusText: "Failed to change vote" });
        throw error;
      })
      .finally(() => {
        setIsPatching(false);
      });
  };
  return { startPatch, data, isPatching, error };
};

export default usePatchRequest;
