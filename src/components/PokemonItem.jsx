import React from "react";

function PokemonItem({ item, selectPoke }) {
  return (
    <li className="pokemon-item">
      <div className="max-w-xxl py-2 px-4 bg-white shadow-lg rounded-lg my-10">
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </h2>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="text-xl font-medium text-indigo-500 pokemon-show"
            onClick={() => selectPoke(item)}
          >
            Show
          </button>
        </div>
      </div>
    </li>
  );
}

export default PokemonItem;
