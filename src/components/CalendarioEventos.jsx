import React from "react";
import { Paper, Typography } from "@mui/material";
//import { format } from "date-fns";

const CalendarioEventos = ({ events }) => {
  // Para el prototipo, simulemos algunos eventos de ejemplo
  const diasConEventos = {
    "2023-08-06": "Deportivos",
    "2023-08-14": "Charlas",
    "2023-08-20": "Deportivos",
    "2023-08-29": "Charlas",
  };

  const renderCalendar = () => {
    return Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const dateKey = `2023-08-${String(day).padStart(2, "0")}`;
      const eventType = diasConEventos[dateKey];

      let bgColor = "";
      if (eventType === "Deportivos") bgColor = "yellow";
      if (eventType === "Charlas") bgColor = "red";

      return (
        <Paper
          key={day}
          sx={{
            width: "60px",
            height: "60px",
            backgroundColor: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "5px",
          }}
        >
          <Typography variant="body2">{day}</Typography>
        </Paper>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "400px",
        margin: "auto",
      }}
    >
      {renderCalendar()}
    </div>
  );
};

export default CalendarioEventos;
