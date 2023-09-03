import { Router } from "express";
const deanRoutes = Router();
import { checkAllBookedSlots, deanLogin, deanSignup } from "./dean.controller";
import { checkToken } from '../middlewares/auth.middleware';

deanRoutes.post('/dean/login', deanLogin);
deanRoutes.post('/dean/signup', deanSignup);
deanRoutes.get('/dean/get-booked-slots', checkToken, checkAllBookedSlots);

export default deanRoutes;
