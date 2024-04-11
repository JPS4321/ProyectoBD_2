import React, { useState } from 'react';
import axios from 'axios';

const TomaDePedido = () => {
  // Estados para manejar los datos del formulario y los pedidos por mesa.
  const [mesa, setMesa] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [pedidosPorMesa, setPedidosPorMesa] = useState({});

  // Agrega un nuevo producto al pedido de la mesa específica.
  const agregarAlPedido = () => {
    if (!mesa) {
      alert('Por favor, ingresa el número de la mesa.');
      return;
    }

    const nuevoItem = { producto, cantidad };
    // Actualiza el estado con el nuevo item agregado al pedido de la mesa correspondiente.
    setPedidosPorMesa({
      ...pedidosPorMesa,
      [mesa]: [...(pedidosPorMesa[mesa] || []), nuevoItem],
    });

    // Limpiar los campos de producto y cantidad.
    setProducto('');
    setCantidad(1);
  };

  // Envía todos los pedidos de la mesa a la API.
  const enviarPedido = async () => {
    if (!mesa || !pedidosPorMesa[mesa] || pedidosPorMesa[mesa].length === 0) {
      alert('No hay pedidos para enviar en esta mesa.');
      return;
    }

    try {
      const response = await axios.post('/api/pedidos', {
        mesa: mesa,
        pedido: pedidosPorMesa[mesa],
      });
      console.log(response.data);
      // Procesar la respuesta y limpiar el pedido de la mesa.
      const nuevosPedidosPorMesa = { ...pedidosPorMesa };
      delete nuevosPedidosPorMesa[mesa];
      setPedidosPorMesa(nuevosPedidosPorMesa);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Toma de Pedido</h2>
      <div>
        <label>
          Número de Mesa:
          <input type="number" value={mesa} onChange={(e) => setMesa(e.target.value)} />
        </label>
        <label>
          Producto:
          <input type="text" value={producto} onChange={(e) => setProducto(e.target.value)} />
        </label>
        <label>
          Cantidad:
          <input type="number" value={cantidad} min="1" onChange={(e) => setCantidad(parseInt(e.target.value))} />
        </label>
        <button onClick={agregarAlPedido}>Agregar al Pedido</button>
        <button onClick={enviarPedido}>Enviar Pedido</button>
      </div>

      {/* Visualización de pedidos por mesa */}
      <div>
        {Object.entries(pedidosPorMesa).map(([numeroDeMesa, pedido]) => (
          <div key={numeroDeMesa}>
            <h3>Mesa {numeroDeMesa}</h3>
            <ul>
              {pedido.map((item, index) => (
                <li key={index}>
                  {`${item.cantidad}x ${item.producto}`}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TomaDePedido;
