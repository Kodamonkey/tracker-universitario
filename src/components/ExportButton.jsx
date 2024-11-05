import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const exportEventToCalendar = (events = []) => {
  if (!Array.isArray(events) || events.length === 0) {
    console.error("No hay eventos para exportar");
    return;
  }

  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n";

  events.forEach((event) => {
    const [year, month, day] = event.date.split("-").map(Number);
    const hour = event.hour || 0;
    const minute = event.minute || 0;

    icsContent += "BEGIN:VEVENT\n";
    icsContent += `SUMMARY:${event.name || "Evento sin título"}\n`;
    icsContent += `DTSTART:${year}${String(month).padStart(2, "0")}${String(
      day
    ).padStart(2, "0")}T${String(hour).padStart(2, "0")}${String(
      minute
    ).padStart(2, "0")}00Z\n`;
    icsContent += `DURATION:PT1H\n`;
    icsContent += `DESCRIPTION:${event.description || ""}\n`;
    icsContent += `LOCATION:${event.location || ""}\n`;
    icsContent += "STATUS:CONFIRMED\n";
    icsContent += "END:VEVENT\n";
  });

  icsContent += "END:VCALENDAR";

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  saveAs(blob, "eventos_universidad.ics");
};

const ExportButton = ({ events = [] }) => (
  <Button
    variant="contained"
    onClick={() => exportEventToCalendar(events)}
    sx={{
      backgroundColor: "#6c63ff",
      color: "white",
      marginTop: 4,
      padding: "12px 24px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // Sombra para efecto de elevación
      borderRadius: "8px", // Bordes redondeados
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        backgroundColor: "#5753cc",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.4)", // Sombra más intensa en hover
        transform: "translateY(-2px)", // Efecto de elevación al hacer hover
      },
    }}
  >
    Exportar a Calendario
  </Button>
);

export default ExportButton;
