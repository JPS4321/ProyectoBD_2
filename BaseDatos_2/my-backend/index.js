const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM usuario');
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

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




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
