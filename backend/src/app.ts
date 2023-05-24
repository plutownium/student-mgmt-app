import express, { Application } from "express";
import cors from "cors";

import bodyParser from "body-parser";

import initModels from "./db/models/init-models";
import Database from "./db/Database";

class App {
    public app: Application;

    public port: number;

    constructor(appInit: { port: number; middlewares: any; controllers: any }) {
        this.app = express();
        this.port = appInit.port;
        this.app.use(
            cors({
                origin: ["http://localhost:3000"],
                methods: "GET, POST, PATCH, DELETE, PUT",
                allowedHeaders: "Content-Type, Authorization",
                credentials: true,
            }),
        );
        this.app.use(bodyParser.json({ limit: "50mb" }));

        // this.middlewares(appInit.middlewares);
        this.routes(appInit.controllers);
    }

    public listen() {
        this.app.listen(this.port, async () => {
            console.log(`App has started on port ${this.port}`);
            try {
                await Database.authenticate();
                console.log("Database Connection Established");
                await initModels(Database);
                // console.log("syncing");
                // await Database.sync({ alter: true, logging: false });
            } catch (err) {
                console.log("Database connection failed", err);
            }
        });
    }

    public getServer() {
        return this.app;
    }

    private routes(controllers: any) {
        controllers.forEach((controller: any) => {
            // console.log(controller.path, "... is running");
            this.app.use(controller.path, controller.router);
        });
    }
}

export default App;
