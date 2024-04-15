import React from 'react';
import { useNavigate } from 'react-router-dom';

const Opciones = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleIrASeleccionArea = () => {
    navigate('/seleccion-area');
  };

  const handleIrAReportes = () => {
    navigate('/reportes');
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      height: '100vh',
      width: '100vw', 
      backgroundColor: '#ADD8E6', 
    },
    title: {
      margin: '20px 0',
      fontSize: '2rem', 
      color: '#333', 
    },
    button: {
      padding: '10px 20px',
      margin: '10px', 
      fontSize: '1.5rem', 
      cursor: 'pointer',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0', 
      border: '1px solid #ccc', 
      width: '200px', 
      color: '#333', 
    },
    userInfo: {
      fontSize: '1rem', 
      color: '#555', 
      marginBottom: '20px', 
    },
  };
  console.log(user); 

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
