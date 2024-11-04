import React, { useState } from "react";
import Navbar from "./components/Navbar"; // Asegúrate de que la ruta sea correcta
import FiltroEventos from "./components/FiltroEventos";
import CalendarioEventos from "./components/CalendarioEventos";
import { Container, Typography, TextField } from "@mui/material";
import Exportar from "./components/Exportar";

function App() {
  const [filter, setFilter] = useState(null);

  const handleFilterChange = (tipo) => {
    setFilter(tipo);
  };

  return (
    <div>
      <Navbar /> {/* Navbar siempre visible en la esquina superior derecha */}
      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: 10 }}>
        <Typography variant="h4" gutterBottom>
          Tracker de Eventos en la Universidad
        </Typography>
        <FiltroEventos onFilterChange={handleFilterChange} />
        <CalendarioEventos events={[]} filter={filter} />
      </Container>
      <Exportar></Exportar>
    </div>
  );
}

export default App;
