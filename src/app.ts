import express, { Express } from 'express';
import { SetupServer } from '@root/setupServer';
import databaseConnection from '@root/setupDatabase';
import { config } from '@root/config';


class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: SetupServer = new SetupServer(app); //app => passing app parameter.
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application(); //not pessing anything because there is no constractor.
application.initialize();