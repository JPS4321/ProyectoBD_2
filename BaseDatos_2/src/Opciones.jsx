import React from 'react';
import { useNavigate } from 'react-router-dom';

const Opciones = () => {
  const navigate = useNavigate();

  // Recuperar el usuario de localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleIrASeleccionArea = () => {
    navigate('/seleccion-area');
  };

  const handleIrAReportes = () => {
    navigate('/reportes');
  };

  // Estilos para los botones y el contenedor
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Centrado completo en el contenedor
      height: '100vh',
      width: '100vw', // Asegura que ocupa todo el ancho de la vista
      backgroundColor: '#ADD8E6', // Fondo celeste como en las otras páginas
    },
    title: {
      margin: '20px 0',
      fontSize: '2rem', // Título más grande
      color: '#333', // Color del texto
    },
    button: {
      padding: '10px 20px',
      margin: '10px', // Espacio arriba y abajo para cada botón
      fontSize: '1.5rem', // Tamaño de texto grande
      cursor: 'pointer',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0', // Color de fondo para los botones
      border: '1px solid #ccc', // Bordes sutiles
      width: '200px', // Ancho específico para los botones
      color: '#333', // Color del texto en negro
    },
    userInfo: {
      fontSize: '1rem', // Un tamaño más pequeño para el texto de la sesión
      color: '#555', // Un color más suave para el texto
      marginBottom: '20px', // Espacio antes del título principal
    },
  };
  console.log(user); // Suponiendo que 'nombre' es una de las propiedades del objeto usuario
  localStorage.setItem('Id_facturaActual', 6);

  return (
    <div style={styles.container}>
      {user && <div style={styles.userInfo}>Sesión Actual: {user.nombre}</div>}
      <h1 style={styles.title}>¿Qué quieres hacer?</h1>
      <button onClick={handleIrASeleccionArea} style={styles.button}>
        Asignar Área
      </button>
      <button onClick={handleIrAReportes} style={styles.button}>
        Hacer un Reporte
      </button>
    </div>
  );
};

export default Opciones;
