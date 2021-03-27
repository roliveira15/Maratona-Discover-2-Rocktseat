const express = require('express');
const server = express();
const PORT = 3000; 
const routes = require('./routes')

server.use(express.static("public"))

server.use(routes)

server.listen(PORT, () => console.log('rodando'))