import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-app-n7gp.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
};

export const getArticleById = (articleId) => {
  return api.get(`/articles/${articleId}`).then((response) => {
    return response.data.article;
  });
};

export const getArticleCommentsById = (articleId) => {
  return api.get(`/articles/${articleId}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const patchArticleVotes = (articleId, inc_votes) => {
  return api.patch(`/articles/${articleId}`, { inc_votes }).then((response) => {
    return response.data;
  });
};

export const postComment = (articleId, comment) => {
  return api
    .post(`/articles/${articleId}/comments`, comment)
    .then((response) => {
      return response.data.comment;
    });
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
