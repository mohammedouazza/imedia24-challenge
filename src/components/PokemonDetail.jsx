import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function PokemonDetail({ item, closeModal }) {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector(
    (state) => state.pokemons.selectedPokemon
  );
  const getselectedPokemon = () => {
    dispatch({ type: "POKEMON_ITEM_REQUESTED", payload: item });
  };
  useEffect(() => {
    if (!selectedPokemon) getselectedPokemon();
  });
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none pokemon-modal">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              {selectedPokemon ? (
                <ul className="px-0">
                  <li className="border list-none rounded-sm px-3 py-3">
                    Types:{" "}
                    {selectedPokemon.types.map((type, idx) => (
                      <strong key={idx}>{type.type.name}, </strong>
                    ))}
                  </li>
                  <li className="border list-none rounded-sm px-3 py-3">
                    Height: <strong>{selectedPokemon.height}</strong>
                  </li>
                  <li className="border list-none rounded-sm px-3 py-3">
                    Weight: <strong>{selectedPokemon.weight}</strong>
                  </li>
                  <li className="border list-none rounded-sm px-3 py-3">
                    Abilities:{" "}
                    {selectedPokemon.abilities.map((ability, idx) => (
                      <strong key={idx}>{ability.ability.name}, </strong>
                    ))}
                  </li>
                  <li className="border list-none rounded-sm px-3 py-3">
                    Base Stats:{" "}
                    {selectedPokemon.stats.map((stat, idx) => (
                      <strong key={idx}>{stat.base_stat}, </strong>
                    ))}
                  </li>
                  <li className="border list-none rounded-sm px-3 py-3">
                    Moves:{" "}
                    {selectedPokemon.moves.map((move, idx) => (
                      <strong key={idx}>{move.move.name}, </strong>
                    ))}
                  </li>
                </ul>
              ) : (
                <Loading />
              )}
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 modal-close"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default PokemonDetail;
