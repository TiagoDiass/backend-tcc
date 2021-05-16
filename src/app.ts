import express, { Express, Router } from 'express';
import { servicesRoutes } from 'routes';

class App {
  public readonly server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/services', servicesRoutes);
  }
}

export default new App().server;
