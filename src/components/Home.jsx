import React, { lazy, Suspense } from "react";
import Loading from "./Loading";
const PokemonList = lazy(() => import("./PokemonList"));

function Home() {
  return (
    <div className="container mx-auto home-page">
      <h1 className="text-gray-800 text-3xl font-semibold text-center mt-4 mb-4 home-title">
        Pokemons list:
      </h1>
      <Suspense fallback={<Loading />}>
        <PokemonList />
      </Suspense>
    </div>
  );
}

export default Home;
