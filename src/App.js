import React, { useState } from "react";
import Navbar from "./components/Navbar";
import FiltroEventos from "./components/FiltroEventos";
import CalendarioEventos from "./components/CalendarioEventos";
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ExportButton from "./components/ExportButton";

const initialEventos = {
  "2023-08-06": {
    name: "Evento 1",
    type: "Deportivos",
    color: "yellow",
    date: "2023-08-06",
    hour: 10,
    minute: 0,
    description: "Evento deportivo en el campus",
    location: "Campo deportivo",
  },
  "2023-08-14": {
    name: "Evento 2",
    type: "Charlas",
    color: "red",
    date: "2023-08-14",
    hour: 14,
    minute: 30,
    description: "Charla de motivación",
    location: "Auditorio",
  },
  "2023-08-20": {
    name: "Evento 3",
    type: "Deportivos",
    color: "yellow",
    date: "2023-08-20",
    hour: 9,
    minute: 0,
    description: "Competencia interuniversitaria",
    location: "Estadio",
  },
  "2023-08-29": {
    name: "Evento 4",
    type: "Charlas",
    color: "red",
    date: "2023-08-29",
    hour: 16,
    minute: 0,
    description: "Conferencia de tecnología",
    location: "Sala de conferencias",
  },
};

function App() {
  const [visibleEventos, setVisibleEventos] = useState(initialEventos);
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado

  const handleFilterChange = (updatedEventos) => {
    setVisibleEventos(updatedEventos);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Actualiza el estado con el evento seleccionado
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null); // Cierra el popup al restablecer el evento seleccionado
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ textAlign: "center", marginTop: 10 }}>
        <Typography variant="h4" gutterBottom>
          Tracker de Eventos en la Universidad
        </Typography>
        <FiltroEventos
          eventos={initialEventos}
          visibleEventos={visibleEventos}
          onFilterChange={handleFilterChange}
        />
        <CalendarioEventos
          eventos={visibleEventos}
          onEventClick={handleEventClick}
        />
        <ExportButton events={Object.values(visibleEventos)} />
      </Container>

      {/* Dialog para mostrar detalles del evento */}
      <Dialog open={!!selectedEvent} onClose={handleCloseDialog}>
        {selectedEvent && (
          <>
            <DialogTitle>{selectedEvent.name}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>Fecha:</strong> {selectedEvent.date}
                <br />
                <strong>Hora:</strong> {selectedEvent.hour}:
                {selectedEvent.minute.toString().padStart(2, "0")}
                <br />
                <strong>Descripción:</strong> {selectedEvent.description}
                <br />
                <strong>Ubicación:</strong> {selectedEvent.location}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default App;
