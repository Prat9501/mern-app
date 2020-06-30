const express = require('express');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const uploadConfig = require('./config/upload');

const routes = express.Router();

const img_uploader = multer(uploadConfig);


routes.get('/status', (req, res) => {
    res.send("Status up and running");
})

//Users
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

//Event
routes.get('/event/:eventId', EventController.getEventById);
routes.post('/event', img_uploader.single('thumbnail'), EventController.createEvent);

module.exports = routes;