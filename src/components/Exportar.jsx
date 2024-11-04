import React from "react";

function ExportButton() {
  const handleExport = () => {
    // Aquí colocarás la lógica de exportación
    alert("Función de exportación aún no implementada");
  };

  return (
    <button onClick={handleExport} className="export-button">
      Exportar
    </button>
  );
}

export default ExportButton;
