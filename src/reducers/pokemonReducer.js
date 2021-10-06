import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  selectedPokemon: null,
};

const pokemonReducer = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setPokemonItem: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const { setPokemons, setPokemonItem } = pokemonReducer.actions;

export default pokemonReducer.reducer;
