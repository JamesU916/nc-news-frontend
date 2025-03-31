import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-app-n7gp.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles");
};
