import React from "react";
import Languages from "./Languages";
import "./Header.css";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header>
      <SearchBar />
      <Languages />
    </header>
  );
};

export default Header;
