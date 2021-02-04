'use strict';

require('dotenv').config();

module.exports = {
  migrationsDirectory: 'migrations',
  driver: 'pg',
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production',
};
