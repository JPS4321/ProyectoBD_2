import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FormaDePago = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAPagar } = location.state || { totalAPagar: 0 };

  const [pagoEfectivo, setPagoEfectivo] = useState('');
  const [pagoTarjeta, setPagoTarjeta] = useState('');

  // Aquí procesarías el pago en tu aplicación
  const procesarPago = () => {
    // Ejemplo: navegar a la próxima página o mostrar un mensaje de éxito
    navigate('/review');
  };

  // Estilos en línea
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
    formContainer: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '500px', // Ajusta al tamaño que necesites
    },
    title: {
      fontSize: '2rem',
      color: '#333',
      margin: '0 0 2rem 0',
      color: "black",
    },
    input: {
      width: '100%', // Para que el input use todo el ancho posible
      padding: '1rem',
      margin: '0.5rem 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: "white",
      color: "black",
    },
    button: {
      padding: '10px 20px',
      margin: '20px 0',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#4CAF50',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    label: {
      color: "black",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Forma de Pago</h2>
        <div style={styles.label}> 
          Monto a Pagar: ${totalAPagar.toFixed(2)}
        </div>
        <label style={styles.label}>
          Pago en efectivo
          <input
            style={styles.input}
            type="number"
            value={pagoEfectivo}
            onChange={(e) => setPagoEfectivo(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Pago con tarjeta
          <input
            style={styles.input}
            type="number"
            value={pagoTarjeta}
            onChange={(e) => setPagoTarjeta(e.target.value)}
          />
        </label>
        <button style={styles.button} onClick={procesarPago}>
          Pagar
        </button>
      </div>
    </div>
  );
};

export default FormaDePago;
