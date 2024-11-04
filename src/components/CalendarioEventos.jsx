import React from "react";
import { Paper, Typography } from "@mui/material";

const CalendarioEventos = ({ events }) => {
  // Definición de días de la semana
  const diasDeLaSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Simulación de eventos
  const diasConEventos = {
    "2023-08-06": "Deportivos",
    "2023-08-14": "Charlas",
    "2023-08-20": "Deportivos",
    "2023-08-29": "Charlas",
  };

  // Generar las celdas del calendario en una estructura de semanas
  const renderCalendar = () => {
    const totalDias = 31;
    const calendario = [];
    let semana = [];

    // Llenar la primera semana con días vacíos si el mes no empieza en domingo
    const primerDiaDeLaSemana = 2; // Cambia este número según el día en que inicia el mes (0 = Domingo, 1 = Lunes, etc.)
    for (let i = 0; i < primerDiaDeLaSemana; i++) {
      semana.push(
        <div key={`empty-${i}`} style={{ width: "60px", height: "60px" }}></div>
      );
    }

    // Llenar el resto del mes
    for (let day = 1; day <= totalDias; day++) {
      const dateKey = `2023-08-${String(day).padStart(2, "0")}`;
      const eventType = diasConEventos[dateKey];

      let bgColor = "";
      if (eventType === "Deportivos") bgColor = "yellow";
      if (eventType === "Charlas") bgColor = "red";

      semana.push(
        <Paper
          key={day}
          sx={{
            width: "60px",
            height: "60px",
            backgroundColor: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2px",
          }}
        >
          <Typography variant="body2">{day}</Typography>
        </Paper>
      );

      // Cada 7 días, agregar la semana al calendario y reiniciar
      if (semana.length === 7) {
        calendario.push(
          <div key={`week-${calendario.length}`} style={{ display: "flex" }}>
            {semana}
          </div>
        );
        semana = [];
      }
    }

    // Si queda una última semana incompleta, añadirla
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
    <div
      style={{
        width: "440px",
        margin: "auto",
      }}
    >
      {/* Encabezado con los días de la semana */}
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

      {/* Renderizado del calendario en semanas */}
      {renderCalendar()}
    </div>
  );
};

export default CalendarioEventos;
