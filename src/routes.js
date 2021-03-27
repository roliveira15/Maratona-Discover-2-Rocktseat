const express = require('express');
const routes= express();
const basepath = __dirname + "/views"

routes.get('/', (req, res) => res.sendFile(basepath + "/index.html"))
routes.get('/job', (req, res) => res.sendFile(basepath + "/job.html"))
routes.get('/job-edit', (req, res) => res.sendFile(basepath + "/job-edit.html"))
routes.get('/profile', (req, res) => res.sendFile(basepath + "/profile.html"))


module.exports = routes;
 
