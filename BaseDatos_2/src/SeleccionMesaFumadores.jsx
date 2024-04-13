import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionMesaFumadores = () => {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);

  // Cargar las mesas disponibles para fumadores al montar el componente
  useEffect(() => {
    // Asegúrate de que la URL sea correcta según la configuración de tu servidor y la base de datos
    fetch('http://localhost:3001/api/mesas-disponibles/1?es_para_fumadores=true')
      .then(response => response.json())
      .then(data => setMesas(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Función para determinar el estilo de la mesa basado en el estado del pedido
  const getMesaStyle = (mesa) => ({
    padding: '10px',
    margin: '5px',
    backgroundColor: mesa.estado_pedido === 'Abierto' ? 'red' : 'green',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
  });

  // Manejador para seleccionar una mesa
  const handleSeleccionMesa = (mesaId) => {
    setSelectedMesa(mesaId);
  };

  // Manejador para abrir factura
  const handleAbrirFactura = () => {
    console.log('Redirigiendo a Tomar Orden para la mesa:', selectedMesa);
    navigate('/tomar-orden', { state: { mesaId: selectedMesa, area: 'fumadores' } });
  };

  // Estilos para diferentes componentes del UI
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
      <h1 style={styles.title}>Área Fumadores - Selecciona tu Mesa</h1>
      <div style={styles.mesaContainer}>
        {mesas.map((mesa) => (
          <button
            key={mesa.pk_mesa}
            onClick={() => handleSeleccionMesa(mesa.id_mesa)}
            style={selectedMesa === mesa.id_mesa ? { ...styles.button, ...styles.selectedButton } : styles.button}
          >
            Mesa {mesa.id_mesa} - Capacidad: {mesa.personas_mesa} personas
          </button>
        ))}
      </div>
      <button
        onClick={handleAbrirFactura}
        style={selectedMesa ? styles.facturaButton : { ...styles.facturaButton, ...styles.disabledButton }}
        disabled={!selectedMesa}
      >
        Abrir Pedido
      </button>
    </div>
  );
};

export default SeleccionMesaFumadores;
