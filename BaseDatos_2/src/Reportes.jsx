import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reportes = () => {
  const navigate = useNavigate();
  const [showDateRange, setShowDateRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSelectReport = (reportNumber) => {
    if (reportNumber === 1) {
      setShowDateRange(true);
    } else {
      console.log(`Seleccionado reporte número: ${reportNumber}`);
      // Aquí se podría agregar más lógica dependiendo del reporte seleccionado
      // navigate(`/reporte-detallado/${reportNumber}`);
    }
  };

  const handleSearchReport = () => {
    console.log('Buscar reporte con fecha inicial:', startDate, 'y fecha final:', endDate);
    // Aquí se agregará la lógica para buscar el reporte
    // Esta función podría enviar la solicitud al backend o actualizar el estado para mostrar el reporte
  };

  // Estilos para la página
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '130vh',
      width: '100vw',
      backgroundColor: '#ADD8E6',
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    title: {
      margin: '20px 0',
      fontSize: '2.5rem',
      color: '#333',
    },
    instructionList: {
      listStyleType: 'none',
      padding: 0,
      margin: '20px 0',
    },
    instructionItem: {
      marginBottom: '10px',
    },
    button: {
      padding: '10px 20px',
      margin: '5px', // Un poco de espacio entre botones
      fontSize: '1.2rem',
      cursor: 'pointer',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      width: '300px', // Ancho fijo para alinear los botones
    }
  };

  const dateRangeStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0',
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reportes</h1>
      <ul style={styles.instructionList}>
        <li style={styles.instructionItem}>1. Platos más pedidos por los clientes en un rango de fechas.</li>
        <li style={styles.instructionItem}>2. Horario en el que se ingresan más pedidos entre un rango de fechas.</li>
        <li style={styles.instructionItem}>3. Promedio de tiempo en que se tardan los clientes en comer, agrupando la cantidad de personas comiendo.</li>
        <li style={styles.instructionItem}>4. Quejas agrupadas por persona para un rango de fechas.</li>
        <li style={styles.instructionItem}>5. Quejas agrupadas por plato para un rango de fechas.</li>
        <li style={styles.instructionItem}>6. Eficiencia de meseros mostrando los resultados de las encuestas, agrupado por personas y por mes para los últimos 6 meses.</li>
      </ul>
      {[...Array(6).keys()].map((number) => (
        <button
          key={number}
          style={styles.button}
          onClick={() => handleSelectReport(number + 1)}
        >
          Reporte {number + 1}
        </button>
      ))}

      {showDateRange && (
        <div style={dateRangeStyles}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
          />
          <button
            style={styles.button}
            onClick={handleSearchReport}
          >
            Buscar Reporte
          </button>
        </div>
      )}
    </div>
  );
};

export default Reportes;
