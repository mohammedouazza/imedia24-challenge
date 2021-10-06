import React from "react";
import PokemonDetail from "./PokemonDetail";
import PokemonList from "./PokemonList";

function Home() {
  return (
    <div>
      <PokemonList />
      <br />
      <PokemonDetail />
    </div>
  );
}

export default Home;
