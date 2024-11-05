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
          color="primary"
          onClick={() => handleFilterClick("Otros")}
        >
          Más tipos de eventos
        </Button>
      </Stack>

      {/* Cuadro flotante de checklist de eventos */}
      {showChecklist && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "300px", // Ajusta este valor para controlar la posición vertical
            left: "-120px", // Ajusta este valor para controlar la posición horizontal
            width: 250,
            padding: 2,
            backgroundColor: "#f0f4ff", // Color de fondo personalizado
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra para hacerlo más atractivo
            zIndex: 1000, // Asegura que esté sobre otros elementos
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: 1 }}
          >
            {selectedFilter} Eventos
          </Typography>
          <Divider sx={{ marginBottom: 2 }} /> {/* Línea de separación */}
          <List>
            {checklistItems.map(([key, event], index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={!!visibleEventos[key]}
                    onChange={() => handleCheckboxChange(key)}
                    sx={{ color: event.color || "primary.main" }}
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
