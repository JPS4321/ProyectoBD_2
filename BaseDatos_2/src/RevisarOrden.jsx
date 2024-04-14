import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RevisarOrden = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pedido } = location.state; 

  const confirmarPedido = () => {
    navigate('/seleccion-area', { state: { pedido } });
  };

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
      backgroundColor: '#4CAF50', 
      color: 'white',
      cursor: 'pointer',
    },
    title: {
      color: '#000', 
      marginBottom: '1rem', 
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