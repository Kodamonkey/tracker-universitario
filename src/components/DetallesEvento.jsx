import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const DetallesEvento = ({ eventos }) => {
  const { date } = useParams(); // Obtén la fecha desde la URL
  const navigate = useNavigate();
  const evento = eventos[date]; // Encuentra el evento correspondiente
  const [timeRemaining, setTimeRemaining] = useState({});

  // Función para calcular el tiempo restante hasta el evento
  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!evento) return;

      const eventDate = new Date(evento.date);
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining(null); // El evento ya pasó
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, [evento]);

  if (!evento) {
    return (
      <Typography variant="h6" align="center">
        Evento no encontrado.
      </Typography>
    );
  }

  const handleShare = (platform) => {
    const shareText = `¡Mira este evento: ${evento.name} el ${evento.date}!`;
    const eventUrl = window.location.href; // Obtén la URL actual

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${eventUrl}`);
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${eventUrl}`
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(
          "Invitación a un evento"
        )}&body=${encodeURIComponent(shareText)} - ${eventUrl}`;
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText)} - ${eventUrl}`
        );
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        margin: "120px auto",
        maxWidth: "600px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {evento.name}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        <strong>Fecha:</strong> {evento.date}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        <strong>Descripción:</strong> {evento.description}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        <strong>Ubicación:</strong> {evento.location}
      </Typography>

      {/* Sección de Compartir */}
      <Box sx={{ margin: "20px 0" }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          Compartir este evento
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton onClick={() => handleShare("facebook")}>
            <FacebookIcon />
          </IconButton>
          <IconButton onClick={() => handleShare("twitter")}>
            <TwitterIcon />
          </IconButton>
          <IconButton onClick={() => handleShare("email")}>
            <EmailIcon />
          </IconButton>
          <IconButton onClick={() => handleShare("whatsapp")}>
            <WhatsAppIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Contador de Tiempo */}
      {timeRemaining ? (
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "16px", fontWeight: "bold" }}
          >
            {timeRemaining.days} DAYS {timeRemaining.hours} HOURS{" "}
            {timeRemaining.minutes} MIN {timeRemaining.seconds} SEC
          </Typography>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ color: "red", marginTop: "16px" }}>
          Este evento ya ha pasado.
        </Typography>
      )}

      {/* Botón de volver */}
      <Box sx={{ marginTop: "20px" }}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Volver al Calendario
        </Button>
      </Box>
    </Paper>
  );
};

export default DetallesEvento;
