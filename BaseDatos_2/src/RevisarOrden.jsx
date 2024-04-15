import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RevisarOrden = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pedido } = location.state; 

  console.log('Pedido recibido en RevisarOrden:', pedido);

  const confirmarPedido = async () => {
    const selectedMesa = localStorage.getItem('selectedMesa'); 
    const storedUser = localStorage.getItem('user'); 
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    if (!user || !user.id_usuario) {
      alert('No hay información del usuario para el pedido.');
      return;
    }

    const fechaPedido = new Date().toISOString().slice(0, 10); 
    const horaInicio = new Date().toLocaleTimeString('en-US', { hour12: false }); 

    const datosPedido = {
      id_mesa: selectedMesa,
      id_usuario: user.id_usuario,
      fecha_pedido: fechaPedido,
      hora_inicio: horaInicio,
      detalles: pedido.map(item => ({ 
        id_item: item.id_item,
        cantidad: item.cantidad,
        subtotal: item.subtotal 
      })),
    };
    console.log('Datos del pedido que se enviarán:', datosPedido);

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/api/crear-pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosPedido),
      });

      const data = await response.json();
      setIsSubmitting(false);
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al realizar la solicitud.');
      }

      navigate('/seleccion-area', {
        replace: true,
        state: { pedidoId: data.id_pedido, mensaje: 'Pedido confirmado con éxito' },
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error al enviar el pedido:', error);
      alert('Error al enviar el pedido: ' + error.message);
    }
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
      <button onClick={confirmarPedido} disabled={isSubmitting}>
        {isSubmitting ? 'Confirmando...' : 'Confirmar'}
      </button>
    </div>
  );
};

export default RevisarOrden;