import { useState } from "react";

const useDeleteRequest = (apiFunction) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const startDelete = (...args) => {
    setIsDeleting(true);
    setError(null);

    return apiFunction(...args)
      .catch((error) => {
        setError({ status: 400, statusText: "Failed to delete" });
        throw error;
      })
      .finally(() => {
        setIsPatching(false);
      });
  };
  return { startDelete, isDeleting, error };
};

export default useDeleteRequest;
