import { CommonRoutesConfig } from "./common/common.routes.config";
import { HttpServer, Logger } from "./models/common.models";
import { APPLICATION_CONFIG } from "../applicationConfig";
import { NotValidRoutes } from "./routes/notValid.routes";
import { ExampleRoute } from "./routes/example.routes";
import express, { Application } from "express";
import LoggerHelper from "./utils/loggerHelper";
import { Debugger } from "./utils/debugger";
import bodyParser from "body-parser";
import * as http from "http";
import cors, { CorsOptions } from "cors";

export class MainApp {
  
  private config!: typeof APPLICATION_CONFIG;
  private application!: Application;
  private routes!: CommonRoutesConfig[];
  private server!: HttpServer;
  private logger!: Logger;

  static async createClassInstance() {
    const mainApp = new MainApp();
    await mainApp.init();
    return mainApp;
  }

  private async init(): Promise<void> {
    
    this.initLogger();
    this.initApplicationConfig();
    this.initApplicationAndServer();
    this.initBasicDebug();
    this.initRoutes();
    this.startServer();
    this.setupCloseListeners();
  }

  private initLogger(): void {
    this.logger = LoggerHelper.getLogger("MainApp");
  }

  private initApplicationConfig(): void {
    this.config = APPLICATION_CONFIG;
  }

  private initBasicDebug(): void {
    if (APPLICATION_CONFIG.DEBUG_REQUEST === true) {
      Debugger.debugRequest(this.application);
    }
  }

  private initApplicationAndServer(): void {

    this.application = express();
    this.application.use(cors(this.config.CORS_CONFIG as CorsOptions));
    this.application.use(express.json());
    this.server = http.createServer(this.application);

    this.application.use(bodyParser.urlencoded({ extended: true }));
  }

  private initRoutes(): void {

    const application = this.application;

    this.routes = [];

    this.routes.push(new ExampleRoute(application));
    this.routes.push(new NotValidRoutes(application));
  }

  private startServer(): void {

    const port = this.config.APPLICATION_PORT;

    const runningMessage = `Server running at http://localhost:${port}`;

    this.server.listen(port, () => {
      this.routes.forEach((route) => {
        this.logger.info(
          `Routes configured for ${route.getVersion()} - ${route.getName()}`
        );
      });

      this.logger.info(runningMessage);
    });
  }

  private setupCloseListeners(): void {

    this.logger.info('Setup listeners of executing closing process');
    
    for (const signal of APPLICATION_CONFIG.EXIT_SIGNALS) {
      process.on(signal as string, async () => {
        console.info(`Cached signal ${signal}`)
      })
    }

    this.server.on('close', async () => {
      console.info("Server close.")
    })
  }
}
