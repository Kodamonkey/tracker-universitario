import React, { useState } from "react";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Stack,
  Button,
} from "@mui/material";

const FiltroEventos = ({ eventos, visibleEventos, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);

  // Maneja el cambio de visibilidad para cada evento en el checklist
  const handleCheckboxChange = (eventKey) => {
    const updatedEventos = { ...visibleEventos };
    if (updatedEventos[eventKey]) {
      delete updatedEventos[eventKey];
    } else {
      updatedEventos[eventKey] = eventos[eventKey];
    }
    onFilterChange(updatedEventos);
  };

  // Maneja el filtrado por tipo de evento, alternando la visibilidad
  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      // Si el filtro ya está seleccionado, deseleccionarlo para minimizar
      setSelectedFilter(null);
      setChecklistItems([]);
    } else {
      // Si no está seleccionado, mostrar los eventos del filtro
      setSelectedFilter(filter);
      setChecklistItems(
        Object.entries(eventos).filter(([key, value]) => value.type === filter)
      );
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", marginBottom: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Filtrar Eventos
      </Typography>
      {/* Botones de Filtro */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 3, justifyContent: "center" }}
      >
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
      {/* Checklist de Eventos */}
      {selectedFilter && (
        <List>
          {checklistItems.map(([key, event], index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!!visibleEventos[key]}
                  onChange={() => handleCheckboxChange(key)}
                />
              </ListItemIcon>
              <ListItemText primary={event.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FiltroEventos;
