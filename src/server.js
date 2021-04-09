const express = require('express');
const server = express();
const PORT = 3000; 
const routes = require('./routes')
const path = require('path')

server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))

server.use(express.static("public"))

// usar o re.body
server.use(express.urlencoded({extended: true}))

server.use(routes)

server.listen(PORT, () => console.log('rodando'))