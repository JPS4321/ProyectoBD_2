import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email: username, contrasena: password });

      if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Usuario autenticado con éxito');
        navigate('/opciones');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Usuario o contraseña equivocado');
      } else {
        console.error('Error de autenticación', error);
      }
    }
  }; 

  /* Navegación Kou
  const handleSubmit = async (event) => {
    console.log('Usuario autenticado con éxito');
    navigate('/opciones');
  };
  */

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bienvenido</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

// Estilos en línea para el componente
const styles = {
    container: {
        width: '100vw', // 100% del ancho de la ventana
        height: '100vh', // 100% de la altura de la ventana
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ADD8E6', // O el código de color celeste que prefieras
        color: '#ffffff', // Texto blanco para mayor contraste
        textAlign: 'center',
        boxSizing: 'border-box', // Asegúrate de que padding y border no afecten el ancho/altura
        padding: '20px', // O el espaciado que prefieras
        margin: '0', // Elimina cualquier margen
      },
    card: {
      width: '350px',
      padding: '40px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
    },
    form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '3px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '15px',
      borderRadius: '3px',
      border: 'none',
      backgroundColor: '#5cb85c',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '10px',
    }
  };  

export default Login;