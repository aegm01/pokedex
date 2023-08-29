import React, { useContext } from "react";
// import LanguagesContext from "../Context/LanguagesContext";
import "./Footer.css";

const Footer = () => {
  // const { footerText } = useContext(LanguagesContext);
  return (
    <footer className="footer">
      <small>
        {/* {footerText.small1} */}
        <a
          href="https://github.com/aegm01"
          target="_blank"
          rel="noopener noreferrer"
        >
          @aegm01
        </a>
        {`${"   "}`}
      </small>
      <small>
        {/* {footerText.small2} */}
        <a href="https://pokeapi.co/" target="_blank" rel="nooper noreferrer">
          PokéAPI
        </a>
      </small>
    </footer>
  );
};

export default Footer;
