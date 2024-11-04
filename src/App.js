import React, { useState } from 'react';
import Navbar from './components/Navbar'; // Asegúrate de que la ruta sea correcta
import FiltroEventos from './components/FiltroEventos';
import CalendarioEventos from './components/CalendarioEventos';
import { Container, Typography, TextField } from '@mui/material';

function App() {
  const [filter, setFilter] = useState(null);

  const handleFilterChange = (tipo) => {
    setFilter(tipo);
  };

  return (
    <div>
      <Navbar /> {/* Navbar siempre visible en la esquina superior derecha */}

      <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 10 }}>
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
    </div>
  );
}

export default App;
