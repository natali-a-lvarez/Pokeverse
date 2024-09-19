import * as React from "react";
import { useContext } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { SquadContext } from "../App";

export default function Navigation() {
  const { pokemonSquad, setPokemonSquad } = useContext(SquadContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokeverse
          </Typography>
          {pokemonSquad.length >= 2 && (
            <Button variant="contained">Battle</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
