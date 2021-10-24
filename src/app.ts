import express, { Express } from 'express';
import {
  servicesRoutes,
  transactionsRoutes,
  animalsRoutes,
  productsRoutes,
  medicinesRoutes,
} from 'routes';

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
    this.server.use('/products', productsRoutes);
    this.server.use('/medicines', medicinesRoutes);
  }
}

export default new App().server;
