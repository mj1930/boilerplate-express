import { Router } from "express";
const deanRoutes = Router();
import { checkAllBookedSlots } from "./dean.controller";
import { checkToken } from '../../middlewares/auth.middleware';

deanRoutes.get('/dean/get-booked-slots', checkToken, checkAllBookedSlots);

export default deanRoutes;
