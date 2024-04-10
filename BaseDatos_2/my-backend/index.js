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

app.get('/api/users', async (req, res) => {
  try {
    const data = await pool.query('SELECT email, contrasena FROM usuario');
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
