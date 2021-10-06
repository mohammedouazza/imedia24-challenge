import React from "react";

function PokemonItem({ item }) {
  return (
    <li>
      <a href="#">Name: {item.name}</a>
    </li>
  );
}

export default PokemonItem;
