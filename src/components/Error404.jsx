import React, { useContext } from "react";
import "./Error404.css";
import LanguagesContext from "../context/LanguagesContext";

const Error404 = () => {
  const { languageInBoolean } = useContext(LanguagesContext);

  return (
    <div className="error404">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
        alt=":("
      />
      <h1>Error 404</h1>
      <h2>{languageInBoolean ? "Página no encontrada." : "Page not found."}</h2>
      <p>
        {languageInBoolean
          ? "La página que busca no existe o está en construcción."
          : "The page you are looking for does't exist or is under construction."}
      </p>
    </div>
  );
};

export default Error404;
