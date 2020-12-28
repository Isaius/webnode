const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.executeQuery = async function executeQuery(query){
  client.connect()
  
  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err
    
    client.end()
    return res
  });
}
