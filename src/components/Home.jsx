import React, { useContext, useEffect } from "react";
import "./Home.css";
import Pagination from "./Pagination";
import PokemonCards from "./PokemonCards";
import ApiContext from "../context/ApiContext";
import LanguagesContext from "../context/LanguagesContext";

const Home = () => {
  const { pokemons, reset, findPokemonColor, selectedPage } = useContext(ApiContext);
  const { setLanguageInBoolean } = useContext(LanguagesContext);
  const storage = window.localStorage;

  useEffect(() => {
    reset(selectedPage * 24);
    if (!JSON.parse(storage.getItem("language"))) {
      setLanguageInBoolean(false);
      storage.setItem("language", JSON.stringify(false));
    } else {
      setLanguageInBoolean(true);
    }
  }, []);

  return (
    <div className="homeContainer">
      <div className="pokemonContainer">
        {!pokemons
          ? "The pokemon are being captured, please wait a few seconds"
          : pokemons.map((pokemon) => (
              <PokemonCards
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                img={
                  pokemon.sprites?.other?.dream_world?.front_default ||
                  pokemon.sprites?.other?.home?.front_default ||
                  pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                  pokemon.sprites?.front_default
                }
                type={pokemon.types}
                color={findPokemonColor(pokemon.name)}
              />
            ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
