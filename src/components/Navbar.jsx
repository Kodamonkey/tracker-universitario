import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputBase, IconButton, Paper, List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ eventos }) => {
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]); // Estado para eventos filtrados
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Actualiza la lista de resultados en tiempo real
    if (value.trim() !== "") {
      const matches = Object.keys(eventos).filter((key) =>
        eventos[key].name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEvents(matches);
    } else {
      setFilteredEvents([]); // Limpia la lista si no hay texto
    }
  };

  const handleEventClick = (eventKey) => {
    navigate(`/evento/${eventKey}`); // Navega al detalle del evento
    setQuery(""); // Limpia el buscador
    setFilteredEvents([]); // Limpia la lista de resultados
  };

  // Mapear colores exactos del calendario con transparencia ajustada
  const getEventBackgroundColor = (type) => {
    switch (type) {
      case "Deportivos":
        return "rgba(255, 235, 59, 0.9)"; // Amarillo más intenso
      case "Charlas":
        return "rgba(244, 67, 54, 0.9)"; // Rojo más intenso
      case "Proximamente":
        return "rgba(33, 150, 243, 0.9)"; // Azul más intenso
      case "Personalizado":
        return "rgba(108, 99, 255, 0.9)"; // Morado más intenso
      default:
        return "rgba(156, 39, 176, 0.9)"; // Púrpura más intenso
    }
  };

  return (
    <div>
      {/* Barra de Navegación */}
      <Paper
        component="div"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          backgroundColor: "#0d47a1", // Azul más fuerte
          zIndex: 1000,
          borderRadius: 0,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <IconButton sx={{ padding: "8px", color: "#ffffff" }} aria-label="login">
          <AccountCircleIcon />
        </IconButton>
        <IconButton sx={{ padding: "8px", color: "#ffffff" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "0 8px",
            color: "#000000",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          placeholder="Buscar Evento"
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={handleSearchChange} // Actualiza los resultados dinámicamente
        />
        <IconButton type="button" sx={{ padding: "8px", color: "#ffffff" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Lista de Resultados */}
      {filteredEvents.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            top: 56, // Justo debajo del navbar
            left: "0", // Alineado al extremo izquierdo
            width: "300px", // Ancho más compacto
            backgroundColor: "#ffffff",
            zIndex: 999,
            maxHeight: "400px", // Maneja el scroll si hay muchos resultados
            overflowY: "auto",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "0 8px 8px 0", // Bordes redondeados solo a la derecha
            padding: "8px",
          }}
        >
          <Typography variant="h6" sx={{ color: "#0d47a1", marginBottom: "8px" }}>
            Resultados:
          </Typography>
          <List>
            {filteredEvents.map((eventKey) => {
              const event = eventos[eventKey];
              return (
                <React.Fragment key={eventKey}>
                  <ListItem
                    button
                    onClick={() => handleEventClick(eventKey)}
                    sx={{
                      backgroundColor: getEventBackgroundColor(event.type), // Fondo según el tipo
                      padding: "8px",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                      mixBlendMode: "multiply", // Ajusta el color para parecer más sólido
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", color: "#000000" }}
                        >
                          {event.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ color: "#666666" }}>
                          {event.date}
                        </Typography>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      )}
    </div>
  );
};

export default Navbar;
