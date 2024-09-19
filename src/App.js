import "./App.css";
import Navigation from "./components/Navigation";
import { PokemonCard } from "./components/PokemonCard";
import { TextField, Grid, Container, Typography, Box } from "@mui/material";
import { useState, useEffect, createContext } from "react";

const ApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

const SquadContext = createContext();

function App() {
  const [pokemonRaw, setPokemonRaw] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pokemonSquad, setPokemonSquad] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch(ApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemonRaw(data.results);
        const result = data.results;
        result.map((p, index) => {
          {
            p.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`;
            p.level = 1;
            p.squad = false;
          }
        });
        setFilteredPokemon(result);
      });
  }, []);

  function handleChange(e) {
    setSearchValue(e.target.value.toLowerCase());

    setFilteredPokemon(
      pokemonRaw.filter((pokemon) => {
        const name = pokemon.name.toLowerCase();
        return name.includes(searchValue);
      })
    );
  }

  return (
    <SquadContext.Provider
      value={{ pokemonSquad, setPokemonSquad, filteredPokemon }}
    >
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography paddingBottom={3} variant="h3">
          Your Squad ({pokemonSquad.length}/6)
        </Typography>

        <Grid container spacing={3}>
          {pokemonSquad.length < 1 && (
            <Typography variant="body1" padding={3} paddingLeft={10}>No pokemon in your squad.</Typography>
          )}
          {pokemonSquad.length > 0 &&
            pokemonSquad.map((pokemon, index) => (
              <Grid item xs={12} sm={6} md={2}>
                <PokemonCard pokemon={pokemon} type="squad" />
              </Grid>
            ))}
        </Grid>
        <Typography paddingBottom={3} paddingTop={3} variant="h3">
          Pokemon
        </Typography>
        <TextField
          label="Search..."
          id="outlined-required"
          onChange={handleChange}
          value={searchValue}
          sx={{ marginBottom: "15px", width: "100%" }}
        />
        <Box sx={{ height: "70vh", overflowY: "auto" }}>
          <Grid container spacing={3} padding={2}>
            {filteredPokemon.map((pokemon, index) => (
              <Grid item xs={12} sm={6} md={2}>
                <PokemonCard pokemon={pokemon} type="all" />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </SquadContext.Provider>
  );
}

export { App, SquadContext };
