import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CerrarFactura = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pedido = location.state?.pedido ?? [];
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nit, setNit] = useState(""); 
  const [pedidos, setPedidos] = useState([]);
  const [pedidoId, setPedidoId] = useState(null);
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const fetchDetallesPedido = async () => {
      setLoading(true);
  
      const id_mesa = localStorage.getItem('selectedMesa');
      if (!id_mesa) {
        console.error('No se encontró el id de la mesa en localStorage.');
        setLoading(false);
        return;
      }
  
      try {
        const responsePedidosAbiertos = await fetch(`http://localhost:3001/api/pedidos-abiertos/${id_mesa}`);
        const pedidosAbiertos = await responsePedidosAbiertos.json();
        
        if (pedidosAbiertos.length === 0) {
          console.error('No hay pedidos abiertos para esta mesa.');
          setLoading(false);
          return;
        }
        
        const id_pedido = pedidosAbiertos[0].id_pedido;
        localStorage.setItem('pedidoactual', id_pedido);

        
        const responseDetalles = await fetch(`http://localhost:3001/api/detalles-pedido/${id_pedido}`);
        const detalles = await responseDetalles.json();
  
        const detallesConItems = await Promise.all(detalles.map(async (detalle) => {
          try {
            const res = await fetch(`http://localhost:3001/api/items/${detalle.id_item}`);
            const itemData = await res.json();
            return { ...detalle, nombre: itemData.nombre, precio: itemData.precio };
          } catch (error) {
            console.error(`Error fetching item ${detalle.id_item}:`, error);
            return { ...detalle, nombre: 'Ítem no encontrado', precio: 0 };
          }
        }));
  
        setDetallesPedido(detallesConItems);
      } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDetallesPedido();
  }, []); 


  
  
  const procederAPagar = async () => {
    const totalDelPedido = calcularTotalPedido(); 
    const propina = totalDelPedido * 0.10; 
    const totalConPropina = totalDelPedido + propina;
  
    const id_pedido = localStorage.getItem('pedidoactual');
  
    const cliente = {
      nombre: nombre, 
      direccion: direccion, 
      nit: nit, 
    };
  
    if (!id_pedido) {
      console.error('No hay un id_pedido guardado en localStorage.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/facturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pedido,
          total_sin_propina: totalDelPedido,
          total_con_propina: totalConPropina,
          cliente, 
        }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al crear la factura.');
      localStorage.setItem('Id_facturaActual', data.factura.id_factura);
      console.log("Id de la factura actual: ", data.factura.id_factura);
  
      console.log('Factura creada con éxito:', data);
      navigate('/pago', { state: { factura: data } }); 
  
    } catch (error) {
      console.error('Error al crear la factura:', error);
    }
  };
  
  
  
  

  const calcularTotalPedido = () => {
    return detallesPedido.reduce((total, item) => total + item.subtotal, 0);
  
  };
  // Estilos
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: "#ADD8E6",
      padding: "20px",
      boxSizing: "border-box", 
    },
    input: {
      margin: "10px 0",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "300px",
      backgroundColor: "white",
      color: "black",
    },
    pedidoContainer: {
      marginTop: "20px",
      backgroundColor: "white",
      borderRadius: "5px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "80%", 
      maxWidth: "600px", 
    },
    item: {
      margin: "10px 0",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      backgroundColor: 'white',
      color: 'black', 
    },
    button: {
      padding: "10px 20px",
      margin: "10px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#4CAF50", 
      color: "white",
      cursor: "pointer",
    },
    detalleUsuario: {
      backgroundColor: "white",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      width: "80%", 
      maxWidth: "600px", 
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    labelStyles: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: "black",
    },
    inputContainerStyles: {
      marginBottom: '10px',
    },
    title: {
      color: "black",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.detalleUsuario}>
        <h2 style={styles.title}>Cerrar Factura</h2>
        <div style={styles.inputContainerStyles}>
          <label style={styles.labelStyles}>Nombre:</label>
          <input
            style={styles.input}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div style={styles.inputContainerStyles}>
          <label style={styles.labelStyles}>Dirección:</label>
          <input
            style={styles.input}
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div style={styles.inputContainerStyles}>
          <label style={styles.labelStyles}>NIT:</label>
          <input
            style={styles.input}
            type="text"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
          />
        </div>
      </div>
  
      <div style={styles.pedidoContainer}>
        <h3 style={styles.title}>Resumen de Pedido</h3>
        {loading ? (
          <p>Cargando detalles del pedido...</p>
        ) : (
          detallesPedido.map((detalle, index) => (
            <div key={index} style={styles.item}>
              <span>{detalle.nombre || 'Ítem no encontrado'} - </span>
              <span>Cantidad: {detalle.cantidad} - </span>
              <span>Precio unitario: ${detalle.precio ? detalle.precio.toFixed(2) : 'N/A'} - </span>
              <span>Subtotal: ${detalle.subtotal ? detalle.subtotal.toFixed(2) : 'N/A'}</span>
            </div>
          ))
        )}
        <h4 style={styles.title}>Total del Pedido: ${calcularTotalPedido().toFixed(2)}</h4>

      </div>
  
      <button style={styles.button} onClick={procederAPagar}>
        Proceder a Pagar
      </button>
    </div>
  );
};

export default CerrarFactura;
