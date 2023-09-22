import { Router } from "express";
const studentRoute = Router();
import { bookNewSlot } from "./student.controller";
import { checkToken } from "../../middlewares/auth.middleware";

studentRoute.post('/student/book-slot', checkToken, bookNewSlot);

export default studentRoute;
