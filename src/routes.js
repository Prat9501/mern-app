const express = require('express');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController');
const uploadConfig = require('./config/upload');

const routes = express.Router();

const img_uploader = multer(uploadConfig);


routes.get('/status', (req, res) => {
    res.send("Status up and running");
})

//Dashboard
routes.get('/dashboard', DashboardController.getAllEvents);
routes.get('/dashboard/:sport', DashboardController.getAllEvents);
routes.get('/event/:eventId', DashboardController.getEventById);

//Users
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

//Event
routes.post('/event', img_uploader.single('thumbnail'), EventController.createEvent);
routes.delete('/event/:eventId', EventController.deleteEvent);

module.exports = routes;