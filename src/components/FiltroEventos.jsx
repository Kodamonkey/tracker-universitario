// FiltroEventos.jsx
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
  Paper,
  Divider,
} from "@mui/material";

const FiltroEventos = ({ eventos, visibleEventos, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [showChecklist, setShowChecklist] = useState(false);

  // Define los colores para cada tipo de evento
  const eventColors = {
    Personalizado: "#6c63ff", // Color morado para eventos personalizados
    Deportivos: "#ffeb3b", // Amarillo
    Charlas: "#f44336", // Rojo
    Proximamente: "#2196f3", // Azul
    Otros: "#9c27b0", // Púrpura
  };

  const handleCheckboxChange = (eventKey) => {
    const updatedEventos = { ...visibleEventos };
    if (updatedEventos[eventKey]) {
      delete updatedEventos[eventKey];
    } else {
      updatedEventos[eventKey] = eventos[eventKey];
    }
    onFilterChange(updatedEventos);
  };

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
      setChecklistItems([]);
      setShowChecklist(false);
    } else {
      setSelectedFilter(filter);
      setChecklistItems(
        Object.entries(eventos).filter(([key, value]) => value.type === filter)
      );
      setShowChecklist(true);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", marginBottom: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Filtrar Eventos:
      </Typography>

      {/* Botones de Filtro */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 3, justifyContent: "center" }}
      >
        {Object.keys(eventColors).map((type) => (
          <Button
            key={type}
            variant="contained"
            onClick={() => handleFilterClick(type)}
            sx={{
              backgroundColor: eventColors[type],
              color: "#000000",
              "&:hover": {
                backgroundColor: eventColors[type],
                opacity: 0.8,
              },
            }}
          >
            {type}
          </Button>
        ))}
      </Stack>

      {/* Cuadro flotante de checklist de eventos */}
      {showChecklist && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "300px",
            left: "-120px",
            width: 250,
            padding: 2,
            backgroundColor: "#f0f4ff",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: 1 }}
          >
            {selectedFilter}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <List>
            {checklistItems.map(([key, event], index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={!!visibleEventos[key]}
                    onChange={() => handleCheckboxChange(key)}
                    sx={{ color: eventColors[event.type] || "primary.main" }}
                  />
                </ListItemIcon>
                <ListItemText primary={event.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default FiltroEventos;
