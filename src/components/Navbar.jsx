import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, IconButton, Paper } from "@mui/material";

const Navbar = () => {
  return (
    <Paper
      component="form"
      sx={{
        position: "fixed",
        top: 30, // margen superior
        right: 20, // margen desde la derecha, aumenta para alejarlo más
        display: "flex",
        alignItems: "center",
        width: "20%", // Reduce el tamaño general de la Navbar
        maxWidth: 500, // Ajusta el tamaño máximo
        padding: "2px 4px",
        borderRadius: 50, // Hacer la forma ovalada
        backgroundColor: "#e0b3ff", // Color violeta claro
        zIndex: 1000, // asegurar que esté sobre otros elementos
      }}
    >
      <IconButton sx={{ padding: "8px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Hinted search text"
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="submit" sx={{ padding: "8px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Navbar;
