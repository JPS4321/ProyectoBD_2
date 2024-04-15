const express = require('express');
const pool = require('./db');
const cors = require('cors');
const fs = require('fs');

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


//REPORTES

app.post('/api/reportes', async (req, res) => {
  const { tipoReporte, fechaInicio, fechaFin } = req.body;
  try {
      let resultado;
      switch (tipoReporte) {
          case 1:
                  resultado = await pool.query(`
                  SELECT i.nombre AS Plato, COUNT(dp.id_item) AS Cantidad_Pedida, SUM(dp.cantidad) AS Total_Unidades
                  FROM pedido p
                  JOIN detallepedido dp ON p.id_pedido = dp.id_pedido
                  JOIN item i ON dp.id_item = i.id_item
                  WHERE p.fecha_de_pedido BETWEEN $1 AND $2
                  GROUP BY i.nombre
                  ORDER BY Total_Unidades DESC
              `, [fechaInicio, fechaFin]);
              res.json(resultado.rows);              
              break;
          case 2:  // Horario con más pedidos
              resultado = await pool.query(`
                  SELECT EXTRACT(HOUR FROM p.hora_inicio) AS Hora, COUNT(*) AS Numero_de_Pedidos
                  FROM pedido p
                  WHERE p.fecha_de_pedido BETWEEN $1 AND $2
                  GROUP BY EXTRACT(HOUR FROM p.hora_inicio)
                  ORDER BY Numero_de_Pedidos DESC
              `, [fechaInicio, fechaFin]);
              res.json(resultado.rows);
              break;
          case 3:  // Promedio de tiempo comiendo
              resultado = await pool.query(`
                  SELECT m.Personas_Mesa AS Numero_de_Personas,
                  AVG(EXTRACT(EPOCH FROM (p.hora_cierre - p.hora_inicio)) / 60) AS Tiempo_Promedio_Minutos
                  FROM pedido p
                  JOIN mesa m ON p.id_mesa = m.pk_mesa
                  WHERE p.fecha_de_pedido BETWEEN $1 AND $2
                  GROUP BY m.Personas_Mesa
                  ORDER BY m.Personas_Mesa
              `, [fechaInicio, fechaFin]);
              res.json(resultado.rows);
              break;
          case 4:  // Quejas a personal
              resultado = await pool.query(`
                  SELECT 
                      c.nombre AS Nombre_del_Cliente,
                      u.nombre AS Nombre_del_Personal,
                      COUNT(q.id_queja) AS Numero_de_Quejas
                  FROM 
                      queja q
                  JOIN 
                      cliente c ON q.id_cliente = c.id_cliente
                  JOIN 
                      usuario u ON q.id_personal = u.id_usuario
                  WHERE 
                      q.fecha_hora BETWEEN $1 AND $2
                  GROUP BY 
                      c.nombre, u.nombre
                  ORDER BY 
                      Numero_de_Quejas DESC
              `, [fechaInicio, fechaFin]);
              res.json(resultado.rows);
              break;
          
          case 5: // Quejas agrupadas por plato
              resultado = await pool.query(`
                  SELECT i.nombre AS Nombre_del_Plato, COUNT(q.id_queja) AS Numero_de_Quejas
                  FROM queja q
                  JOIN item i ON q.id_item = i.id_item
                  WHERE q.fecha_hora BETWEEN $1 AND $2
                  GROUP BY i.nombre
                  ORDER BY Numero_de_Quejas DESC
              `, [fechaInicio, fechaFin]);
              res.json(resultado.rows);
              break;
          case 6:
              resultado = await pool.query(`
                  SELECT 
                      u.nombre AS Nombre_Mesero,
                      EXTRACT(YEAR FROM p.fecha_de_pedido) AS Ano,
                      EXTRACT(MONTH FROM p.fecha_de_pedido) AS Mes,
                      AVG(e.amabilidad_mesero) AS Promedio_Amabilidad,
                      AVG(e.calidad_comida) AS Promedio_Calidad_Comida,
                      AVG(e.exactitud_pedido) AS Promedio_Exactitud_Pedido
                  FROM 
                      usuario u
                  JOIN 
                      pedido p ON u.id_usuario = p.id_usuario
                  JOIN 
                      encuesta e ON p.id_pedido = e.id_pedido
                  WHERE 
                      p.fecha_de_pedido BETWEEN $1 AND $2
                  GROUP BY 
                      u.nombre, EXTRACT(YEAR FROM p.fecha_de_pedido), EXTRACT(MONTH FROM p.fecha_de_pedido)
                  ORDER BY 
                      u.nombre, EXTRACT(YEAR FROM p.fecha_de_pedido), EXTRACT(MONTH FROM p.fecha_de_pedido)
              `, [fechaInicio, fechaFin]);
              res.json(resultado.rows);
              break;
          default:
              return res.status(400).json({ error: "Tipo de reporte no especificado o no soportado" });
      }
  } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//ESTO ES DE CERRAR FACTURA

app.get('/api/pedidos-abiertos/:id_mesa', async (req, res) => {
  try {
    const { id_mesa } = req.params;

    const queryText = `
      SELECT id_pedido
      FROM pedido
      WHERE id_mesa = $1 AND estado_pedido = 'Abierto';
    `;
    const pedidosAbiertos = await pool.query(queryText, [id_mesa]);

    if (pedidosAbiertos.rowCount === 0) {
      return res.status(404).json({ message: "No hay pedidos abiertos para la mesa proporcionada." });
    }

    res.json(pedidosAbiertos.rows);
  } catch (error) {
    console.error('Error al obtener los pedidos abiertos:', error);
    res.status(500).json({ message: "Error al procesar la solicitud." });
  }
});


app.get('/api/detalles-pedido/:id_pedido', async (req, res) => {
  try {
    // Obtener el id_pedido de los parámetros de la ruta
    const { id_pedido } = req.params;

    // Realizar la consulta SQL para obtener todos los detalles de pedido con ese id_pedido
    const queryText = 'SELECT * FROM detallepedido WHERE id_pedido = $1';
    const detallesPedido = await pool.query(queryText, [id_pedido]);

    // Enviar los detalles del pedido al cliente
    res.json(detallesPedido.rows);
  } catch (error) {
    console.error('Error al obtener los detalles del pedido:', error);
    res.status(500).json({ message: "Error al procesar la solicitud." });
  }
});

app.get('/api/items/:id_item', async (req, res) => {
  try {
    const { id_item } = req.params;
    const query = 'SELECT nombre, precio FROM item WHERE id_item = $1';
    const { rows } = await pool.query(query, [id_item]);


    if (rows.length === 0) {
      return res.status(404).send('Ítem no encontrado');
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error en el endpoint /api/items/:id_item:', error);
    res.status(500).send('Error al procesar la solicitud');
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

//ESTO ES DE TOMAR ORDEN
router.get('/api/productos', async (req, res) => {
  try {
      const result = await pool.query('SELECT id_item, nombre, precio FROM item');
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
      const storedPassword = Buffer.from(user.contrasena, 'base64').toString('utf8');

      if (storedPassword === contrasena) {
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

//PAGAR

app.get('/api/factura-total/:id_factura', async (req, res) => {
  const { id_factura } = req.params;
  try {
    const result = await pool.query('SELECT total_con_propina FROM factura WHERE id_factura = $1', [id_factura]);
    if (result.rows.length > 0) {
      res.json({ totalAPagar: result.rows[0].total_con_propina });
    } else {
      res.status(404).json({ message: 'Factura no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener el total de la factura:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});


// ESTO ES DE PAGOS


app.post('/api/pagos', async (req, res) => {
  const { id_factura, monto, forma_pago } = req.body;

  try {
    await pool.query('BEGIN');

    const queryText = `
      INSERT INTO pago (id_factura, monto, forma_pago)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const pagoResult = await pool.query(queryText, [id_factura, monto, forma_pago]);
    const pagoData = pagoResult.rows[0];

    // Actualiza la factura con el nuevo monto total a pagar
    const updateFacturaText = `
      UPDATE factura
      SET total_con_propina = total_con_propina - $1
      WHERE id_factura = $2 RETURNING total_con_propina;
    `;
    const facturaResult = await pool.query(updateFacturaText, [monto, id_factura]);

    // Obtiene el nuevo total a pagar actualizado
    const nuevoTotalAPagar = facturaResult.rows[0].total_con_propina;

    if (nuevoTotalAPagar === 0) {

    }

    // Finaliza la transacción
    await pool.query('COMMIT');

    res.json({
      success: true,
      message: 'Pago realizado con éxito',
      pago: pagoData,
      nuevoTotalAPagar
    });

  } catch (error) {
    // Deshacer cambios si algo falla
    await pool.query('ROLLBACK');
    console.error('Error al realizar el pago:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});


//FACTURAS
app.post('/api/facturas', async (req, res) => {
  const { id_pedido, total_sin_propina, total_con_propina, cliente } = req.body;

  try {
    await pool.query('BEGIN');

    // Buscar si el cliente ya existe en la base de datos
    let clienteResult = await pool.query('SELECT id_cliente FROM cliente WHERE nit = $1', [cliente.nit]);
    let clienteId;

    if (clienteResult.rows.length > 0) {
        // Cliente existe, obtener el id existente
        clienteId = clienteResult.rows[0].id_cliente;
    } else {
        // Cliente no existe, insertar nuevo cliente y obtener el id
        clienteResult = await pool.query(
            'INSERT INTO cliente (nombre, nit, direccion) VALUES ($1, $2, $3) RETURNING id_cliente',
            [cliente.nombre, cliente.nit, cliente.direccion]
        );
        clienteId = clienteResult.rows[0].id_cliente;
    }

    // Insertar la factura con los totales proporcionados, el id_pedido y el id_cliente
    const insertFacturaText = `
      INSERT INTO factura (id_pedido, fecha_hora_emision, total_sin_propina, total_con_propina, id_cliente)
      VALUES ($1, NOW(), $2, $3, $4) RETURNING *;
    `;
    const facturaResult = await pool.query(insertFacturaText, [id_pedido, total_sin_propina, total_con_propina, clienteId]);
    const facturaData = facturaResult.rows[0];

    // Confirmar transacción
    await pool.query('COMMIT');

    res.json({
      success: true,
      message: 'Factura creada con éxito',
      factura: facturaData,
      cliente: {
        id_cliente: clienteId,
        ...cliente
      }
    });

  } catch (error) {
    await pool.query('ROLLBACK'); // Revertir cambios en caso de error
    console.error('Error al crear la factura:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud',
      error: error.message
    });
  }
});



//COnfimar orden Endpoint

app.post('/api/crear-pedido', async (req, res) => {
  const { id_mesa, id_usuario, detalles } = req.body;
  const fecha_pedido = new Date().toISOString().slice(0, 10);
  const hora_inicio = new Date().toLocaleTimeString('en-US', { hour12: false });

  try {
    await pool.query('BEGIN'); // Iniciar transacción

    // Insertar en la tabla 'pedido'
    const insertPedidoText = `
      INSERT INTO pedido (id_mesa, id_usuario, fecha_de_pedido, hora_inicio, estado_pedido)
      VALUES ($1, $2, $3, $4, 'Abierto') RETURNING id_pedido;
    `;
    const pedidoResult = await pool.query(insertPedidoText, [id_mesa, id_usuario, fecha_pedido, hora_inicio]);
    const pedidoId = pedidoResult.rows[0].id_pedido;

    // Insertar detalles del pedido en la tabla 'detallepedido'
    const insertDetallePedidoText = `
      INSERT INTO detallepedido (id_pedido, id_item, cantidad, subtotal)
      VALUES ($1, $2, $3, $4);
    `;
    for (const item of detalles) {
      await pool.query(insertDetallePedidoText, [pedidoId, item.id_item, item.cantidad, item.subtotal]);
    }

    await pool.query('COMMIT'); // Finalizar transacción
    res.status(201).json({ message: "Pedido creado exitosamente.", id_pedido: pedidoId });
  } catch (err) {
    await pool.query('ROLLBACK'); // Deshacer cambios si algo falla
    console.error('Error al crear pedido:', err);
    res.status(500).json({ message: "Error al procesar el pedido." });
  }
});




//ReVIEW

app.post('/api/encuesta', async (req, res) => {
  const { id_pedido, amabilidad_mesero, calidad_comida, exactitud_pedido } = req.body;

  try {
    const nuevaEncuesta = await pool.query(
      'INSERT INTO encuesta (id_pedido, amabilidad_mesero, calidad_comida, exactitud_pedido) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pedido, amabilidad_mesero, calidad_comida, exactitud_pedido]
    );

    res.json({
      mensaje: 'Encuesta guardada con éxito',
      encuesta: nuevaEncuesta.rows[0]
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al guardar la encuesta');
  }
});

// Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT id_usuario, nombre FROM usuario');
    res.json(resultado.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Obtener todos los ítems
app.get('/api/items', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT id_item, nombre FROM item');
    res.json(resultado.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los ítems');
  }
});


app.get('/api/factura-cliente/:id_factura', async (req, res) => {
  try {
    const { id_factura } = req.params;
    const resultado = await pool.query('SELECT id_cliente FROM factura WHERE id_factura = $1', [id_factura]);
    
    if (resultado.rows.length > 0) {
      const id_cliente = resultado.rows[0].id_cliente;
      res.json({ id_cliente });
    } else {
      res.status(404).send('Factura no encontrada');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener el cliente de la factura');
  }
});

app.post('/api/queja', async (req, res) => {
  const { id_pedido, id_cliente, motivo, clasificacion, id_personal, id_item } = req.body;

  try {
    const nuevaQueja = await pool.query(
      'INSERT INTO queja (id_cliente, id_pedido, motivo, clasificacion, id_personal, id_item) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id_cliente, id_pedido, motivo, clasificacion, id_personal, id_item]
    );

    res.json({
      mensaje: 'Queja guardada con éxito',
      queja: nuevaQueja.rows[0]
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al guardar la queja');
  }
});

app.put('/api/cerrar-pedido', async (req, res) => {
  const { id_pedido } = req.body; // Este valor debe ser enviado en el cuerpo de la solicitud
  const hora_cierre = new Date().toLocaleTimeString('en-US', { hour12: false });

  try {
    const updatePedidoText = `
      UPDATE pedido
      SET hora_cierre = $1, estado_pedido = 'Cerrado'
      WHERE id_pedido = $2 AND estado_pedido != 'Cerrado';
    `;
    const response = await pool.query(updatePedidoText, [hora_cierre, id_pedido]);

    if (response.rowCount === 0) {
      // No se actualizó ningún pedido, puede ser que no exista o ya estaba cerrado
      return res.status(404).json({ message: 'Pedido no encontrado o ya estaba cerrado.' });
    }

    res.json({ message: 'Pedido cerrado exitosamente.' });
  } catch (error) {
    console.error('Error al cerrar el pedido:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud.' });
  }
});



app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



