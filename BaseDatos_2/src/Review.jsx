import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const [amabilidad, setAmabilidad] = useState("3");
  const [exactitud, setExactitud] = useState("3");
  const [tieneQueja, setTieneQueja] = useState(false);
  const [motivoQueja, setMotivoQueja] = useState("");
  const [gravedadQueja, setGravedadQueja] = useState("3");
  const [platoBebidaQueja, setPlatoBebidaQueja] = useState('');
  const [tipoQueja, setTipoQueja] = useState("");
  const [personalQueja, setPersonalQueja] = useState("");
  const [comidaQueja, setComidaQueja] = useState("");

  const opciones = {
    1: "1 (Bajo)",
    2: "2",
    3: "3",
    4: "4",
    5: "5 (Muy alto)",
  };

  const opcionesGravedad = {
    1: "1 (Problema pequeño)",
    2: "2",
    3: "3",
    4: "4",
    5: "5 (Problema muy grave)",
  };

  const handleSubmit = () => {
    // Procesar la información de la encuesta aquí
    const datosReview = {
      amabilidad,
      exactitud,
      queja: tieneQueja
        ? { motivoQueja, gravedadQueja, platoBebidaQueja }
        : null,
    };
    console.log(datosReview);
    // Navegar a otra página al finalizar la encuesta
    navigate("/opciones");
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
      width: "500px", // Ajusta al tamaño que necesites
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
    backgroundColor: "#4CAF50", // Color para el botón activo
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
                style={{ ...styles.input, width: "100%", margin: "10px 0" }} // Ajustar para que ocupe el 100% del ancho disponible
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
              <input
                style={styles.input}
                type="text"
                placeholder="Nombre del personal"
                value={personalQueja}
                onChange={(e) => setPersonalQueja(e.target.value)}
              />
            )}

            {tipoQueja === "comida" && (
              <input
                style={styles.input}
                type="text"
                placeholder="Nombre de su comida"
                value={comidaQueja}
                onChange={(e) => setComidaQueja(e.target.value)}
              />
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
