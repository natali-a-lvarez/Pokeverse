import React, { useState, useContext } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";

import { SquadContext } from "../App";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokemonCard({ pokemon, type }) {
  const [addPokemonError, setAddPokemonError] = useState(false);

  const { pokemonSquad, setPokemonSquad } = useContext(SquadContext);
  console.log(pokemonSquad);

  function handleAddSquad() {
    if (pokemonSquad.length < 6) {
      setPokemonSquad([...pokemonSquad, pokemon]);
      pokemon.squad = true;
    } else {
      setTimeout(() => {
        setAddPokemonError(true);
      }, 1000);
      setAddPokemonError(false);
    }
  }
  function handleRemoveSquad() {
    const updatedSquad = [...pokemonSquad];
    const removedIndex = updatedSquad.findIndex((p) => p.name === pokemon.name);

    if (removedIndex !== -1) {
      updatedSquad.splice(removedIndex, 1);
      setPokemonSquad(updatedSquad);

      // Update the removed Pokémon's squad status
      const removedPokemon = pokemon;
      removedPokemon.squad = false;
    }
  }

  return (
    <Card>
      <CardMedia
        sx={{
          height: 100,
          width: "auto",
          backgroundColor: "#dddddd",
          padding: "30px",
          objectFit: "contain",
          objectPosition: "center",
        }}
        image={pokemon.image}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {capitalizeFirstLetter(pokemon.name)}
        </Typography>

        <Typography variant="body">Level: {pokemon.level}</Typography>
        {type === "all" && !pokemon.squad && pokemonSquad.length < 6 && (
          <Button
            onClick={handleAddSquad}
            color="success"
            size="small"
            variant="contained"
          >
            Add
          </Button>
        )}

        {type === "all" && pokemonSquad.length === 6 && !pokemon.squad && (
          <Button size="small" variant="contained" disabled>
            Add
          </Button>
        )}

        {type === "squad" && pokemon.squad && (
          <Button
            onClick={handleRemoveSquad}
            color="error"
            size="small"
            variant="contained"
          >
            Remove
          </Button>
        )}

        {type === "all" && pokemon.squad && (
          <Button size="small" variant="outlined" color="success">
            Added
          </Button>
        )}
        {addPokemonError && (
          <Typography variant="body2" color="error">
            Squad full
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export { PokemonCard };
