import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonDetail from "./PokemonDetail";
import PokemonItem from "./PokemonItem";

function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const [showModal, setShowModal] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(null);

  const getPokemons = () => {
    dispatch({ type: "POKEMONS_FETCH_REQUESTED" });
  };
  useEffect(() => {
    if (!pokemons.length) getPokemons();
  });

  const selectPoke = (poke) => {
    setSelectedPoke(poke);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <ul className="flex flex-wrap justify-start">
        {pokemons.map((pokemon, idx) => (
          <PokemonItem key={idx} item={pokemon} selectPoke={selectPoke} />
        ))}
      </ul>
      <br />
      {showModal && (
        <PokemonDetail item={selectedPoke} closeModal={closeModal} />
      )}
    </>
  );
}

export default PokemonList;
