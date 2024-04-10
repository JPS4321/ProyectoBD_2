import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionArea = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [isSmokingArea, setIsSmokingArea] = useState(null);

  const areas = ['Patio', 'Salón 1', 'Salón 2', 'Pérgola'];

  const handleAreaSelection = (areaSeleccionada) => {
    setArea(areaSeleccionada);
  };

  const handleSmokingAreaSelection = (selection) => {
    setIsSmokingArea(selection);
  };

  const handleSubmit = () => {
    if (area) {
      if (isSmokingArea !== null) {
        // Decide a qué ruta dirigirse en base a si el usuario seleccionó fumadores o no fumadores
        const ruta = isSmokingArea ? '/seleccion-mesa-fumadores' : '/seleccion-mesa-no-fumadores';
        navigate(ruta, { state: { area } });
      } else {
        console.error('Por favor, indica si deseas estar en la zona de fumadores.');
      }
    } else {
      console.error('Por favor, selecciona un área.');
    }
  };

  // Estilos en línea centrados y con la paleta de colores elegida
  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ADD8E6', // Color celeste para el fondo
      color: '#333', // Color oscuro para el texto
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      border: '1px solid #ddd', // Borde sutil
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#f8f8f8', // Fondo claro para los botones
      color: '#333', // Color de texto
    },
    selected: {
      backgroundColor: '#4CAF50', // Verde para la selección
      color: 'white',
    },
    title: {
      margin: '20px 0',
      color: '#333',
    },
    question: {
      margin: '20px 0',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Selecciona el Área del Restaurante</h2>
      <div>
        {areas.map((areaNombre) => (
          <button
            key={areaNombre}
            onClick={() => handleAreaSelection(areaNombre)}
            style={area === areaNombre ? { ...styles.button, ...styles.selected } : styles.button}
          >
            {areaNombre}
          </button>
        ))}
      </div>
      <h3 style={styles.question}>¿Quieres estar en el área de fumadores?</h3>
      <div>
        <button
          onClick={() => handleSmokingAreaSelection(true)}
          style={isSmokingArea === true ? { ...styles.button, ...styles.selected } : styles.button}
        >
          Sí
        </button>
        <button
          onClick={() => handleSmokingAreaSelection(false)}
          style={isSmokingArea === false ? { ...styles.button, ...styles.selected } : styles.button}
        >
          No
        </button>
      </div>
      <button
        onClick={handleSubmit}
        style={area !== '' && isSmokingArea !== null ? { ...styles.button, ...styles.selected } : { ...styles.button, backgroundColor: '#ccc' }}
        disabled={area === '' || isSmokingArea === null}
      >
        Continuar
      </button>
    </div>
  );
};

export default SeleccionArea;
