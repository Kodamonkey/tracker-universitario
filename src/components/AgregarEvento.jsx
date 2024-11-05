// src/components/AgregarEvento.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const AgregarEvento = ({ open, onClose, onSave }) => {
  const [newEvent, setNewEvent] = useState({
    date: "",
    name: "",
    description: "",
    location: "",
    hour: "",
    minute: "",
    color: "blue",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSaveEvent = () => {
    onSave(newEvent); // Envía el evento al componente principal
    setNewEvent({
      date: "",
      name: "",
      description: "",
      location: "",
      hour: "",
      minute: "",
      color: "blue",
    }); // Reinicia el formulario
    onClose(); // Cierra el diálogo
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Evento Personalizado</DialogTitle>
      <DialogContent>
        <TextField
          label="Fecha"
          name="date"
          type="date"
          value={newEvent.date}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Nombre del Evento"
          name="name"
          value={newEvent.name}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Descripción"
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Ubicación"
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Hora"
          name="hour"
          type="number"
          value={newEvent.hour}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Minutos"
          name="minute"
          type="number"
          value={newEvent.minute}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSaveEvent} color="primary">
          Guardar Evento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarEvento;
