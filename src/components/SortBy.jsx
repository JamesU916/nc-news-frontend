import { useState } from "react";

const SortBy = ({
  onSortChange,
  defaultSort = "created_at",
  defaultOrder = "desc",
}) => {
  const [sortBy, setSortBy] = useState(defaultSort);
  const [order, setOrder] = useState(defaultOrder);

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSortBy(newSort);
    onSortChange(newSort, order);
  };

  const toggleOrder = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    onSortChange(sortBy, newOrder);
  };

  return (
    <div className="mb-3 d-flex gap-3 align-items-center">
      <label htmlFor="sortBy">Sort by:</label>
      <select id="sortBy" value={sortBy} onChange={handleSortChange}>
        <option value="created_at">Date Created</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Number of Comments</option>
      </select>

      <label htmlFor="order">Order: </label>
      <select id="order" value={order} onChange={toggleOrder}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortBy;
