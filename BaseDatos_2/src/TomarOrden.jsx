import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TomarOrden = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [pedido, setPedido] = useState([]);

  // Simulamos la obtención de productos desde una base de datos
  const productosDisponibles = [
    { id: 1, nombre: 'Café' },
    { id: 2, nombre: 'Té' },
    { id: 3, nombre: 'Jugo de Naranja' },
  ];

  const agregarAlPedido = () => {
    if (!producto) {
      alert('Por favor, ingresa un producto.');
      return;
    }

    const productoSeleccionado = productosDisponibles.find(p => p.id.toString() === producto);
    const nuevoItem = { producto, cantidad };
    setPedido([...pedido, nuevoItem]);

    setProducto('');
    setCantidad(1);
  };

  /*
  const enviarPedido = async () => {
    if (pedido.length === 0) {
      alert('No hay productos en el pedido para enviar.');
      return;
    }
  
    try {
      const response = await axios.post('/api/pedidos', { pedido });
      console.log(response.data);
      navigate('/revisar-orden', { state: { pedido } });
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }
  };
  */

  const enviarPedido = () => {
    if (pedido.length === 0) {
      alert('No hay productos en el pedido para enviar.');
      return;
    }

    // Simulamos una respuesta de un backend exitoso.
    console.log('Pedido:', pedido);
    // Imaginamos que la respuesta fue exitosa y navegamos a la siguiente página.
    navigate('/revisar-orden', { state: { pedido } });
  };

  // Estilos en línea
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#ADD8E6', // Color celeste para el fondo
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ccc',
      
      borderRadius: '5px',
      width: '200px', // O el ancho que prefieras
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
    pedidoContainer: {
      marginTop: '20px',
    },
    listItem: {
      backgroundColor: '#f8f8f8',
      margin: '5px 0',
      padding: '5px',
      borderRadius: '5px',
      color: "black",
      backgroundColor: "white"
    },
    titulos: {
      color: "black",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulos}>Toma de Pedido</h2>
      <div style={styles.formContainer}>
        <select
          style={styles.input}
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {productosDisponibles.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nombre}
            </option>
          ))}
        </select>
        <input
          style={styles.input}
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          min="1"
          onChange={(e) => setCantidad(parseInt(e.target.value))}
        />
        <button style={styles.button} onClick={agregarAlPedido}>
          Agregar al Pedido
        </button>
        <button style={styles.button} onClick={enviarPedido}>
          Enviar Pedido
        </button>
      </div>

      {pedido.length > 0 && (
        <div style={styles.pedidoContainer}>
          <h3 style={styles.titulos}>Pedido Actual</h3>
          <ul>
            {pedido.map((item, index) => (
              <li key={index} style={styles.listItem}>
                {`${item.cantidad}x ${item.producto}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TomarOrden;