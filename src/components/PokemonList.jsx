import React, { useState, useEffect } from "react";
import PokemonItem from "./PokemonItem";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  const getPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((resp) => resp.json())
      .then((data) => {
        setPokemons(data.results);
      });
  };
  useEffect(() => {
    if (!pokemons.length) getPokemons();
  }, [pokemons]);
  return (
    <ul>
      {pokemons.map((pokemon, idx) => (
        <PokemonItem key={idx} item={pokemon} />
      ))}
    </ul>
  );
}

export default PokemonList;
