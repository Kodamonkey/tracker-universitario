import React, { useState } from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Definimos los colores de eventos (coherente con el filtro)
const eventColors = {
  Personalizado: "#1976d2", // Azul
  Deportivos: "#d4a017", // Amarillo
  Charlas: "#d32f2f", // Rojo
  Proximamente: "#388e3c", // Verde
  Otros: "#000000", // Negro
};

const CalendarioEventos = ({ eventos, onEventClick }) => {
  const diasDeLaSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const cellSize = 60;

  const [mes, setMes] = useState(new Date().getMonth()); // Mes actual
  const [año, setAño] = useState(new Date().getFullYear()); // Año actual

  // Cambiar al mes anterior
  const handlePrevMonth = () => {
    if (mes === 0) {
      setMes(11);
      setAño((prevAño) => prevAño - 1);
    } else {
      setMes((prevMes) => prevMes - 1);
    }
  };

  // Cambiar al mes siguiente
  const handleNextMonth = () => {
    if (mes === 11) {
      setMes(0);
      setAño((prevAño) => prevAño + 1);
    } else {
      setMes((prevMes) => prevMes + 1);
    }
  };

  const primerDiaDeLaSemana = new Date(año, mes, 1).getDay();
  const totalDias = new Date(año, mes + 1, 0).getDate();

  // Renderizar el calendario
  const renderCalendar = () => {
    const calendario = [];
    let semana = [];

    // Llenar los días vacíos al inicio de la primera semana
    for (let i = 0; i < primerDiaDeLaSemana; i++) {
      semana.push(
        <div
          key={`empty-${i}`}
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: "#f5f5f5",
          }}
        ></div>
      );
    }

    // Renderizar los días del mes
    for (let day = 1; day <= totalDias; day++) {
      const dateKey = `${año}-${String(mes + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const event = eventos[dateKey];
      const bgColor = event
        ? eventColors[event.type] || event.color
        : "#ffffff";

      semana.push(
        <Paper
          key={day}
          sx={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2px",
            border: "1px solid #ddd",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: event ? "pointer" : "default",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => event && onEventClick(event)}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ color: event ? "#ffffff" : "#333" }}
          >
            {day}
          </Typography>
        </Paper>
      );

      if (semana.length === 7) {
        calendario.push(
          <div
            key={`week-${calendario.length}`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {semana}
          </div>
        );
        semana = [];
      }
    }

    // Agregar la última semana si está incompleta
    if (semana.length > 0) {
      calendario.push(
        <div
          key={`week-${calendario.length}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {semana}
        </div>
      );
    }

    return calendario;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "fit-content",
        margin: "auto",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        border: "1px solid #ddd",
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          padding: "0 16px",
        }}
      >
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textTransform: "capitalize", color: "#333" }}
        >
          {new Date(año, mes).toLocaleString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Días de la semana */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}
      >
        {diasDeLaSemana.map((dia, index) => (
          <Typography
            key={index}
            variant="body2"
            fontWeight="bold"
            sx={{
              width: `${cellSize}px`,
              textAlign: "center",
              color: "#555",
              paddingBottom: "4px",
            }}
          >
            {dia}
          </Typography>
        ))}
      </Box>

      {/* Días del mes */}
      {renderCalendar()}
    </Paper>
  );
};

export default CalendarioEventos;
