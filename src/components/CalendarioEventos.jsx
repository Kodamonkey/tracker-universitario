import React from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CalendarioEventos = ({ eventos, onEventClick }) => {
  const diasDeLaSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const mes = "Agosto";
  const año = "2023";
  const cellSize = 60;

  const renderCalendar = () => {
    const totalDias = 31;
    const calendario = [];
    let semana = [];
    const primerDiaDeLaSemana = 2;

    for (let i = 0; i < primerDiaDeLaSemana; i++) {
      semana.push(
        <div
          key={`empty-${i}`}
          style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        ></div>
      );
    }

    for (let day = 1; day <= totalDias; day++) {
      const dateKey = `2023-08-${String(day).padStart(2, "0")}`;
      const event = eventos[dateKey];
      let bgColor = event ? event.color : "#f9f9f9";

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

      if (semana.length === 7) {
        calendario.push(
          <div key={`week-${calendario.length}`} style={{ display: "flex" }}>
            {semana}
          </div>
        );
        semana = [];
      }
    }

    if (semana.length > 0) {
      calendario.push(
        <div key={`week-${calendario.length}`} style={{ display: "flex" }}>
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
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" color="#333">
          {mes} {año}
        </Typography>
        <IconButton>
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
