const express = require('express');
const pool = require('./db');
const cors = require('cors');
<<<<<<< HEAD
const fs = require('fs');

=======
const router = express.Router();
>>>>>>> 92e9315c9e92b408d228db7e2dea1f0787a0913a
const app = express();
app.use(cors());
app.use(express.json());

// Crear el router
const router = express.Router();

app.get('/api/data', async (req, res) => {
  try {
      const data = await pool.query('SELECT * FROM usuario');
      res.json(data.rows);
  } catch (err) {
      console.error(err.message);
  }
});


//ESTO ES DEL SELECCIONAR AREA


app.get('/api/obtener-seleccion', (req, res) => {
  try {
    if (fs.existsSync('seleccionArea.json')) {
      const seleccion = fs.readFileSync('seleccionArea.json', 'utf8');
      res.status(200).json(JSON.parse(seleccion));
    } else {
      res.status(404).json({ message: 'No hay selección guardada' });
    }
  } catch (error) {
    console.error('Error al leer el archivo de selección:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});


app.post('/api/guardar-seleccion', async (req, res) => {
  const { areaId, isSmokingArea } = req.body;
  try {
    const fs = require('fs');
    fs.writeFileSync('seleccionArea.json', JSON.stringify({ areaId, isSmokingArea }));

    res.status(200).json({ message: 'Selección guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la selección:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});


//ESTO ES PARA TOMAR ORDEN
router.get('/api/productos', async (req, res) => {
  try {
      const result = await pool.query('SELECT id_item, nombre FROM item');
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Server error');
  }
});




//ESTO ES DEL LOGIN

app.post('/api/login', async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    const data = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);

    if (data.rows.length > 0) {
      const user = data.rows[0];

      if (user.contrasena === contrasena) {
        res.json({ message: 'Login successful', user }); 
      } else {
        res.status(401).json({ error: 'Usuario o contraseña equivocado' });
      }
    } else {
      res.status(401).json({ error: 'Usuario o contraseña equivocado' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});
app.use(router);


// Endpoint para obtener mesas disponibles basadas en id_area y si es para fumadores
app.get('/api/mesas-disponibles/:id_area', async (req, res) => {
  try {
    const { id_area } = req.params;
    const esParaFumadores = req.query.es_para_fumadores === 'true';

    const mesasDisponibles = await pool.query(`
      SELECT m.pk_mesa, m.id_mesa, m.id_area, m.Personas_Mesa, m.es_para_fumadores, p.estado_pedido
      FROM mesa m
      LEFT JOIN (
        SELECT p.id_mesa, p.estado_pedido
        FROM pedido p
        INNER JOIN (
          SELECT id_mesa, MAX(id_pedido) AS last_pedido
          FROM pedido
          GROUP BY id_mesa
        ) pm ON p.id_mesa = pm.id_mesa AND p.id_pedido = pm.last_pedido
      ) p ON m.pk_mesa = p.id_mesa
      WHERE m.id_area = $1 AND m.es_para_fumadores = $2
      ORDER BY m.id_mesa;
    `, [id_area, esParaFumadores]);

    res.json(mesasDisponibles.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/api/facturas', async (req, res) => {
  const { cliente, detallesFactura } = req.body;

  try {
      // Buscar si el cliente ya existe en la base de datos
      let clienteResult = await pool.query('SELECT id_cliente FROM cliente WHERE nit = $1', [cliente.nit]);

      let clienteId;
      if (clienteResult.rows.length > 0) {
          // Cliente existe, obtener el id existente
          clienteId = clienteResult.rows[0].id_cliente;
      } else {
          // Cliente no existe, insertar nuevo cliente
          clienteResult = await pool.query(
              'INSERT INTO cliente (nombre, nit, direccion) VALUES ($1, $2, $3) RETURNING id_cliente',
              [cliente.nombre, cliente.nit, cliente.direccion]
          );
          clienteId = clienteResult.rows[0].id_cliente;
      }

      // Crear una nueva factura asociada al cliente
      const facturaResult = await pool.query(
          'INSERT INTO factura (id_cliente, total_sin_propina, fecha_hora_emision) VALUES ($1, $2, NOW()) RETURNING *',
          [clienteId, detallesFactura.total]
      );

      res.json({
          success: true,
          message: 'Factura creada con éxito',
          factura: facturaResult.rows[0],
          cliente: {
              id_cliente: clienteId,
              ...cliente
          }
      });
  } catch (error) {
      console.error('Error al crear la factura:', error);
      res.status(500).json({
          success: false,
          message: 'Error al procesar la solicitud',
          error: error.message
      });
  }
});
<<<<<<< HEAD
=======


>>>>>>> 92e9315c9e92b408d228db7e2dea1f0787a0913a
app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



