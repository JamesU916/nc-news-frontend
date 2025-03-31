import { useState, useEffect } from "react";
import "./App.css";
import { UserProvider } from "../contexts/User.jsx";
import { getArticles } from "../api.js";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Nav from "../components/Nav";
import Header from "../components/Header";
import AllArticles from "../components/AllArticles";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticles().then(({ data: { articles } }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <UserProvider>
        <div>
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/articles/*"
              element={
                <AllArticles
                  articles={articles}
                  setArticles={setArticles}
                  isLoading={isLoading}
                />
              }
            />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
