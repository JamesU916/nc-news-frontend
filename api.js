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

export const patchArticleVotes = (articleId) => {
  return api.patch(`/articles/${articleId}`, { inc_votes });
};
