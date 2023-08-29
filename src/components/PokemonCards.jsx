import React, { useContext } from "react";
import "./PokemonCard.css";
import { NavLink } from "react-router-dom";
import ApiContext from "../context/ApiContext";

const PokemonCards = ({ id, name, img, type, color }) => {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const { pokemonsColor, findTypeAndPlaceSVG, setIdNumber } = useContext(ApiContext);

  return (
    <NavLink
      className={`containerPokemonCard ${color}`}
      to={`/pokemondescription/${id}`}
      onClick={() => {
        setIdNumber(id);
      }}
    >
      <div className="idAndName">
        <span>{id}</span>
        <span>{name}</span>
      </div>
      <div className="containerType">{type.map((i) => findTypeAndPlaceSVG(i.type.name))}</div>
      <div className="containerImg">
        <img className="imgPokemon" src={img} alt="" />
      </div>
    </NavLink>
  );
};

export default PokemonCards;
