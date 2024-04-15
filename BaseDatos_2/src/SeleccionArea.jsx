import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 


const SeleccionArea = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState(''); 
  const [areaId, setAreaId] = useState(null); 
  const [isSmokingArea, setIsSmokingArea] = useState(null);

  const areas = [
    { nombre: 'Patio', id: 1 },
    { nombre: 'Salón 1', id: 2 },
    { nombre: 'Salón 2', id: 3 },
    { nombre: 'Pérgola', id: 4 }
  ];

  const handleAreaSelection = (areaSeleccionada) => {
    setArea(areaSeleccionada.nombre);
    setAreaId(areaSeleccionada.id); 
  };
  const handleSmokingSelection = (smoking) => {
    setIsSmokingArea(smoking);
  };

  

  const fetchMesasDisponibles = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/mesas-disponibles/${areaId}?es_para_fumadores=${isSmokingArea}`);
      if (!response.ok) {
        throw new Error('Respuesta del servidor no fue OK.');
      }
      const mesasDisponibles = await response.json();

      const ruta = isSmokingArea ? '/seleccion-mesa-fumadores' : '/seleccion-mesa-no-fumadores';
      navigate(ruta, { state: { mesas: mesasDisponibles, areaId, isSmokingArea } });
    } catch (error) {
      console.error('Error al obtener las mesas disponibles:', error);
    }
  };


  const handleSubmit = () => {
    if (areaId != null && isSmokingArea != null) {
      fetchMesasDisponibles();
      fetch('http://localhost:3001/api/guardar-seleccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ areaId, isSmokingArea }),
      });
    } else {
      alert('Por favor, selecciona un área y si deseas estar en la zona de fumadores.');
    }
  };
  
  
  

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ADD8E6', 
      color: '#333', 
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      border: '1px solid #ddd', 
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#f8f8f8', 
      color: '#333', 
    },
    selected: {
      backgroundColor: '#4CAF50', 
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
        {areas.map((areaObjeto) => (
          <button
            key={areaObjeto.id}
            onClick={() => handleAreaSelection(areaObjeto)}
            style={areaId === areaObjeto.id ? { ...styles.button, ...styles.selected } : styles.button}
          >
            {areaObjeto.nombre}
          </button>
        ))}
      </div>
      <h3 style={styles.question}>¿Quieres estar en el área de fumadores?</h3>
      <div>
        <button
          onClick={() => handleSmokingSelection(true)}
          style={isSmokingArea === true ? { ...styles.button, ...styles.selected } : styles.button}
        >
          Sí
        </button>
        <button
          onClick={() => handleSmokingSelection(false)}
          style={isSmokingArea === false ? { ...styles.button, ...styles.selected } : styles.button}
        >
          No
        </button>
      </div>
      <button
        onClick={handleSubmit}
        style={areaId !== null && isSmokingArea !== null ? { ...styles.button, ...styles.selected } : { ...styles.button, backgroundColor: '#ccc' }}
        disabled={areaId === null || isSmokingArea === null}
      >
        Continuar
      </button>
    </div>
  );
};

export default SeleccionArea;
