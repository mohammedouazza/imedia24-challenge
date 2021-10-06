import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import PokemonList from "../PokemonList";
import store from "../../store";

test("PokemonList lists Items", () => {
  render(
    <Provider store={store}>
      <PokemonList />
    </Provider>
  );
  const listElement = screen.getByTestId("list-items");
  expect(listElement).toBeInTheDocument();
});

test("PokemonList lists Items", () => {
  const { container } = render(
    <Provider store={store}>
      <PokemonList />
    </Provider>
  );
  expect(container.firstChild).toHaveClass("flex-col");
});
