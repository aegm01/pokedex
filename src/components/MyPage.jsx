import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import PokemonDescription from "./PokemonDescription";
import Error404 from "./Error404";

const MyPage = () => {
  return (
    <div>
      <HashRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/pokemondescription/:id"
            element={<PokemonDescription />}
          />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default MyPage;
