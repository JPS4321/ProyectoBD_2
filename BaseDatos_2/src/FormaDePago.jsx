import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FormaDePago = () => {
  const navigate = useNavigate();
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [pagoEfectivo, setPagoEfectivo] = useState('');
  const [pagoTarjeta, setPagoTarjeta] = useState('');
  const [metodoPago, setMetodoPago] = useState('Efectivo'); 
  const [cantidadAPagar, setCantidadAPagar] = useState('');

  useEffect(() => {
    
    const fetchTotalAPagar = async () => {
      const id_facturaActual = localStorage.getItem('Id_facturaActual');

      if (id_facturaActual) {
        try {
          const response = await fetch(`http://localhost:3001/api/factura-total/${id_facturaActual}`);
          const data = await response.json();
          if (response.ok) {
            setTotalAPagar(data.totalAPagar);
            setCantidadAPagar(data.totalAPagar);
          } else {
            throw new Error(data.message || 'No se pudo obtener el total de la factura');
          }
        } catch (error) {
          console.error('Error al obtener el total de la factura:', error);
        }
      }
    };

    const obtenerIdCliente = async () => {
      const id_facturaActual = localStorage.getItem('Id_facturaActual');
      if (id_facturaActual) {
        try {
          const response = await fetch(`http://localhost:3001/api/factura-cliente/${id_facturaActual}`);
          const data = await response.json();
          if (response.ok) {
            console.log('ID del cliente obtenido:', data.id_cliente);
            localStorage.setItem('id_cliente', data.id_cliente);
            return data.id_cliente; // Devuelve el ID del cliente obtenido
          } else {
            throw new Error('No se pudo obtener el ID del cliente');
          }
        } catch (error) {
          console.error('Error al obtener el ID del cliente:', error);
          throw error; 
        }
      }
      return null;
    };

    obtenerIdCliente();
    fetchTotalAPagar();
  }, []);

  

  
  const procesarPago = async () => {
    const montoAPagar = parseFloat(pagoEfectivo);
    if (isNaN(montoAPagar) || montoAPagar <= 0) {
      alert('Debe ingresar un monto a pagar válido.');
      return;
    }
  
    if (montoAPagar > totalAPagar) {
      alert('La cantidad a pagar no puede ser mayor que el total a pagar.');
      return;
    }
  
    try {
      const id_factura = localStorage.getItem('Id_facturaActual');
      const response = await fetch('http://localhost:3001/api/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_factura,
          monto: montoAPagar,
          forma_pago: metodoPago,
        }),
      });
  
      if (!response.ok) throw new Error('Error al procesar el pago.');
  
      const result = await response.json();
      const nuevoTotalAPagar = totalAPagar - montoAPagar;
  
      setTotalAPagar(nuevoTotalAPagar);
      setPagoEfectivo('');
  
      if (nuevoTotalAPagar === 0) {
        navigate('/Review');
      } else {
        alert(`El pago se ha realizado correctamente. Resta pagar: ${nuevoTotalAPagar.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Ocurrió un error al procesar el pago.');
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
    formContainer: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '500px', 
    },
    title: {
      fontSize: '2rem',
      color: '#333',
      margin: '0 0 2rem 0',
      color: "black",
    },
    input: {
      width: '100%', 
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
          Cantidad a Pagar
          <input
            style={styles.input}
            type="number"
            value={pagoEfectivo}
            onChange={(e) => setPagoEfectivo(e.target.value)}
          />
        </label>
        <div style={styles.label}>
          Método de Pago:
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            style={styles.input}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
        </div>

        
        
        <button style={styles.button} onClick={procesarPago}>
          Pagar
        </button>
      </div>
    </div>
  );
};

export default FormaDePago;
