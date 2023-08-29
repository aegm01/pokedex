import React, { useContext, useEffect, useState } from "react";
import "./SearchBar.css";
import LanguagesContext from "../context/LanguagesContext";
import ApiContext from "../context/ApiContext";
import { NavLink, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { languageInBoolean } = useContext(LanguagesContext);
  const { pokemonIdRequest, pokemonsNames, pokemonSearchedByName, setIdNumber } = useContext(ApiContext);
  const [searchValue, setSearchValue] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const filteredID = [];

    switch (Number(e.target.value)) {
      case Number(e.target.value) === 0:
        break;
      case Number(e.target.value) === NaN:
        break;
      default:
        if (Number(e.target.value) <= 1010) {
          filteredID.push(e.target.value);

          setSearchValue(filteredID);
        }
        break;
    }

    pokemonsNames.filter((pokemon) => {
      if (Object.keys(pokemon)[0].includes(e.target.value.toLocaleLowerCase())) {
        if (e.target.value.toLocaleLowerCase() === "") {
          return;
        } else if (filteredID.length < 6) {
          filteredID.push(Object.values(pokemon));
        }
      }
    });
    setSearchValue(filteredID);
  };

  function handleSearch(event) {
    event.preventDefault();
    if (searchValue.length === 1) {
      pokemonIdRequest(searchValue);
      setTimeout(() => {
        navigate(`/pokemondescription/${pokemonSearchedByName.id}`);
      }, 1000);
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        className="searchBar"
        type="text"
        name="searchBar"
        placeholder={languageInBoolean ? "Busqueda por ID o Nombre" : "Search by ID or Name"}
        autoComplete="off"
        onChange={handleInputChange}
        required
      />
    </form>
  );
};

export default SearchBar;
