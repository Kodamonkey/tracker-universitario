import React, { useState } from "react";
import FiltroEventos from "../src/components/FiltroEventos";
import CalendarioEventos from "../src/components/CalendarioEventos";
import { Container, Typography, TextField } from "@mui/material";

function App() {
  const [filter, setFilter] = useState(null);

  const handleFilterChange = (tipo) => {
    setFilter(tipo);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Tracker de Eventos en la Universidad
      </Typography>
      <FiltroEventos onFilterChange={handleFilterChange} />
      <TextField
        variant="outlined"
        placeholder="Buscar eventos..."
        fullWidth
        sx={{ marginBottom: 3 }}
      />
      <CalendarioEventos events={[]} filter={filter} />
    </Container>
  );
}

export default App;
