const express = require('express');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const FollowController = require('./controllers/FollowController');

import authMiddleware from './middlewares/auth';

const routes = new express.Router();

routes.get('/user', UserController.index);
routes.post('/user/getUser', UserController.getOne);
routes.post('/user', UserController.store);
routes.post('/login', LoginController.store);

// routes.use(authMiddleware);

routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);
routes.post('/posts/:id/like', LikeController.store);

routes.delete('/user/:id', UserController.destroy);
routes.post('/follow/:id', FollowController.store);

module.exports = routes;
