import { useState, useEffect } from "react";
import "./App.css";
import { UserProvider } from "./contexts/User.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Nav from "./components/Nav.jsx";
import Header from "./components/Header.jsx";
import AllArticles from "./components/AllArticles.jsx";
import AllTopics from "./components/AllTopics.jsx";
import IndividualArticle from "./components/IndividualArticle.jsx";
import NotFoundError from "./components/NotFoundError.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <div>
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/*" element={<AllArticles />} />
            <Route
              path="/articles/:article_id"
              element={<IndividualArticle />}
            />
            <Route path="/topics/" element={<AllTopics />} />
            <Route path="/*" element={<NotFoundError />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
