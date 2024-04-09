import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionArea = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const areas = ['Patio', 'Salon 1', 'Salon 2', 'Pergola'];

  const handleAreaSelection = (areaSeleccionada) => {
    setArea(areaSeleccionada);
    navigate('/toma-de-pedido', { state: { area: areaSeleccionada } });
  };

  // Estilos para centrar el contenido
  const containerStyle = {
    height: '100vh', // Ocupa toda la altura de la pantalla
    display: 'flex',
    flexDirection: 'column', // Los hijos se alinean verticalmente
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    textAlign: 'center' // Asegura que el texto también esté centrado
  };

  const buttonStyle = {
    margin: '10px', // Espacio alrededor de los botones
    padding: '10px 20px' // Padding para hacer los botones más grandes
  };

  return (
    <div style={containerStyle}>
      <h2>Selecciona un Área</h2>
      <div>
        {areas.map((areaNombre) => (
          <button
            key={areaNombre}
            style={buttonStyle}
            onClick={() => handleAreaSelection(areaNombre)}
          >
            {areaNombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeleccionArea;
