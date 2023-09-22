import { Router } from "express";
import { login, signup } from "./user.controller";
const userRoutes = Router();


userRoutes.post('/dean/login', login);
userRoutes.post('/dean/signup', signup);

export default userRoutes;
