const express = require('express');
const multer = require('multer');

const verifyToken = require('./config/verifyToken');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const uploadConfig = require('./config/upload');

const routes = express.Router();

const img_uploader = multer(uploadConfig);


routes.get('/status', (req, res) => {
    res.send("Status up and running");
})
//Registration
routes.post('/registration/:eventId', verifyToken, RegistrationController.create);
routes.get('/registration', verifyToken, RegistrationController.getMyRegistrations);
routes.get('/registration/:registration_id', RegistrationController.getRegistration);
routes.post('/registration/:registration_id/approvals', verifyToken, ApprovalController.approval);
routes.post('/registration/:registration_id/rejections', verifyToken, RejectionController.rejection);

//Login
routes.post('/login', LoginController.store);

//Dashboard
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents);
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents);
routes.get('/user/events', verifyToken, DashboardController.getEventsByUserId);
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById);

//Users
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

//Event
routes.post('/event', verifyToken, img_uploader.single('thumbnail'), EventController.createEvent);
routes.delete('/event/:eventId', verifyToken, EventController.deleteEvent);

module.exports = routes;