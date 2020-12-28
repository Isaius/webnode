const path = require('path')

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  ssl: {
    rejectUnauthorized: false
  }
}