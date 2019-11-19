import 'dotenv/config';
import routes from './routes';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const session = require('express-session');
const path = require('path');

class App {
  constructor() {
    this.express = express();
    this.server = http.Server(this.express);
    this.io = socket(this.server);
    this.mongoDB();
    this.middlewares();
    this.routes();
  }

  production() {
    if (process.env.NODE_ENV === 'production') {
      express.use(express.static(path.join(__dirname, 'client/build')));
      express.get('*', (req, res) => {
        res.sendfile(path.join((__dirname = 'client/build/index.html')));
      });
    }
  }

  auth() {
    this.express.use(
      session({
        name: process.env.SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESS_SECRET,
        cookie: {
          maxAge: process.env.SESS_LIFETIME,
          sameSite: true,
          secure: process.env.NODE_ENV,
        },
      })
    );
  }

  mongoDB() {
    mongoose.connect(
      'mongodb+srv://sid:sidmongodb@cluster0-iftuw.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  }

  redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
    }
  };

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use((req, res, next) => {
      req.io = this.io;
      return next();
    });
  }

  routes() {
    this.express.use(routes);
  }
}
export default new App().server;
