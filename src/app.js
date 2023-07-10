import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './router';

class App {
  constructor() {
    this.server = express();

    // conexao com o banco mongoDB
    mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.eimy0g3.mongodb.net/devhouse?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // cors dessa forma qlqer um pode usar
    this.server.use(cors());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    );

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
