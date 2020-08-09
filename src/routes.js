const express = require('express');
// const ClassesController = require('./controllers/ClassesController');
// const ConnectionsController = require('./controllers/ConnectionsController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();
// const classesController = new ClassesController();
// const connectionsController = new ConnectionsController();
const authController = new AuthController();

routes.post('/users', authController.register);
// routes.get('/classes', classesController.index);

// routes.post('/connections', connectionsController.create);
// routes.get('/connections', connectionsController.index);

module.exports = routes;