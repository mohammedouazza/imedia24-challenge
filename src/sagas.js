import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import Api from "./apis";
import { setPokemonItem, setPokemons } from "./reducers/pokemonReducer";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchPokemons() {
  try {
    const pokemons = yield call(Api.fetchPokemons);
    yield put(setPokemons(pokemons));
  } catch (e) {
    yield put({ type: "POKEMONS_FETCH_FAILED", message: e.message });
  }
}

function* fetchPokemonItem(action) {
  try {
    const pokemonItem = yield call(Api.fetchPokemonItem, action.payload);
    yield put(setPokemonItem(pokemonItem));
  } catch (e) {
    yield put({ type: "POKEMON_ITEM_FAILED", message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* pokeSaga() {
  yield takeEvery("POKEMONS_FETCH_REQUESTED", fetchPokemons);
  yield takeLatest("POKEMONS_FETCH_REQUESTED", fetchPokemons);
  yield takeEvery("POKEMON_ITEM_REQUESTED", fetchPokemonItem);
}

export default pokeSaga;
