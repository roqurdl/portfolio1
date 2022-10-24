import express from "express";
import { liveHome, getAddLive } from "../controller/liveController";
const liveRouter = express.Router();

liveRouter.get(`/`, liveHome);
liveRouter.route(`/add`).get(getAddLive);
export default liveRouter;
