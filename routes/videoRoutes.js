require('dotenv').config()
const Vrouter = require('express').Router()
const { mongoVideos, localVideos } = require('../controllers/videoControllers');


Vrouter.get("/", (req, res) => {
    res.render("index")
})

Vrouter.get('/init-video',)

Vrouter.get('/cloud-video/:id', mongoVideos)
Vrouter.get('/video', localVideos)

module.exports = Vrouter;