import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import App from "./app";
import CourseController from "./controller/course.controller";
import NotificationController from "./controller/notification.controller";
import ResultController from "./controller/result.controller";
import StudentsController from "./controller/students.controller";
import CourseService from "./service/course.service";
import NotificationService from "./service/notification.service";
import ResultService from "./service/result.service";
import StudentsService from "./service/students.service";

// const app: Express = express();
const port = 3000;

const courseService = new CourseService();
const notificationService = new NotificationService();
const resultService = new ResultService();
const studentsService = new StudentsService();

const app = new App({
    port: port,

    controllers: [
        new CourseController(courseService),
        new NotificationController(notificationService),
        new ResultController(resultService),
        new StudentsController(studentsService),
    ],
    middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

app.listen();

// app.get("/", (req: Request, res: Response) => {
//     res.send("Express + TypeScript Server Online");
// });

// app.use("/api", apiRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
