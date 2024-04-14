const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Proyecto2',
  password: 'tech',
  port: 5432,
});

module.exports = pool;
