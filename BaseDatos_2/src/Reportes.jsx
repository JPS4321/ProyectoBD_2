import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reportes = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [numOfPeople, setNumOfPeople] = useState('')
  const [showDateForReportSix, setShowDateForReportSix] = useState(false);

  const handleSelectReport = (reportNumber) => {
    setSelectedReport(reportNumber);
    // Resetear los estados de fecha y cantidad de personas al seleccionar un nuevo reporte
    setStartDate('');
    setEndDate('');
    setNumOfPeople('');
    setShowDateForReportSix(reportNumber === 6);
  };

  const handleSearchReport = () => {
    console.log(
      "Buscar reporte con fecha inicial:",
      startDate,
      "y fecha final:",
      endDate
    );
    // Aquí se agregará la lógica para buscar el reporte
    // Esta función podría enviar la solicitud al backend o actualizar el estado para mostrar el reporte
  };

  // Estilos para la página
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#ADD8E6",
      textAlign: "center",
      padding: "20px",
      boxSizing: "border-box",
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      margin: "20px 0",
      color: "black",
    },
    title: {
      margin: "20px 0",
      fontSize: "2.5rem",
      color: "black",
    },
    instructionList: {
      listStyleType: "none",
      padding: 0,
      margin: "20px 0",
    },
    instructionItem: {
      marginBottom: "10px",
      color: "black",
    },
    button: {
      padding: "10px 20px",
      margin: "5px", // Un poco de espacio entre botones
      fontSize: "1rem",
      cursor: "pointer",
      borderRadius: "5px",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
    },
    input: {
      padding: '0.5rem',
      margin: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
      color: "black",
    },
    label: {
      display: 'block',
      margin: '0.5rem 0',
      color: "black",
    },
    otrosTitulos: {
      color: "black",
    }
  };

  const dateRangeStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px 0",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reportes</h1>
      <ul style={styles.instructionList}>
        <li style={styles.instructionItem}>
          1. Platos más pedidos por los clientes en un rango de fechas.
        </li>
        <li style={styles.instructionItem}>
          2. Horario en el que se ingresan más pedidos entre un rango de fechas.
        </li>
        <li style={styles.instructionItem}>
          3. Promedio de tiempo en que se tardan los clientes en comer,
          agrupando la cantidad de personas comiendo.
        </li>
        <li style={styles.instructionItem}>
          4. Quejas agrupadas por persona para un rango de fechas.
        </li>
        <li style={styles.instructionItem}>
          5. Quejas agrupadas por plato para un rango de fechas.
        </li>
        <li style={styles.instructionItem}>
          6. Eficiencia de meseros mostrando los resultados de las encuestas,
          agrupado por personas y por mes para los últimos 6 meses.
        </li>
      </ul>
      <div style={styles.buttonsContainer}>
        {[...Array(6).keys()].map((number) => (
          <button
            key={number}
            style={styles.button}
            onClick={() => handleSelectReport(number + 1)}
          >
            Reporte {number + 1}
          </button>
        ))}
      </div>

      {[1, 2, 4, 5].includes(selectedReport) && (
        <div style={dateRangeStyles}>
          <h3 style={styles.otrosTitulos}>{`Fecha para reporte ${selectedReport}`}</h3>
          <label style={styles.label}>
            Fecha inicial:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Fecha final: 
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <button style={styles.button} onClick={handleSearchReport}>
            Buscar Reporte
          </button>
        </div>
      )}

      {selectedReport === 3 && (
        <div style={dateRangeStyles}>
          <h3 style={styles.otrosTitulos}>Reporte 3: Cantidad de personas</h3>
          <label style={styles.label}>
            Cantidad de personas:
            <input
              type="number"
              min="1"
              value={numOfPeople}
              onChange={(e) => setNumOfPeople(e.target.value)}
              style={styles.input}
            />
          </label>
          {/* Incluir campos de fecha si es necesario para este reporte */}
          {/* ... */}
          <button
            style={styles.button}
            onClick={handleSearchReport}
          >
            Buscar Reporte
          </button>
        </div>
      )}

      {showDateForReportSix && (
        <div style={dateRangeStyles}>
          {/* Aquí puedes poner los campos de fecha para el reporte 6 */}
          <button style={styles.button} onClick={handleSearchReport}>
            Buscar Reporte
          </button>
        </div>
      )}

    </div>
  );
};

export default Reportes;
