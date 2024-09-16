import { ExampleController } from "../controllers/example.controller";
import { CommonRoutesConfig } from "../common/common.routes.config";
import type { Application } from "express";
import express from "express";

export class ExampleRoute extends CommonRoutesConfig {

  constructor(app: Application) {
    super(app, "Example Route", "0.0.1");
  }

  public override configureControllers(): void{}

  public override configureRoute(): Application {

    const exampleRouter = express.Router();

    exampleRouter.get('/ping', new ExampleController().exampleController);

    this.app.use('/example', exampleRouter);

    return this.getApp();
  }
}