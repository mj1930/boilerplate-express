import { Router } from "express";
const studentRoute = Router();
import { studentLogin, studentSignup, bookNewSlot } from "./student.controller";
import { checkToken } from "../middlewares/auth.middleware";

studentRoute.post('/student/login', studentLogin);
studentRoute.post('/student/signup', studentSignup);
studentRoute.post('/student/book-slot', checkToken, bookNewSlot);

export default studentRoute;
