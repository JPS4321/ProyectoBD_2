const express = require('express');
const db = require('./db'); // Import your db config
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Example endpoint to fetch data from your database
app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM area');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
