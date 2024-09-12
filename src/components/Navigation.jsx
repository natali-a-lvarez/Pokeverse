import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Navigation() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokeverse
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
