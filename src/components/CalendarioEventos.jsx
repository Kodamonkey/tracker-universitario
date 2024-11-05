import React, { useState } from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Definimos los colores para cada tipo de evento
const eventColors = {
  Personalizado: "#6c63ff", // Morado
  Deportivos: "#ffeb3b", // Amarillo
  Charlas: "#f44336", // Rojo
  Proximamente: "#2196f3", // Azul
  Otros: "#9c27b0", // Púrpura
};

const CalendarioEventos = ({ eventos, onEventClick }) => {
  const diasDeLaSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const cellSize = 60;

  const [mes, setMes] = useState(10); // 7 para agosto (enero = 0)
  const [año, setAño] = useState(2024);

  // Obtener el primer día del mes actual y el número total de días en el mes
  const primerDiaDeLaSemana = new Date(año, mes, 1).getDay();
  const totalDias = new Date(año, mes + 1, 0).getDate();

  // Función para cambiar al mes anterior
  const handlePrevMonth = () => {
    if (mes === 0) {
      setMes(11);
      setAño((prevAño) => prevAño - 1);
    } else {
      setMes((prevMes) => prevMes - 1);
    }
  };

  // Función para cambiar al mes siguiente
  const handleNextMonth = () => {
    if (mes === 11) {
      setMes(0);
      setAño((prevAño) => prevAño + 1);
    } else {
      setMes((prevMes) => prevMes + 1);
    }
  };

  // Renderizar el calendario
  const renderCalendar = () => {
    const calendario = [];
    let semana = [];

    // Llenar los días vacíos al principio de la primera semana
    for (let i = 0; i < primerDiaDeLaSemana; i++) {
      semana.push(
        <div
          key={`empty-${i}`}
          style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
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
        : "#f9f9f9";

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
            cursor: event ? "pointer" : "default",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => event && onEventClick(event)}
        >
          <Typography variant="body2" fontWeight="bold" color="#333">
            {day}
          </Typography>
        </Paper>
      );

      // Al completar una semana, agregarla al calendario y vaciar la fila
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
        backgroundColor: "#f0f8ff",
      }}
    >
      {/* Encabezado del mes y año con botones de navegación */}
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
        <Typography variant="h6" fontWeight="bold" color="#333">
          {new Date(año, mes).toLocaleString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Encabezado de los días de la semana */}
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
              color: "#666",
              paddingBottom: "4px",
            }}
          >
            {dia}
          </Typography>
        ))}
      </Box>

      {/* Renderizado del calendario */}
      {renderCalendar()}
    </Paper>
  );
};

export default CalendarioEventos;
