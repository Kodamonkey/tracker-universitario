import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputBase, IconButton, Paper } from "@mui/material";

const Navbar = () => {
  return (
    <Paper
      component="form"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0, // Esto asegura que ocupe todo el ancho
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Distribuye elementos en extremos
        padding: "8px 16px", // Ajuste de padding para margen interno
        backgroundColor: "#ffffff", // Color de fondo violeta claro
        zIndex: 1000,
        borderRadius: 0, // Sin borde redondeado para que se vea como una barra completa
      }}
    >
      {/* Ícono de inicio de sesión en la esquina izquierda */}
      <IconButton sx={{ padding: "8px" }} aria-label="login">
        <AccountCircleIcon />
      </IconButton>

      {/* Ícono de menú en la izquierda, cerca del ícono de inicio de sesión */}
      <IconButton sx={{ padding: "8px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>

      {/* Barra de búsqueda en el centro */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar Evento"
        inputProps={{ "aria-label": "search" }}
      />

      {/* Ícono de búsqueda en la derecha */}
      <IconButton type="submit" sx={{ padding: "8px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Navbar;
