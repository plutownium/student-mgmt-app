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
import CourseDAO from "./db/dao/course.dao";
import NotificationDAO from "./db/dao/notification.dao";
import ResultDAO from "./db/dao/result.dao";
import StudentDAO from "./db/dao/students.dao";

// const app: Express = express();
const port = 3000;

const courseDAO = new CourseDAO();
const notificationDAO = new NotificationDAO();
const resultDAO = new ResultDAO();
const studentsDAO = new StudentDAO();

const notificationService = new NotificationService(notificationDAO);
const resultService = new ResultService(resultDAO);
const courseService = new CourseService(resultService, courseDAO);
const studentsService = new StudentsService(notificationService, resultService, studentsDAO);

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
