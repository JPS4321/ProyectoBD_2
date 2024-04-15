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
  
      // Obtén el id de la mesa seleccionada del localStorage
      const id_mesa = localStorage.getItem('selectedMesa');
      if (!id_mesa) {
        console.error('No se encontró el id de la mesa en localStorage.');
        setLoading(false);
        return;
      }
  
      try {
        // Primero, obtén el id_pedido asociado con el id de la mesa
        const responsePedidosAbiertos = await fetch(`http://localhost:3001/api/pedidos-abiertos/${id_mesa}`);
        const pedidosAbiertos = await responsePedidosAbiertos.json();
        
        // Si no hay pedidos abiertos, no continuar
        if (pedidosAbiertos.length === 0) {
          console.error('No hay pedidos abiertos para esta mesa.');
          setLoading(false);
          return;
        }
        
        // Asumimos que nos interesa el primer pedido abierto
        const id_pedido = pedidosAbiertos[0].id_pedido;
        localStorage.setItem('pedidoactual', id_pedido);

        
        // Ahora obtén los detalles del pedido usando el id_pedido
        const responseDetalles = await fetch(`http://localhost:3001/api/detalles-pedido/${id_pedido}`);
        const detalles = await responseDetalles.json();
  
        // Luego obtén los detalles de cada ítem en el pedido
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
  }, []); // Puedes agregar id_mesa como dependencia si es necesario que se actualice cuando cambie el valor en localStorage
  


  
  
  const procederAPagar = async () => {
    // Obtén el total del pedido y calcula la propina
    const totalDelPedido = calcularTotalPedido(); // Esta función debe devolver el total del pedido
    const propina = totalDelPedido * 0.10; // Calcula el 10% de propina
    const totalConPropina = totalDelPedido + propina;
  
    // Recupera el id del pedido actual del localStorage
    const id_pedido = localStorage.getItem('pedidoactual');
  
    // Datos del cliente que vienen de los inputs del formulario
    const cliente = {
      nombre: nombre, // Ya está en el estado debido a useState
      direccion: direccion, // Ya está en el estado debido a useState
      nit: nit, // Ya está en el estado debido a useState
    };
  
    // Si no hay un id_pedido, no continuar
    if (!id_pedido) {
      console.error('No hay un id_pedido guardado en localStorage.');
      return;
    }
  
    try {
      // Envía la solicitud POST al backend con la información de la factura y el cliente
      const response = await fetch('http://localhost:3001/api/facturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pedido,
          total_sin_propina: totalDelPedido,
          total_con_propina: totalConPropina,
          cliente, // Agrega los datos del cliente aquí
        }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al crear la factura.');
      localStorage.setItem('Id_facturaActual', data.factura.id_factura);
      console.log("Id de la factura actual: ", data.factura.id_factura);
  
      // Aquí puedes manejar la respuesta de la API, como redirigir al usuario
      console.log('Factura creada con éxito:', data);
      navigate('/pago', { state: { factura: data } }); // O donde quieras redirigir al usuario
  
    } catch (error) {
      console.error('Error al crear la factura:', error);
      // Manejo de errores en la interfaz de usuario
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
      boxSizing: "border-box", // Asegura que el padding no añada ancho al contenedor
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
      width: "80%", // Puede usar un porcentaje del ancho de la ventana
      maxWidth: "600px", // Un máximo para que no se vea demasiado ancho en pantallas grandes
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
      backgroundColor: "#4CAF50", // Verde para el botón
      color: "white",
      cursor: "pointer",
    },
    detalleUsuario: {
      backgroundColor: "white",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      width: "80%", // Alineado con el contenedor de pedido
      maxWidth: "600px", // Alineado con el contenedor de pedido
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
