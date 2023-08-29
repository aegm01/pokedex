import React, { useContext } from "react";
import "./Pagination.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ApiContext from "../context/ApiContext";

// Te permite navegar entre paginas y de esta manera vas a poder cargar todos los pokemon sin cargar la api. Porque se guarda en localstore hasta que pases de pagina, ahi se borra y se carga con los siguientes pokemons u otro elemento (Hacer un swit case para permitir variar entre pokemon, item y bayas)

// Son 42 paginas maximo (2 pokemon van a quedar afuera, son 1010 y solo se van a mostrar 1008 para no desmaquetar todo)
const Pagination = () => {
  const { pokemonRequest, pageNumber, setPageNumber, selectedPage, setSelectedPage, reset } = useContext(ApiContext);
  const [opacity, setOpacity] = useState(false);

  // pageNumber - Establece los 5 valores anteriores y posteriores de la pagina en vista
  // selectedPage - Establece la pagina en vista y permite colocar el redondel
  // reset - permite resetear y realizar la peticion correspondiente de la cantidad de pokemon que se deberian pedir

  function pageSelectorHandler(page) {
    if (opacity === true) {
      return;
    } else {
      setOpacity(true);
      setTimeout(() => setOpacity(false), 3000);

      reset((page - 1) * 24);
      setSelectedPage(page - 1);
      if (page <= 3) {
        setPageNumber([0, 1, 2, 3, 4]);
      } else if (page <= 40) {
        setPageNumber([page - 3, page - 2, page - 1, page, page + 1]);
      } else if (page <= 43) {
        setPageNumber([38, 39, 40, 41, 42]);
      }

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  return (
    <div className={opacity ? "paginationContainer opacity" : "paginationContainer"}>
      <ul>
        <img
          className="arrowDouble"
          onClick={() => {
            pageSelectorHandler(1);
          }}
          src="/arrow-double-start.svg"
          alt="Arrow-Double-Start"
        />

        {pageNumber.map((page) => {
          return (
            <li
              key={page}
              onClick={() => {
                pageSelectorHandler(page + 1);
              }}
              className={selectedPage === page ? "activedPage" : ""}
            >{`${page + 1}`}</li>
          );
        })}

        <img
          className="arrowDouble"
          onClick={() => {
            pageSelectorHandler(43);
          }}
          src="/arrow-double-end.svg"
          alt="Arrow-Double-End"
        />
      </ul>
    </div>
  );
};

export default Pagination;
