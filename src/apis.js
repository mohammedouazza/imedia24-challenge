const Api = {
  fetchPokemons: async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon/").then(
      (resp) => resp.json()
    );
    return data.results;
  },
  fetchPokemonItem: async (item) => {
    const data = await fetch(item.url).then((resp) => resp.json());
    return data;
  },
};

export default Api;
