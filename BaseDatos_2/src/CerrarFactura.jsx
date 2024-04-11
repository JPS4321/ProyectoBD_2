import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CerrarFactura = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pedido } = location.state || [];

  const [nit, setNit] = useState('');
  const precioPorItem = 10; // Precio simulado por ítem

  // Simula la recuperación de datos del usuario y precios de la base de datos.
  const usuario = "Nombre del Usuario"; // Sustituir con datos del backend.
  const direccion = "Dirección del Usuario"; // Sustituir con datos del backend.

  const calcularTotalPorItem = (cantidad) => {
    // Aquí conectarías con tu backend para obtener el precio real por ítem
    return cantidad * precioPorItem; // Sustituir con el precio real cuando esté disponible.
  };

  const procederAPagar = () => {
    // Pasar el total del pedido a la siguiente pantalla
    const totalAPagar = calcularTotalPedido();
    navigate('/pago', { state: { totalAPagar } });
  };

  const calcularTotalPedido = () => {
    return pedido.reduce((total, item) => total + calcularTotalPorItem(item.cantidad), 0);
  };

  // Estilos 
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ADD8E6',
      padding: '20px',
      boxSizing: 'border-box', // Asegura que el padding no añada ancho al contenedor
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      width: '300px', // Un ancho más adecuado para los campos de entrada
    },
    pedidoContainer: {
      marginTop: '20px',
      backgroundColor: 'white',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '80%', // Puede usar un porcentaje del ancho de la ventana
      maxWidth: '600px', // Un máximo para que no se vea demasiado ancho en pantallas grandes
    },
    item: {
      margin: '10px 0',
      padding: '10px',
      borderBottom: '1px solid #ccc',
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
    detalleUsuario: {
      backgroundColor: 'white',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      width: '80%', // Alineado con el contenedor de pedido
      maxWidth: '600px', // Alineado con el contenedor de pedido
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.detalleUsuario}>
        <h2>Cerrar Factura</h2>
        <p>Nombre: {usuario}</p>
        <p>Dirección: {direccion}</p>
        <input
          style={styles.input}
          type="text"
          placeholder="NIT"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
        />
      </div>
      <div style={styles.pedidoContainer}>
        <h3>Resumen de Pedido</h3>
        {pedido.map((item, index) => (
          <div key={index} style={styles.item}>
            <span>{item.producto} - Cantidad: {item.cantidad}</span>
            <span> - Precio unitario: ${precioPorItem.toFixed(2)}</span>
            <span> - Subtotal: ${calcularTotalPorItem(item.cantidad).toFixed(2)}</span>
          </div>
        ))}
        <h4>Total del Pedido: ${calcularTotalPedido().toFixed(2)}</h4>
      </div>
        <button style={styles.button} onClick={procederAPagar}>Proceder a Pagar</button>
    </div>
  );
};

export default CerrarFactura;