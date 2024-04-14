import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RevisarOrden = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pedido } = location.state; // Asegúrate de que 'pedido' está siendo pasado en el estado.

  const confirmarPedido = async () => {
    const selectedMesa = localStorage.getItem('selectedMesa'); // ID de la mesa de localStorage
    const storedUser = localStorage.getItem('user'); // Información del usuario guardada en localStorage
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    if (!user || !user.id_usuario) {
      alert('No hay información del usuario para el pedido.');
      return;
    }

    const fechaPedido = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const horaInicio = new Date().toLocaleTimeString('en-US', { hour12: false }); // Formato HH:MM:SS

    // Prepara el cuerpo del pedido para enviar al servidor
    const datosPedido = {
      id_mesa: selectedMesa,
      id_usuario: user.id_usuario,
      fecha_pedido: fechaPedido,
      hora_inicio: horaInicio,
      detalles: pedido.map(item => ({ // Mapea los detalles del pedido adecuadamente
        id_item: item.id_item,
        cantidad: item.cantidad,
        subtotal: item.subtotal // Asume que el subtotal viene en el pedido
      })),
    };

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

      // Redirigir a la página de confirmación o mostrar un mensaje de éxito
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
      <button onClick={confirmarPedido} disabled={isSubmitting}>
        {isSubmitting ? 'Confirmando...' : 'Confirmar'} // Cambia el texto del botón según 'isSubmitting'
      </button>
    </div>
  );
};

export default RevisarOrden;