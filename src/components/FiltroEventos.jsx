import React, { useState } from "react";
import {
  Button,
  Stack,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";

const FiltroEventos = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);

  // Definir los eventos de ejemplo para cada filtro
  const eventos = {
    Deportivos: ["Evento 1", "Evento 2", "Evento 3"],
    Charlas: ["Evento 4", "Evento 5", "Evento 6"],
    Proximamente: ["Evento 7", "Evento 8", "Evento 9"],
    Otros: ["Evento 10", "Evento 11", "Evento 12"],
  };

  // Función para manejar el cambio de filtro
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setChecklistItems(eventos[filter]);
    onFilterChange(filter); // Llamar la función de filtro en caso de que se necesite en otro componente
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
      }}
    >
      {/* Menú de checklist flotante a la izquierda */}
      {selectedFilter && (
        <Box
          sx={{
            position: "absolute",
            left: "-250px", // Ajusta este valor según el espacio que necesites
            top: "0",
            width: "200px",
            padding: "16px",
            backgroundColor: "#f7f7fb",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {selectedFilter}
          </Typography>
          <List>
            {checklistItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Botones de filtro */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
        <Button
          variant="contained"
          color="warning"
          onClick={() => handleFilterClick("Deportivos")}
        >
          Deportivos
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleFilterClick("Charlas")}
        >
          Charlas
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => handleFilterClick("Proximamente")}
        >
          Proximamente
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => handleFilterClick("Otros")}
        >
          Más tipos de eventos
        </Button>
      </Stack>

      {/* Aquí iría el calendario */}
      <Box sx={{ width: "100%" }}>
        {/* Aquí insertas tu componente de calendario */}
      </Box>
    </Box>
  );
};

export default FiltroEventos;
