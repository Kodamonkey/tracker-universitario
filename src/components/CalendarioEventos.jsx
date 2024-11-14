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
  const cellSize = 70;

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

  // Obtener días del mes anterior
  const diasMesAnterior = new Date(año, mes, 0).getDate();
  const diasInicio = [...Array(primerDiaDeLaSemana)]
    .map((_, index) => diasMesAnterior - primerDiaDeLaSemana + index + 1)
    .map((day) => ({
      day,
      currentMonth: false,
      dateKey: `${año}-${String(mes).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`,
    }));

  // Obtener días del mes actual
  const diasActuales = [...Array(totalDias)].map((_, index) => ({
    day: index + 1,
    currentMonth: true,
    dateKey: `${año}-${String(mes + 1).padStart(2, "0")}-${String(
      index + 1
    ).padStart(2, "0")}`,
  }));

  // Obtener días del mes siguiente
  const diasFin = [...Array(42 - diasInicio.length - diasActuales.length)].map(
    (_, index) => ({
      day: index + 1,
      currentMonth: false,
      dateKey: `${año}-${String(mes + 2).padStart(2, "0")}-${String(
        index + 1
      ).padStart(2, "0")}`,
    })
  );

  // Combinar todos los días
  const diasCompletos = [...diasInicio, ...diasActuales, ...diasFin];

  // Renderizar el calendario
  const renderCalendar = () => {
    const calendario = [];
    for (let i = 0; i < diasCompletos.length; i += 7) {
      const semana = diasCompletos
        .slice(i, i + 7)
        .map(({ day, currentMonth, dateKey }) => {
          const event = eventos[dateKey];
          const bgColor = event
            ? eventColors[event.type] || event.color
            : currentMonth
            ? "#f5f5f5"
            : "#f5f5f5";

          return (
            <Paper
              key={dateKey}
              sx={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2px",
                border: "1px solid #c2c2b8",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                cursor: event ? "pointer" : "default",
                opacity: currentMonth ? 1 : 0.8,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
                },
              }}
              onClick={() => event && onEventClick(event)}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ color: currentMonth ? "#333" : "#aaa" }}
              >
                {day}
              </Typography>
            </Paper>
          );
        });

      calendario.push(
        <div
          key={`week-${i}`}
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
        backgroundColor: "#ddd",
        border: "1px solid #000",
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          padding: "0 20px",
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
