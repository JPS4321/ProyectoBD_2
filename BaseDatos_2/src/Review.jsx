import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const [amabilidad, setAmabilidad] = useState("3");
  const [calidad, setCalidad] = useState("3");
  const [exactitud, setExactitud] = useState("3");
  const [tieneQueja, setTieneQueja] = useState(false);
  const [motivoQueja, setMotivoQueja] = useState("");
  const [gravedadQueja, setGravedadQueja] = useState("3");
  const [platoBebidaQueja, setPlatoBebidaQueja] = useState('');
  const [tipoQueja, setTipoQueja] = useState("");
  const [personalQueja, setPersonalQueja] = useState("");
  const [comidaQueja, setComidaQueja] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [items, setItems] = useState([]);
  const [idCliente, setIdCliente] = useState(null);



  const opciones = {
    1: "1 (Bajo)",
    2: "2",
    3: "3",
    4: "4",
    5: "5 (Muy alto)",
  };


  useEffect(() => {
    const cargarUsuarios = async () => {
      const respuesta = await fetch('http://localhost:3001/api/usuarios');
      const data = await respuesta.json();
      setUsuarios(data);
    };

    const cargarItems = async () => {
      const respuesta = await fetch('http://localhost:3001/api/items');
      const data = await respuesta.json();
      setItems(data);
    };
    obtenerIdCliente();
    cargarUsuarios();
    cargarItems();
  }, []);

  const handleSubmit = async () => {
    await enviarReview();
  
    await cerrarPedido();
  };

  const enviarReview = async () => {
    const id_pedido = localStorage.getItem('pedidoactual'); 
    const id_cliente =  localStorage.getItem('id_cliente');
  
    if (tieneQueja) {
      const quejaData = {
        id_cliente,
        motivo: motivoQueja,
        clasificacion: tipoQueja === "personal" ? 1 : 2,
        id_personal: tipoQueja === "personal" && personalQueja ? personalQueja : null,
        id_item: tipoQueja === "comida" && comidaQueja ? parseInt(comidaQueja) : null
      };
      
  
      try {
        const responseQueja = await fetch('http://localhost:3001/api/queja', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quejaData),
        });
  
        const resultQueja = await responseQueja.json();
        if (responseQueja.ok) {
          console.log('Queja enviada con éxito:', resultQueja);
        } else {
          throw new Error(resultQueja.message || 'Error al enviar la queja.');
        }
      } catch (error) {
        console.error('Error al enviar queja:', error);
        alert('Hubo un problema al enviar su queja. Por favor, inténtelo de nuevo.');
      }
    }
  
    const reviewData = {
      id_pedido,
      amabilidad_mesero: amabilidad,
      calidad_comida: calidad,
      exactitud_pedido: exactitud
    };
  
    try {
      const response = await fetch('http://localhost:3001/api/encuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Review enviada con éxito:', result);
        navigate('/opciones'); 
      } else {
        throw new Error(result.message || 'Error al enviar la review.');
      }
    } catch (error) {
      console.error('Error al enviar review:', error);
      alert('Hubo un problema al enviar su opinión. Por favor, inténtelo de nuevo.');
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
          setIdCliente(data.id_cliente);
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
  
  

  const cerrarPedido = async () => {
    const id_pedido = localStorage.getItem('pedidoactual'); 
  
    try {
      const response = await fetch('http://localhost:3001/api/cerrar-pedido', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_pedido }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Pedido cerrado:', result);
      } else {
        throw new Error(result.message || 'No se pudo cerrar el pedido.');
      }
    } catch (error) {
      console.error('Error al cerrar el pedido:', error);
      alert('Hubo un problema al cerrar el pedido. Por favor, inténtelo de nuevo.');
    }
  };
  

  // Estilos en línea
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      minHeight: "100vh",
      padding: "20px",
      boxSizing: "border-box",
      backgroundColor: '#ADD8E6',
    },
    formContainer: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "500px", 
    },
    title: {
      fontSize: "2rem",
      color: "#333",
      marginBottom: "2rem",
      color: "black",
    },
    select: {
      padding: "1rem",
      margin: "1rem 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
      backgroundColor: "white",
    color: "black",
    },
    button: {
      padding: "10px 20px",
      margin: "20px 0",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#4CAF50",
      color: "white",
      cursor: "pointer",
      fontSize: "1rem",
    },
    questionContainer: {
      width: "100%",
      margin: "20px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    quejaContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    label: {
      margin: "10px 0",
      color: "black",
    },
    input: {
      padding: "0.5rem",
      margin: "0.5rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "white", 
      color: "black",
    },
    letras: {
      color: "black",
    }
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "0 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    cursor: "pointer",
    outline: "none",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50", 
    color: "white",
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Encuesta de Servicio</h2>
        <label style={styles.label}>
          Califique la amabilidad del mesero entre 1 y 5
          <select
            style={styles.select}
            value={amabilidad}
            onChange={(e) => setAmabilidad(e.target.value)}
          >
            {Object.entries(opciones).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Califique la exactitud de lo recibido respecto a lo solicitado al
          mesero entre 1 y 5
          <select
            style={styles.select}
            value={exactitud}
            onChange={(e) => setExactitud(e.target.value)}
          >
            {Object.entries(opciones).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Califique la calidad de su comida entre 1 y 5
          <select
            style={styles.select}
            value={calidad}
            onChange={(e) => setCalidad(e.target.value)}
          >
            {Object.entries(opciones).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </label>

        <div style={styles.questionContainer}>
          <p style={styles.letras}>¿Tiene alguna queja?</p>
          <div style={styles.buttonGroup}>
            <button onClick={() => setTieneQueja(true)} style={styles.button}>
              Sí
            </button>
            <button onClick={() => setTieneQueja(false)} style={styles.button}>
              No
            </button>
          </div>
        </div>

        {tieneQueja && (
          <div style={styles.quejaContainer}>
            <label style={styles.label}>
              Motivo de la queja
              <textarea
                style={{ ...styles.input, width: "100%", margin: "10px 0" }} 
                value={motivoQueja}
                onChange={(e) => setMotivoQueja(e.target.value)}
              />
            </label>

            <div style={styles.questionContainer}>
              <p style={styles.letras}>Tipo de queja</p>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => setTipoQueja("personal")}
                  style={
                    tipoQueja === "personal" ? activeButtonStyle : buttonStyle
                  }
                >
                  Personal
                </button>
                <button
                  onClick={() => setTipoQueja("comida")}
                  style={
                    tipoQueja === "comida" ? activeButtonStyle : buttonStyle
                  }
                >
                  Comida
                </button>
              </div>
            </div>
            {tipoQueja === "personal" && (
  <select
    style={styles.select}
    value={personalQueja}
    onChange={(e) => setPersonalQueja(e.target.value)}
  >
    <option value="">Seleccione personal...</option>
    {usuarios.map((usuario) => (
      <option key={usuario.id_usuario} value={usuario.id_usuario}>
        {usuario.nombre}
      </option>
    ))}
  </select>
)}

{tipoQueja === "comida" && (
  <select
    style={styles.select}
    value={comidaQueja}
    onChange={(e) => setComidaQueja(e.target.value)}
  >
    <option value="">Seleccione un plato...</option>
    {items.map((item) => (
      <option key={item.id_item} value={item.id_item}>
        {item.nombre}
      </option>
    ))}
  </select>
)}

          </div>
        )}

        <button style={styles.button} onClick={handleSubmit}>
          Enviar Review
        </button>
      </div>
    </div>
  );
};

export default Review;
