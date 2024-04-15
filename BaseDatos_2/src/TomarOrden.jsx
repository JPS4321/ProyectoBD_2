import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const TomarOrden = () => {
  const navigate = useNavigate();
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [pedido, setPedido] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState('');




  useEffect(() => {
    fetch('http://localhost:3001/api/productos')
      .then(response => response.json())
      .then(setProductosDisponibles)
      .catch(error => console.error('Error fetching products:', error));
  }, []);


  const agregarAlPedido = () => {
    const producto = productosDisponibles.find(p => p.id_item.toString() === productoId);
    if (!producto ) {
      alert('Por favor, selecciona un producto válido.');
      return;
    }
    const nuevoItem = {
      id_item: producto.id_item,
      producto: producto.nombre,
      cantidad,
      precio: producto.precio,
      subtotal: cantidad * producto.precio,
    };
    console.log('Nuevo item que se agregará al pedido:', nuevoItem);
    setPedido(pedidoActual => [...pedidoActual, nuevoItem]);
  };
  
const handleSelectChange = (e) => {
  const id = e.target.value;
  setProductoId(id);
  
  // Encuentra la descripción del producto seleccionado
  const producto = productosDisponibles.find(p => p.id_item.toString() === id);
  setDescripcionSeleccionada(producto ? producto.descripcion : '');
};



  const enviarPedido = () => {
    if (pedido.length === 0) {
      alert('No hay productos en el pedido para enviar.');
      return;
    }
    console.log('Pedido enviado:', pedido);
    navigate('/revisar-orden', { state: { pedido } });
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#ADD8E6', 
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
      width: '200px', 
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
      <h2>Toma de Pedido</h2>
      <div style={styles.formContainer}>
        <select
          value={productoId}
          onChange={handleSelectChange}
          style={styles.input}
        >
          <option value="">Selecciona un producto</option>
          {productosDisponibles.map(({ id_item, nombre }) => (
            <option key={id_item} value={id_item}>{nombre}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          min="1"
          onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
          style={styles.input}
        />
         {productoId && ( // Aquí usamos productoId para verificar si algo está seleccionado
      <>
        <h2 style={{ color: 'black' }}>Descripción</h2>
        <p style={{ color: 'black' }}>{descripcionSeleccionada}</p>
      </>
    )}
        <button onClick={agregarAlPedido} style={styles.button}>Agregar al Pedido</button>
        <button onClick={enviarPedido} style={styles.button}>Enviar Pedido</button>
      </div>
      {pedido.length > 0 && (
        <div style={styles.pedidoContainer}>
          <h3>Pedido Actual</h3>
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