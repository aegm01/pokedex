import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const storage = window.localStorage;
  const [pokemons, setPokemons] = useState([]);
  const [pokemonSearchedById, setPokemonSearchedById] = useState([]);
  const [pokemonSearchedByName, setPokemonSearchedByName] = useState([]);
  const [pokemonsColor, setPokemonsColor] = useState([]);
  const [pokemonsNames, setPokemonsNames] = useState([]);
  const [pokemonInView, setPokemonInView] = useState();
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonDescription, setPokemonDescription] = useState([]);
  const [evolutionChainNames, setEvolutionChainNames] = useState([]);
  const [abilitiesInView, setAbilitiesInView] = useState("");
  const [idNumber, setIdNumber] = useState();
  const [pageNumber, setPageNumber] = useState([0, 1, 2, 3, 4]);
  const [selectedPage, setSelectedPage] = useState(0);

  const pokemonRequest = async (min = 0) => {
    try {
      //Solicitud api de los pokemon
      axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${24}&offset=${min}`).then(async (res) => {
        let pokemonsArray = [];
        // Por cada resultado buscamos la info
        await axios.all(
          res.data.results.map((pokemon) => {
            //Solicitud api del pokemon
            return axios.get(pokemon.url).then((res) => {
              // Guardamos la respuesta de la api https://pokeapi.co/api/v2/pokemon/[ID]/

              if (!pokemonsArray.includes(res.data)) {
                pokemonsArray.push(res.data);
              }
            });
          })
        );

        setPokemons(
          pokemonsArray.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          })
        );
      });
    } catch (error) {
      // Manejo de errores
      console.log(`pokemonRequest: ${error}`);
    }
  };

  const pokemonIdRequest = async (id, positionChainEvolution = false) => {
    try {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(async (res) => {
        if (positionChainEvolution) {
          setEvolutionChainNames((prevEvolutionChainNames) => ({
            ...prevEvolutionChainNames,
            [positionChainEvolution]: res.data,
          }));
        } else {
          reset(selectedPage * 24);
          setPokemonSearchedByName(res.data);
          setIdNumber(res.data.id);
        }
      });
    } catch (error) {
      // Manejo de errores
      console.log(`pokemonIdRequest: ${error}`);
    }
  };

  const pokemonsColorRequest = async () => {
    if (!localStorage.getItem("pokemonsColor")) {
      try {
        //Solicitud api de los colores de los pokemons
        axios.get("https://pokeapi.co/api/v2/pokemon-color/?limit=10&offset=0%22").then(async (res) => {
          let pokemonsColor = [];
          // Por cada resultado buscamos la info
          await axios.all(
            res.data.results.map((pokemon) => {
              //Solicitud api del pokemon
              return axios.get(pokemon.url).then((res) => {
                // Guardamos la respuesta de la api https://pokeapi.co/api/v2/pokemon/[ID]/

                if (!pokemonsColor.includes(res.data)) {
                  pokemonsColor.push(res.data);
                }
                // Comentario: Se puede guardar solo lo que es necesario, ej, name, sprites, etc.
              });
            })
          );

          storage.setItem("pokemonsColor", JSON.stringify(pokemonsColor));
        });
      } catch (error) {
        // Manejo de errores
        console.log(`pokemonsColorRequest: ${error}`);
      }
    } else {
      setPokemonsColor(JSON.parse(storage.getItem("pokemonsColor")));
    }
  };

  const pokemonsNamesRequest = async () => {
    if (pokemonsNames.length === 0) {
      try {
        //Solicitud api de los nombres de los pokemons
        axios.get("https://pokeapi.co/api/v2/pokedex/national").then(async (res) => {
          const pokemonsNamesArray = [];
          res.data.pokemon_entries.map((pokemon) => {
            pokemonsNamesArray.push({ [pokemon.pokemon_species.name]: pokemon.entry_number });
          });
          setPokemonsNames(pokemonsNamesArray);
        });
      } catch (error) {
        // Manejo de errores
        console.log(`pokemonsNamesRequest: ${error}`);
      }
    }
  };

  const pokemonAbilitiesRequest = async (url) => {
    try {
      const res = await axios.get(url);
      const { name, names, flavor_text_entries } = res.data;

      const abilityData = {
        name_es: "", // Nombre en español
        description_es: "", // Descripción en español
        name_en: "", // Nombre en inglés
        description_en: "", // Descripción en inglés
      };

      // Busca las entradas en español e inglés
      flavor_text_entries.forEach((entry) => {
        if (entry.language.name === "es") {
          abilityData.description_es = entry.flavor_text;
        } else if (entry.language.name === "en") {
          abilityData.description_en = entry.flavor_text;
        }
      });

      names.forEach((entry) => {
        if (entry.language.name === "es") {
          abilityData.name_es = entry.name;
        } else if (entry.language.name === "en") {
          abilityData.name_en = entry.name;
        }
      });

      setPokemonAbilities((prevAbilities) => ({
        ...prevAbilities,
        [name]: abilityData,
      }));
    } catch (error) {
      // Manejo de errores
      console.log(`pokemonAbilitiesRequest: ${error}`);
    }
  };

  const pokemonTypesRequest = async (url) => {
    try {
      const res = await axios.get(url);
      const { name, names } = res.data;

      const typesData = {
        type_es: "", // Nombre en español
        type_en: "", // Nombre en inglés
      };

      // Busca las entradas en español e inglés
      names.forEach((entry) => {
        if (entry.language.name === "es") {
          typesData.type_es = entry.name;
        } else if (entry.language.name === "en") {
          typesData.type_en = entry.name;
        }
      });

      setPokemonTypes((prevTypes) => ({
        ...prevTypes,
        [name]: typesData,
      }));
    } catch (error) {
      // Manejo de errores
      console.log(`pokemonTypesRequest: ${error}`);
    }
  };

  const pokemonDescriptionRequest = async (url) => {
    try {
      const res = await axios.get(url);
      const { flavor_text_entries } = res.data;

      const descriptionData = {
        description_es: "", // Descripcion en español
        description_en: "", // Descripcion en inglés
      };

      // Busca las entradas en español e inglés
      flavor_text_entries.forEach((entry) => {
        if (entry.language.name === "es") {
          descriptionData.description_es = entry.flavor_text;
        } else if (entry.language.name === "en") {
          descriptionData.description_en = entry.flavor_text;
        }
      });

      setPokemonDescription((prevDescription) => ({
        ...prevDescription,
        ["description"]: descriptionData,
      }));
      pokemonEvolutionChainRequest(res.data.evolution_chain.url);
    } catch (error) {
      // Manejo de errores
      console.log(`pokemonDescriptionRequest: ${error}`);
    }
  };

  const pokemonEvolutionChainRequest = async (url) => {
    try {
      const res = await axios.get(url);

      const evolutionChain = {
        ["first"]: res.data.chain.species.name,
      };

      if (res.data.chain.evolves_to[0]) {
        evolutionChain["second"] = res.data.chain.evolves_to[0].species.name;
      }

      if (res.data.chain.evolves_to[0]?.evolves_to[0]) {
        evolutionChain["third"] = res.data.chain.evolves_to[0].evolves_to[0].species.name;
      }

      const filledEvolutionChain = { ...evolutionChain };

      const missingPokemon = [];
      for (const key in filledEvolutionChain) {
        if (filledEvolutionChain[key].length) {
          if (!missingPokemon.includes(filledEvolutionChain[key])) {
            pokemonsNames.filter((pokemon) => {
              if (Object.keys(pokemon).includes(filledEvolutionChain[key])) {
                return missingPokemon.push({ [key]: Number(Object.values(pokemon)) });
              }
            });
          }
        }
      }

      missingPokemon.map((id) => {
        for (const key in filledEvolutionChain) {
          if (id[key] != undefined) {
            pokemonIdRequest(id[key], key);
          }
        }
      });

      setEvolutionChainNames(missingPokemon);
    } catch (error) {
      // Manejo de errores
      console.log(`pokemonEvolutionChainRequest: ${error}`);
    }
  };

  function reset(request = 0) {
    pokemonsColorRequest();
    pokemonsNamesRequest();
    pokemonRequest(request);
    setPokemonInView([]);
    setPokemonAbilities([]);
    setPokemonTypes([]);
    setEvolutionChainNames([]);
  }

  function findPokemonColor(pokemon) {
    const foundColor = pokemonsColor.find((value) => value.pokemon_species.some((arr) => arr.name === pokemon));

    if (foundColor) {
      return foundColor.name;
    }

    // Si no se encuentra el color, puedes retornar un valor por defecto o manejarlo de otra manera
    return "default-color";
  }

  function findTypeAndPlaceSVG(value) {
    switch (value) {
      case "bug":
        return <img src="/bug.svg" key={value} />;
        break;
      case "dark":
        return <img src="/dark.svg" key={value} />;
        break;
      case "dragon":
        return <img src="/dragon.svg" key={value} />;
        break;
      case "electric":
        return <img src="/electric.svg" key={value} />;
        break;
      case "fairy":
        return <img src="/fairy.svg" key={value} />;
        break;
      case "fighting":
        return <img src="/fighting.svg" key={value} />;
        break;
      case "fire":
        return <img src="/fire.svg" key={value} />;
        break;
      case "flying":
        return <img src="/flying.svg" key={value} />;
        break;
      case "ghost":
        return <img src="/ghost.svg" key={value} />;
        break;
      case "grass":
        return <img src="/grass.svg" key={value} />;
        break;
      case "ground":
        return <img src="/ground.svg" key={value} />;
        break;
      case "ice":
        return <img src="/ice.svg" key={value} />;
        break;
      case "normal":
        return <img src="/normal.svg" key={value} />;
        break;
      case "poison":
        return <img src="/poison.svg" key={value} />;
        break;
      case "psychic":
        return <img src="/psychic.svg" key={value} />;
        break;
      case "rock":
        return <img src="/rock.svg" key={value} />;
        break;
      case "steel":
        return <img src="/steel.svg" key={value} />;
        break;
      case "water":
        return <img src="/water.svg" key={value} />;
        break;

      default:
        break;
    }
  }

  const receiveData = {
    pokemonRequest,
    pokemonIdRequest,
    pokemons,
    pokemonsColorRequest,
    pokemonsColor,
    pokemonsNamesRequest,
    pokemonsNames,
    reset,
    findPokemonColor,
    pokemonInView,
    setPokemonInView,
    pokemonAbilitiesRequest,
    setPokemonAbilities,
    pokemonAbilities,
    pokemonTypesRequest,
    setPokemonTypes,
    pokemonTypes,
    pokemonDescriptionRequest,
    findTypeAndPlaceSVG,
    pokemonDescription,
    setPokemonDescription,
    abilitiesInView,
    setAbilitiesInView,
    evolutionChainNames,
    pokemonSearchedByName,
    setIdNumber,
    idNumber,
    pageNumber,
    setPageNumber,
    selectedPage,
    setSelectedPage,
  };

  return <ApiContext.Provider value={receiveData}>{children}</ApiContext.Provider>;
};

export { ApiProvider };
export default ApiContext;
