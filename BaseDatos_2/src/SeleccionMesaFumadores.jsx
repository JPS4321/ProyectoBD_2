import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const SeleccionMesaFumadores = () => {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);

  // Función para cargar las mesas según área y zona de fumadores
  const cargarMesas = async (areaId, isSmokingArea) => {
    try {
      const response = await fetch(`http://localhost:3001/api/mesas-disponibles/${areaId}?es_para_fumadores=${isSmokingArea}`);
      const data = await response.json();
      setMesas(data);
      console.log("Datos devueltos por la API:", data); 
    } catch (error) {
      console.error('Error fetching mesas:', error);
    }
  };

  // Obtener la selección guardada y cargar mesas
  const obtenerSeleccionGuardada = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/obtener-seleccion');
      if (response.ok) {
        const data = await response.json();
        console.log('Selección actual:', data);
        cargarMesas(data.areaId, data.isSmokingArea);
      } else {
        alert('No hay selección guardada.');
      }
    } catch (error) {
      console.error('Error al obtener la selección:', error);
      alert('Error al obtener la selección guardada.');
    }
  };

  useEffect(() => {
    obtenerSeleccionGuardada();
  }, []);

  const handleSeleccionMesa = (mesaId) => {
    setSelectedMesa(mesaId);
  };

  const getButtonStyle = (mesa) => {
    const baseStyle = {
      padding: '10px 20px',
      margin: '5px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      color: 'white', 
    };
  
    if (mesa.estado_pedido === 'Abierto') {
      return {
        ...baseStyle,
        backgroundColor: 'red',
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: 'green',
      };
    }
  };
  

  // Manjear apertura y cierre de factura
  const handleAbrirFactura = () => {
    localStorage.setItem('selectedMesa', selectedMesa);
    console.log('Redirigiendo a Tomar Orden para la mesa:', selectedMesa);
    navigate('/tomar-orden', { state: { mesaId: selectedMesa, area: 'fumadores' } });
  };

  const handleCerrarFactura = () => {
    localStorage.setItem('selectedMesa', selectedMesa);
    console.log('Redirigiendo al pago para la mesa:', selectedMesa);
    navigate('/pago', { state: { mesaId: selectedMesa } });
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
    openMesaButton: {
      backgroundColor: 'red',
      color: 'white',
    },
    selectedMesaButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
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
            onClick={() => handleSeleccionMesa(mesa.pk_mesa)}
            style={getButtonStyle(mesa)}
          >
            Mesa {mesa.id_mesa} - Capacidad: {mesa.personas_mesa} personas
          </button>
        ))}
      </div>
      
      <button
        onClick={handleAbrirFactura}
        style={selectedMesa ? { ...styles.button, ...styles.selectedMesaButton } : styles.button}
        disabled={!selectedMesa}
      >
        Abrir Pedido
      </button>

      <button
        onClick={handleCerrarFactura}
        style={selectedMesa ? { ...styles.button, ...styles.selectedMesaButton } : styles.button}
        disabled={!selectedMesa}
      >
        Cerrar Factura
      </button>
    </div>
  );
};

export default SeleccionMesaFumadores;
