import { Router } from "express";
const slotRoutes = Router();
import { addNewSlot, listAllSlot } from "./slot.controller";
import { checkToken } from "../../middlewares/auth.middleware";

slotRoutes.post('/slot/add', addNewSlot);
slotRoutes.get('/slot/list', checkToken, listAllSlot);

export default slotRoutes;
