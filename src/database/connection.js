const knex = require('knex')
const path = require('path')

module.exports = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  ssl: {
    rejectUnauthorized: false
  }
});