import React, { useContext, useEffect } from "react";
import "./pokemonDescription.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ApiContext from "../context/ApiContext";
import LanguagesContext from "../context/LanguagesContext";
import { useState } from "react";

const PokemonDescription = () => {
  const {
    pokemons,
    pokemonIdRequest,
    pokemonInView,
    setPokemonInView,
    findPokemonColor,
    pokemonAbilitiesRequest,
    pokemonAbilities,
    pokemonTypesRequest,
    pokemonDescriptionRequest,
    findTypeAndPlaceSVG,
    pokemonDescription,
    setPokemonAbilities,
    evolutionChainNames,
    pokemonSearchedByName,
    idNumber,
    setIdNumber,
  } = useContext(ApiContext);
  const { languageInBoolean } = useContext(LanguagesContext);
  const [abilityDescriptionIsActive, setAbilityDescriptionIsActive] = useState(false);
  const [abilityInView, setAbilityInView] = useState("none");
  const [opacity, setOpacity] = useState(false);
  const navigate = useNavigate();

  const handlePrevPokemon = () => {
    if (abilityDescriptionIsActive) {
      setAbilityDescriptionIsActive(false);
    }
    pokemonIdRequest(idNumber - 1);
    setTimeout(() => {
      navigate(`/pokemondescription/${idNumber - 1}`);
    }, 1000);
    setPokemonAbilities([]);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setOpacity(true);
    setTimeout(() => setOpacity(false), 1000);
  };

  const handleNextPokemon = () => {
    if (abilityDescriptionIsActive) {
      setAbilityDescriptionIsActive(false);
    }
    pokemonIdRequest(idNumber + 1);
    setTimeout(() => {
      navigate(`/pokemondescription/${idNumber + 1}`);
    }, 1000);
    setPokemonAbilities([]);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    setOpacity(true);
    setTimeout(() => setOpacity(false), 1000);
  };

  const handlePokemonInView = (id, newPokemon = false) => {
    if (id === idNumber) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      return;
    } else {
      if (newPokemon) {
        pokemonIdRequest(id);
      }
      if (abilityDescriptionIsActive) {
        setAbilityDescriptionIsActive(false);
      }
      setPokemonAbilities([]);
      setTimeout(() => {
        console.log(1.5);
        setIdNumber(id);
      }, 1500);
    }

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const calculateProportion = (num1, num2) => {
    const maximum = Math.max(num1, num2);
    const minimum = Math.min(num1, num2);
    const proportion = (minimum / maximum) * 100;
    return `${proportion.toFixed(0)}`;
  };

  useEffect(() => {
    if (idNumber === pokemonSearchedByName.id) {
      pokemonSearchedByName.types.map((type) => {
        pokemonTypesRequest(type.type.url);
      });

      pokemonDescriptionRequest(pokemonSearchedByName.species.url);

      pokemonSearchedByName.abilities.map((ability) => {
        pokemonAbilitiesRequest(ability.ability.url);
      });

      setPokemonInView({
        ["key"]: pokemonSearchedByName.id,
        ["id"]: pokemonSearchedByName.id,
        ["name"]: pokemonSearchedByName.name.charAt(0).toUpperCase() + pokemonSearchedByName.name.slice(1),
        ["img"]:
          pokemonSearchedByName.sprites?.other?.dream_world?.front_default ||
          pokemonSearchedByName.sprites?.other?.home?.front_default ||
          pokemonSearchedByName?.sprites?.other?.["official-artwork"]?.front_default ||
          pokemonSearchedByName?.sprites?.front_default,
        ["color"]: findPokemonColor(pokemonSearchedByName.name),
        ["weight"]: pokemonSearchedByName.weight,
        ["height"]: pokemonSearchedByName.height,
        ["hp"]: pokemonSearchedByName.stats[0].base_stat,
        ["atk"]: pokemonSearchedByName.stats[1].base_stat,
        ["def"]: pokemonSearchedByName.stats[2].base_stat,
        ["satk"]: pokemonSearchedByName.stats[3].base_stat,
        ["sdef"]: pokemonSearchedByName.stats[4].base_stat,
        ["spd"]: pokemonSearchedByName.stats[5].base_stat,
        ["type"]: pokemonSearchedByName.types,
      });

      window.onpopstate = (e) => {
        window.location.href = "/";
      };

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    } else {
      pokemons.map((pokemon) => {
        if (pokemon.id === idNumber) {
          pokemon.types.map((type) => {
            pokemonTypesRequest(type.type.url);
          });
          pokemonDescriptionRequest(pokemon.species.url);
          pokemon.abilities.map((ability) => {
            pokemonAbilitiesRequest(ability.ability.url);
          });
          setPokemonInView({
            ["key"]: pokemon.id,
            ["id"]: pokemon.id,
            ["name"]: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            ["img"]:
              pokemon.sprites?.other?.dream_world?.front_default ||
              pokemon.sprites?.other?.home?.front_default ||
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default,
            ["color"]: findPokemonColor(pokemon.name),
            ["weight"]: pokemon.weight,
            ["height"]: pokemon.height,
            ["hp"]: pokemon.stats[0].base_stat,
            ["atk"]: pokemon.stats[1].base_stat,
            ["def"]: pokemon.stats[2].base_stat,
            ["satk"]: pokemon.stats[3].base_stat,
            ["sdef"]: pokemon.stats[4].base_stat,
            ["spd"]: pokemon.stats[5].base_stat,
            ["type"]: pokemon.types,
          });
        }
      });

      window.onpopstate = (e) => {
        window.location.href = "/";
      };

      if (!pokemons.some((pokemon) => pokemon.id === idNumber)) {
        window.location.href = "/";
      }

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [idNumber]);

  if (!pokemonInView) {
    window.location.href = "/";
  } else {
    return (
      <div className={`descriptionContainer ${pokemonInView.color}`}>
        <div className="headerDescription">
          <NavLink to={`/`}>
            <img src="/arrow-left.svg" alt="BackHome" />
          </NavLink>
          <h1>{pokemonInView.name}</h1>
          <h3>{`#${String(pokemonInView.id).padStart(3, 0)}`}</h3>
        </div>
        <div className="imgAndArrowsContainer">
          <NavLink onClick={opacity ? "" : handlePrevPokemon} to={`/pokemondescription/${idNumber - 1}`}>
            <img src="/chevron-left.svg" className={`arrow ${opacity ? "opacity" : ""}`} alt="Back" />
          </NavLink>
          <img src={pokemonInView.img} className="imgPokemon" alt="Pokemon" />
          <NavLink onClick={opacity ? "" : handleNextPokemon} to={`/pokemondescription/${idNumber + 1}`}>
            <img src="/chevron-right.svg" className={`arrow ${opacity ? "opacity" : ""}`} alt="Forward" />
          </NavLink>
        </div>
        <div className="typeAndAboutContainer">
          <div className={`containerTypes ${pokemonInView.color + "B"}`}>
            {pokemonInView && pokemonInView.type && pokemonInView.type.map((i) => findTypeAndPlaceSVG(i.type.name))}
          </div>
          <h2 className={`about ${pokemonInView.color + "C"}`}>{languageInBoolean ? "Acerca" : "About"}</h2>
          <div className="weightHeightAndAbilitiesContainer">
            <div className="weight">
              <div>
                <img src="/scale.svg" alt="Scale" />
                {`${pokemonInView.weight} kg`}
                <h4>{`${languageInBoolean ? "Peso" : "Weight"} `}</h4>
              </div>
            </div>
            <div className="height">
              <div>
                <img src="/ruler.svg" alt="Ruler" />
                {`${pokemonInView.height} m`}
                <h4>{`${languageInBoolean ? "Altura" : "Height"} `}</h4>
              </div>
            </div>
            <div className="abilities">
              {languageInBoolean ? (
                <>
                  {Object.keys(pokemonAbilities).map((key) => (
                    <div
                      key={key}
                      onClick={() => {
                        setAbilityDescriptionIsActive(true);
                        setAbilityInView(key);
                      }}
                    >
                      <h2>{pokemonAbilities[key].name_es}</h2>
                      <img src="/help.svg" className="help" alt="help" />
                    </div>
                  ))}
                  <h4>Movimientos</h4>
                </>
              ) : (
                <>
                  {Object.keys(pokemonAbilities).map((key) => (
                    <div
                      key={key}
                      onClick={() => {
                        setAbilityDescriptionIsActive(true);
                        setAbilityInView(key);
                      }}
                    >
                      <h2>{pokemonAbilities[key].name_en}</h2>
                      <img src="/help.svg" className="help" alt="help" />
                    </div>
                  ))}
                  <h4>Moves</h4>
                </>
              )}
            </div>

            {abilityDescriptionIsActive ? (
              languageInBoolean ? (
                <div className="abilityDescription" key={abilityInView}>
                  <div>
                    <p>{`${pokemonAbilities[abilityInView].name_es}: ${pokemonAbilities[abilityInView].description_es}`}</p>
                    <p
                      onClick={() => {
                        setAbilityDescriptionIsActive(false);
                      }}
                      className="btnAbilityDescription"
                    >
                      x
                    </p>
                  </div>
                </div>
              ) : (
                <div className="abilityDescription" key={abilityInView}>
                  <div>
                    <p>{`${pokemonAbilities[abilityInView].name_en}: ${pokemonAbilities[abilityInView].description_en}`}</p>
                    <p
                      onClick={() => {
                        setAbilityDescriptionIsActive(false);
                      }}
                      className="btnAbilityDescription"
                    >
                      x
                    </p>
                  </div>
                </div>
              )
            ) : (
              ""
            )}
          </div>
          <p className="description">
            {languageInBoolean
              ? pokemonDescription && pokemonDescription.description && pokemonDescription.description.description_es
              : pokemonDescription && pokemonDescription.description && pokemonDescription.description.description_en}
          </p>
          <div className="baseStats">
            <p>{languageInBoolean ? "Estadisticas bases" : "Base Stats"}</p>
            <div>
              <div className="bar">
                <p>HP</p>
                <div
                  style={{
                    width: `100%`,
                    background: `#bdbfc4`,
                  }}
                >
                  <p
                    style={{
                      width: `${Math.round(
                        calculateProportion(pokemonInView.hp, Math.round(pokemonInView.hp * 2 + 204))
                      )}%`,
                    }}
                    className={pokemonInView.color}
                  >
                    {` ${pokemonInView.hp}/${Math.round(pokemonInView.hp * 2 + 204)}`}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="bar">
                <p>ATK</p>
                <div
                  style={{
                    width: `100%`,
                    background: `#bdbfc4`,
                  }}
                >
                  <p
                    style={{
                      width: `${Math.round(
                        calculateProportion(pokemonInView.atk, Math.round((pokemonInView.atk * 2 + 99) * 1.1))
                      )}%`,
                    }}
                    className={pokemonInView.color}
                  >
                    {` ${pokemonInView.atk}/${Math.round((pokemonInView.atk * 2 + 99) * 1.1)}`}
                  </p>
                </div>
              </div>

              <div className="bar">
                <p>DEF</p>
                <div
                  style={{
                    width: `100%`,
                    background: `#bdbfc4`,
                  }}
                >
                  <p
                    style={{
                      width: `${Math.round(
                        calculateProportion(pokemonInView.def, Math.round((pokemonInView.def * 2 + 99) * 1.1))
                      )}%`,
                    }}
                    className={pokemonInView.color}
                  >
                    {` ${pokemonInView.def}/${Math.round((pokemonInView.def * 2 + 99) * 1.1)}`}
                  </p>
                </div>
              </div>
              <div className="bar">
                <p>SATK</p>
                <div
                  style={{
                    width: `100%`,
                    background: `#bdbfc4`,
                  }}
                >
                  <p
                    style={{
                      width: `${Math.round(
                        calculateProportion(pokemonInView.satk, Math.round((pokemonInView.satk * 2 + 99) * 1.1))
                      )}%`,
                    }}
                    className={pokemonInView.color}
                  >
                    {` ${pokemonInView.satk}/${Math.round((pokemonInView.satk * 2 + 99) * 1.1)}`}
                  </p>
                </div>
              </div>
              <div className="bar">
                <p>SDEF</p>
                <div
                  style={{
                    width: `100%`,
                    background: `#bdbfc4`,
                  }}
                >
                  <p
                    style={{
                      width: `${Math.round(
                        calculateProportion(pokemonInView.sdef, Math.round((pokemonInView.sdef * 2 + 99) * 1.1))
                      )}%`,
                    }}
                    className={pokemonInView.color}
                  >
                    {` ${pokemonInView.sdef}/${Math.round((pokemonInView.sdef * 2 + 99) * 1.1)}`}
                  </p>
                </div>
              </div>
              <div className="bar">
                <p>SPD</p>
                <div
                  style={{
                    width: `100%`,
                    background: `#bdbfc4`,
                  }}
                >
                  <p
                    style={{
                      width: `${Math.round(
                        calculateProportion(pokemonInView.spd, Math.round((pokemonInView.spd * 2 + 99) * 1.1))
                      )}%`,
                    }}
                    className={pokemonInView.color}
                  >
                    {` ${pokemonInView.spd}/${Math.round((pokemonInView.spd * 2 + 99) * 1.1)}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="evolutionChain">
            <p>{languageInBoolean ? "Cadena de evolución" : "Evolution chain"}</p>
            <div className="evolutionChainContainer">
              <NavLink
                onClick={() => {
                  handlePokemonInView(evolutionChainNames?.first?.id, true);
                }}
                to={`/pokemondescription/${evolutionChainNames?.first?.id}`}
              >
                <img
                  src={
                    evolutionChainNames?.first?.sprites?.other?.dream_world?.front_default ||
                    evolutionChainNames?.first?.sprites?.other?.home?.front_default ||
                    evolutionChainNames?.first?.sprites?.other?.["official-artwork"]?.front_default ||
                    evolutionChainNames?.first?.sprites?.front_default
                  }
                  alt="First"
                />
              </NavLink>

              {evolutionChainNames?.second && (
                <>
                  <img src="/chevron-right.svg" className="arrow" alt="Forward" />
                  <NavLink
                    onClick={() => {
                      handlePokemonInView(evolutionChainNames?.second?.id, true);
                    }}
                    to={`/pokemondescription/${evolutionChainNames?.second?.id}`}
                  >
                    <img
                      src={
                        evolutionChainNames?.second?.sprites?.other?.dream_world?.front_default ||
                        evolutionChainNames?.second?.sprites?.other?.home?.front_default ||
                        evolutionChainNames?.second?.sprites?.other?.["official-artwork"]?.front_default ||
                        evolutionChainNames?.second?.sprites?.front_default
                      }
                      alt="Second"
                    />
                  </NavLink>
                </>
              )}

              {evolutionChainNames?.third && (
                <>
                  <img src="/chevron-right.svg" className="arrow" alt="Forward" />

                  <NavLink
                    onClick={() => {
                      handlePokemonInView(evolutionChainNames?.third?.id, true);
                    }}
                    to={`/pokemondescription/${evolutionChainNames?.third?.id}`}
                  >
                    <img
                      src={
                        evolutionChainNames?.third?.sprites?.other?.dream_world?.front_default ||
                        evolutionChainNames?.third?.sprites?.other?.home?.front_default ||
                        evolutionChainNames?.third?.sprites?.other?.["official-artwork"]?.front_default ||
                        evolutionChainNames?.third?.sprites?.front_default
                      }
                      alt="Third"
                    />
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonDescription;
