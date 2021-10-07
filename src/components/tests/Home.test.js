import { render, screen } from "@testing-library/react";
import Home from "../Home";

render(<Home />);

test("Home has Pokemons list title", () => {
  const titleElement = screen.getByText(/Pokemons list/i);
  expect(titleElement).toBeInTheDocument();
});
