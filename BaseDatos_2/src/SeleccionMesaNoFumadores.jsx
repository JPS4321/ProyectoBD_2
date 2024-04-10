import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionMesaNoFumadores = () => {
  const navigate = useNavigate();
  const [selectedMesa, setSelectedMesa] = useState(null);

  const handleSeleccionMesa = (mesaId) => {
    setSelectedMesa(mesaId);
  };

  const handleAbrirFactura = () => {
    // Aquí podrías enviar la información necesaria a tu backend y luego redirigir.
    console.log('Redirigiendo a Tomar Orden para la mesa:', selectedMesa);
    navigate('/tomar-orden', { state: { mesaId: selectedMesa, area: 'no fumadores' } });
  };

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ADD8E6',
    },
    mesaContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '20px',
      maxWidth: '600px',
    },
    button: {
      padding: '10px 20px',
      margin: '5px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#f8f8f8',
      color: '#333',
      fontSize: '1rem',
    },
    selectedButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    facturaButton: {
      padding: '10px 20px',
      marginTop: '20px',
      backgroundColor: '#5cb85c',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    disabledButton: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    title: {
      color: '#333',
      fontSize: '1.5rem',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Área No Fumadores - Selecciona tu Mesa</h1>
      <div style={styles.mesaContainer}>
        {[1, 2, 3, 4, 5, 6].map((mesaId) => (
          <button
            key={mesaId}
            onClick={() => handleSeleccionMesa(mesaId)}
            style={selectedMesa === mesaId ? { ...styles.button, ...styles.selectedButton } : styles.button}
          >
            Mesa {mesaId}
          </button>
        ))}
      </div>
      <button
        onClick={handleAbrirFactura}
        style={selectedMesa ? styles.facturaButton : { ...styles.facturaButton, ...styles.disabledButton }}
        disabled={!selectedMesa}
      >
        Abrir Factura
      </button>
    </div>
  );
};

export default SeleccionMesaNoFumadores;
