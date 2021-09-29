import express, { Express } from 'express';
import { servicesRoutes, transactionsRoutes, animalsRoutes } from 'routes';

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
    this.server.use('/transactions', transactionsRoutes);
    this.server.use('/animals', animalsRoutes);
  }
}

export default new App().server;
