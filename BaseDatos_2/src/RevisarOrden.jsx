import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RevisarOrden = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pedido } = location.state; // Asegúrate de que 'pedido' está siendo pasado en el estado.

  const confirmarPedido = () => {
    navigate('/seleccion-area', { state: { pedido } });
  };

  // Aquí van tus estilos, pueden ser ajustados según tus necesidades.
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ADD8E6',
    },
    pedidoContainer: {
      marginTop: '20px',
      backgroundColor: 'white',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    item: {
      margin: '10px 0',
      padding: '10px',
      borderBottom: '1px solid #ccc',
      backgroundColor: 'white',
      color: 'black', 
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#4CAF50', // Verde para el botón
      color: 'white',
      cursor: 'pointer',
    },
    title: {
      color: '#000', // Texto negro para el título
      marginBottom: '1rem', // Espacio debajo del título
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Revisar Orden</h2>
      <div style={styles.pedidoContainer}>
        {pedido && pedido.map((item, index) => (
          <div key={index} style={styles.item}>
            <span>{item.producto}</span>
            <span> - Cantidad: {item.cantidad}</span>
          </div>
        ))}
      </div>
      <button style={styles.button} onClick={confirmarPedido}>Confirmar</button>
    </div>
  );
};

export default RevisarOrden;