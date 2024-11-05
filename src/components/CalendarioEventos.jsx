import React from "react";
import { Paper, Typography } from "@mui/material";

const CalendarioEventos = ({ eventos, onEventClick }) => {
  const diasDeLaSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const renderCalendar = () => {
    const totalDias = 31;
    const calendario = [];
    let semana = [];
    const primerDiaDeLaSemana = 2;

    for (let i = 0; i < primerDiaDeLaSemana; i++) {
      semana.push(
        <div key={`empty-${i}`} style={{ width: "60px", height: "60px" }}></div>
      );
    }

    for (let day = 1; day <= totalDias; day++) {
      const dateKey = `2023-08-${String(day).padStart(2, "0")}`;
      const event = eventos[dateKey];
      let bgColor = event ? event.color : "";

      semana.push(
        <Paper
          key={day}
          sx={{
            width: "60px",
            height: "60px",
            backgroundColor: bgColor || "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2px",
            cursor: event ? "pointer" : "default",
          }}
          onClick={() => event && onEventClick(event)}
        >
          <Typography variant="body2">{day}</Typography>
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
    <div style={{ width: "440px", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {diasDeLaSemana.map((dia, index) => (
          <Typography
            key={index}
            variant="body2"
            style={{ width: "60px", textAlign: "center", fontWeight: "bold" }}
          >
            {dia}
          </Typography>
        ))}
      </div>
      {renderCalendar()}
    </div>
  );
};

export default CalendarioEventos;
