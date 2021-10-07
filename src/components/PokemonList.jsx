import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import PokemonDetail from "./PokemonDetail";
import PokemonItem from "./PokemonItem";

function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const [showModal, setShowModal] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(null);
  const [scrollNumber, setScrollNumber] = useState(5);
  const [infinitLoading, setInfinitLoading] = useState(false);

  const getPokemons = () => {
    dispatch({ type: "POKEMONS_FETCH_REQUESTED" });
  };

  const scrollFunction = () => {
    if (
      window.scrollY + window.innerHeight ===
      document.documentElement.offsetHeight
    ) {
      if (scrollNumber <= pokemons.length) {
        setInfinitLoading(true);
        setTimeout(() => {
          setScrollNumber(scrollNumber + 5);
          setInfinitLoading(false);
        }, 1000);
      }
    }
  };
  useEffect(() => {
    if (!pokemons.length) getPokemons();
  });

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
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
      <ul
        className="flex flex-col text-center pokemon-list"
        data-testid="list-items"
      >
        {pokemons.slice(0, scrollNumber).map((pokemon, idx) => (
          <PokemonItem key={idx} item={pokemon} selectPoke={selectPoke} />
        ))}
      </ul>
      {infinitLoading && <Loading />}
      <br />
      {showModal && (
        <PokemonDetail item={selectedPoke} closeModal={closeModal} />
      )}
    </>
  );
}

export default PokemonList;
