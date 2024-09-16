import { CommonRoutesInitData, HttpServer } from "../models/common.models";
import type { Application } from "express";

export abstract class CommonRoutesConfig {

  private routeName: string;
  private version: string;
  protected app: Application;

  public static statusMessage = {
    FAILED: "Failed",
    SUCCESS: "Success",
  };

  protected static routeType = {
    PUT: "PutRoutes",
    GET: "GetRoutes",
    POST: "PostRoutes",
    PATCH: "PatchRoutes",
    DELETE: "DeleteRoutes",
    SOCKET: "SocketRoutes",
    NOT_VALID: "NotValidRoutes",
  };

  constructor(app: Application, routeName: string, version: string, server?: HttpServer) {
    this.routeName = routeName;
    this.app = app;
    this.version = version;

    this.init({
      app,
      routeName,
      version,
      httpServer: typeof server === "undefined" ? null : server
    });

    this.configureControllers();
    this.configureRoute();
  }

  //To implements methods before configure routes
  protected init(initData: CommonRoutesInitData): void{}

  public getName(): string {
    return this.routeName;
  }

  public getVersion(): string {
    return this.version;
  }

  public getApp(): Application {
    return this.app;
  }

  abstract configureControllers(): void;

  abstract configureRoute(): Application;
}