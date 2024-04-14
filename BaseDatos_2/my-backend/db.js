const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Proyecto2',
  password: 'ezg100603',
  port: 5432,
});

module.exports = pool;
