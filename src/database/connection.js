const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const executeQuery = async function executeQuery(query){
  client.connect()
  
  client.query(`${query};`, (err, res) => {
    if (err) throw err
    
    client.end()
    return res
  });
}

const insertEmail = async function insertEmail(email){
  client.connect()
  
  client.query(`INSERT INTO emails VALUES(${email.from}, ${email.to}, ${emaiç.subject}, ${email.body}, ${email.uuid}, ${email.replies};`, (err, res) => {
    if (err) throw err
    
    client.end()
    return res
  });
}

const getUserInbox = async function getUserInbox(user){
  client.connect()
  client.query(`SELECT * FROM emails WHERE from_user='${user}' OR to_user='${user}';`, (err, res) => {
    if (err) throw err
    
    client.end()
    return res
  });
}

const getEmail = async function getEmail(uuid){
  client.connect()
  client.query(`SELECT * FROM emails WHERE uuid=${uuid};`, (err, res) => {
    if (err) throw err
    
    client.end()
    return res
  });
}

const updateEmailReplies = async function updateEmailReplies(email){
  client.connect()
  client.query(`UPDATE emails SET replies = ${email.replies} WHERE uuid = ${email.uuid};`, (err, res) => {
    if (err) throw err
    
    client.end()
    return res
  });
}

const db = {
  executeQuery,
  insertEmail,
  getUserInbox,
  getEmail,
  updateEmailReplies
}

module.exports = db