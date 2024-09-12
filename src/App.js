import "./App.css";
import Navigation from "./components/Navigation";
import {
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";

const ApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

function App() {
  const [pokemonRaw, setPokemonRaw] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    fetch(ApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemonRaw(data.results);
        setFilteredPokemon(data.results);
      });
  }, []);

  console.log(filteredPokemon);

  function handleChange(e) {
    const value = e.target.value;
    const regex = new RegExp(value, "gi");

    let filteredPokemon = [];
    let problematicPokemons = [];

    pokemonRaw.forEach((pokemon) => {
      if (typeof pokemon === "object" && pokemon !== null) {
        const nameMatch =
          pokemon.name &&
          typeof pokemon.name === "string" &&
          pokemon.name.match(regex);
        const stateMatch =
          pokemon.state &&
          typeof pokemon.state === "string" &&
          pokemon.state.match(regex);

        if (nameMatch || stateMatch) {
          filteredPokemon.push(pokemon);
        } else {
          problematicPokemons.push({ ...pokemon, reason: "No match found" });
        }
      } else {
        problematicPokemons.push({ ...pokemon, reason: "Invalid data" });
      }
    });

    setFilteredPokemon(filteredPokemon);

    // Log problematic pokemons for debugging
    console.log("Problematic Pokémon:", problematicPokemons);

    if (filteredPokemon.length === 0 && problematicPokemons.length > 0) {
      console.warn("No matching Pokémon found. Showing problematic entries:");
      console.log(problematicPokemons);
    }
  }

  return (
    <div className="App">
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <TextField
          label="Search..."
          id="outlined-required"
          onChange={handleChange}
          sx={{ marginBottom: "15px", width: "100%" }}
        />
        <Grid container spacing={3}>
          {filteredPokemon.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={2}>
              <Card>
                <CardMedia
                  sx={{
                    height: 180,
                    width: "auto",
                    backgroundColor: "#dddddd",
                    padding: "30px",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                  image={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                    (index + 1) +
                    ".png"
                  }
                />
                <CardContent>
                  <Typography variant="h6">{pokemon.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
