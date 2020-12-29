const http = require('http')
const url = require('url')
const fs = require('fs')
const uuid4 = require('uuid4')
const axiosAgent = require('axios')
const dotenv = require('dotenv').config()
const FormData = require('form-data')
const crypto = require('crypto')
const db = require('./database/connection')

const axios = axiosAgent.create({
  headers: { 
    'Content-Type': 'multipart/form-data'
  }
})

const baseURL = `https://pastebin.com/api/api_post.php`

const port =  process.env.PORT || 3333

const server = http.createServer(async(req, res) => {
  // parse the URL string to an JS object
  const reqURL = url.parse(req.url, true)

  // splits the string after the hostname, where the params
  params = reqURL.pathname.split("/")

  // GET INBOX VIEW
  if(req.method == 'GET' && !params[1]){
    fs.readFile('./public/index.html', function(err, data){
      if(err){
        res.writeHead(404)
        res.end(JSON.stringify("NOT FOUND!"))
        return
      }

      res.writeHead(200)
      res.end(data) 
    })
  }

  // GET INBOX VIEW
  if(req.method == 'GET' && params[1] == 'inbox.html' && !params[2]){
    fs.readFile('./public/inbox.html', function(err, data){
      if(err){
        res.writeHead(404)
        res.end(JSON.stringify("NOT FOUND!"))
        return
      }

      res.writeHead(200)
      res.end(data) 
    })
  }

  // GET MAIL VIEW
  if(req.method == 'GET' && params[1] == 'mail.html' && !params[2]){
    fs.readFile('./public/mail.html', function(err, data){
      if(err){
        res.writeHead(404)
        res.end(JSON.stringify("NOT FOUND!"))
        return
      }

      res.writeHead(200)
      res.end(data) 
    })
  }

  if(req.method == 'GET' && params[1] == 'write.html' && !params[2]){
    fs.readFile('./public/write.html', function(err, data){
      if(err){
        res.writeHead(404)
        res.end(JSON.stringify("NOT FOUND!"))
        return
      }

      res.writeHead(200)
      res.end(data) 
    })
  }

  if(req.method == 'GET' && params[1] == 'foward.html' && !params[2]){
    fs.readFile('./public/foward.html', function(err, data){
      if(err){
        res.writeHead(404)
        res.end(JSON.stringify("NOT FOUND!"))
        return
      }

      res.writeHead(200)
      res.end(data) 
    })
  }

  // GET MAIL
  if(req.method == 'GET' && params[1] == 'inbox'){
    user = params[2]
    
    try {
      emails = await getUserInbox(user)
      inbox = []

      emails.map(email => {
        inbox.push({
          subject: email.subject,
          from: email.from,
          uuid: email.uuid
        })
      });

      res.statusCode = 200
      res.setHeader('content-Type', 'Application/json')
      res.end(JSON.stringify(inbox))
    } catch (error) {
      console.log(error)
      res.statusCode = 400
      res.setHeader('content-Type', 'Application/json')
      res.end(JSON.stringify({ message: "user incorrect or not found" }))
    }
  } else if(req.method == 'GET' && params[1] == 'mail'){
    emailUuid = params[2]

    try {
      requestedEmail = await getEmail(emailUuid)

      res.statusCode = 200
      res.setHeader('content-Type', 'Application/json')
      res.end(JSON.stringify(requestedEmail))
    } catch (error) {
      res.statusCode = 400
      res.setHeader('content-Type', 'Application/json')
      res.end(JSON.stringify({ message: "user incorrect or email not found" }))
    }
  }else if(req.method == 'POST' && reqURL.pathname == '/'){
    var content = ''
    var body = null

    req.on('data', function(chunk) {
      content += chunk
    })

    req.on('end', async function(){
      body = JSON.parse(content)
      body.uuid = uuid4()

      await writeEmail(body)
    })

    res.statusCode = 201
    res.setHeader('content-Type', 'Application/json')
    res.end()
  } else if(req.method == 'DELETE' && params[1] == 'mail'){
    emailUuid = params[2]
    user = params[3]
    
    try {
      removeEmailFromInbox(user)

      res.statusCode = 200
      res.setHeader('content-Type', 'Application/json')
      res.end("Deleted")
    } catch (error) {
      res.statusCode = 400
      res.setHeader('content-Type', 'Application/json')
      res.end(JSON.stringify({ message: "user incorrect or email not found" }))
    }
  } else if(req.method == 'POST' && params[1] == 'mail'){
    emailUuid = params[2]
    content = ''
    var body = null
    
    try {
      req.on('data', function(chunk) {
        content += chunk
      })
  
      req.on('end', function(){
        body = JSON.parse(content)
        
        addEmailReply(emailUuid, body)
      })
  
      res.statusCode = 201
      res.setHeader('content-Type', 'Application/json')
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.setHeader('content-Type', 'Application/json')
      res.end(JSON.stringify({ message: "user incorrect or email not found" }))
    }
  } else if(req.method == 'PUT' && params[1] == 'foward'){
    uuidEmail = params[2]
    to = params[3]

    try {
      addEmailToUserInbox(to, uuidEmail)
      
      res.statusCode = 200
      res.setHeader('content-Type', 'Application/json')
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.setHeader('content-Type', 'Application/json')
      res.end(JSON.stringify({ message: "user incorrect or email not found" }))
    }
  }
})

// start server and listen to the port
server.listen(port)

function removeEmailFromInbox(user, uuid){
  emails = getUserInbox(user)

  emailToDelete = emails.inbox.find(emailUUID => emailUUID == uuid)
  index = emails.inbox.indexOf(emailToDelete)
  emails.inbox.splice(index, 1)

  writeInbox(user, emails)
}

function addEmailReply(uuid, reply){
  content = fs.readFileSync("./mails/" + uuid + '.json')
  
  email = JSON.parse(content)
  email.replies.push(reply)

  writeEmail(email)
}

async function getUserInbox(user){
  const result = await  db.getUserInbox(user)
  
  return result
}

async function getEmail(uuid){
  const result = await db.getEmail(uuid)
  
  console.log(result)

  return content
}

async function writeEmail(email){
  try {
    res = await db.insertEmail(email)
    console.log(`updated email ${res}`)
  } catch (error) {
    console.log(error)
  }
}