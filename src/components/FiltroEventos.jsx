import React from "react";
import { Button, Stack } from "@mui/material";

const FiltroEventos = ({ onFilterChange }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
      <Button
        variant="contained"
        color="warning"
        onClick={() => onFilterChange("Deportivos")}
      >
        Deportivos
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => onFilterChange("Charlas")}
      >
        Charlas
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={() => onFilterChange("Proximamente")}
      >
        Proximamente
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={() => onFilterChange("Otros")}
      >
        Más tipos de eventos
      </Button>
    </Stack>
  );
};

export default FiltroEventos;
