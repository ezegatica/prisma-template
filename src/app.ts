import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import Routes from "./routes";
var bodyParser = require("body-parser");

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.setting();
    this.middleware();
    this.routes();
  }

  setting() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  middleware() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api", Routes);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server on port", this.app.get("port"));
  }
}
