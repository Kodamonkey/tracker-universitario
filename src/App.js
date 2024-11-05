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
  Box,
} from "@mui/material";
import ExportButton from "./components/ExportButton";
import AgregarEvento from "./components/AgregarEvento";

// Inicialmente, los eventos están en `eventos` en lugar de `initialEventos` para poder modificarlos
const initialEventos = {
  "2024-11-06": {
    name: "Evento 1",
    type: "Deportivos",
    color: "yellow",
    date: "2024-11-06",
    hour: 10,
    minute: 0,
    description: "Evento deportivo en el campus",
    location: "Campo deportivo",
  },
  "2024-11-14": {
    name: "Evento 2",
    type: "Charlas",
    color: "red",
    date: "2024-11-14",
    hour: 14,
    minute: 30,
    description: "Charla de motivación",
    location: "Auditorio",
  },
  "2024-11-20": {
    name: "Evento 3",
    type: "Deportivos",
    color: "yellow",
    date: "2024-11-20",
    hour: 9,
    minute: 0,
    description: "Competencia interuniversitaria",
    location: "Estadio",
  },
  "2024-11-29": {
    name: "Evento 4",
    type: "Charlas",
    color: "red",
    date: "2024-11-29",
    hour: 16,
    minute: 0,
    description: "Conferencia de tecnología",
    location: "Sala de conferencias",
  },
};

function App() {
  const [eventos, setEventos] = useState(initialEventos); // Estado para todos los eventos
  const [visibleEventos, setVisibleEventos] = useState(initialEventos); // Eventos visibles según el filtro
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFilterChange = (updatedEventos) => {
    setVisibleEventos(updatedEventos);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    setOpenDialog(true);
  };

  const handleSaveEvent = (newEvent) => {
    const dateKey = newEvent.date;

    // Actualiza el estado `eventos` y `visibleEventos` con el nuevo evento
    setEventos((prevEvents) => ({
      ...prevEvents,
      [dateKey]: {
        ...newEvent,
        type: "Personalizado", // Asegurarse de que el tipo sea "Personalizado"
        color: "blue",
      },
    }));

    setVisibleEventos((prevEvents) => ({
      ...prevEvents,
      [dateKey]: {
        ...newEvent,
        type: "Personalizado",
        color: "blue",
      },
    }));

    setOpenDialog(false); // Cierra el cuadro de diálogo después de guardar el evento
  };

  return (
    <div>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{ textAlign: "center", marginTop: 10, paddingBottom: 5 }}
      >
        <Typography variant="h3" gutterBottom>
          Tracker de Eventos en la Universidad
        </Typography>
        <FiltroEventos
          eventos={eventos} // Pasa todos los eventos al componente FiltroEventos
          visibleEventos={visibleEventos}
          onFilterChange={handleFilterChange}
        />
        <CalendarioEventos
          eventos={visibleEventos}
          onEventClick={handleEventClick}
        />

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            paddingBottom: 5,
          }}
        >
          <ExportButton events={Object.values(visibleEventos)} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEvent}
            sx={{
              backgroundColor: "#6c63ff",
              color: "white",
              marginTop: 4,
              padding: "12px 24px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                backgroundColor: "#5753cc",
                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Agregar Evento Personalizado
          </Button>
        </Box>
      </Container>

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

      {/* Componente AgregarEvento para manejar la creación de nuevos eventos */}
      <AgregarEvento
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
}

export default App;
