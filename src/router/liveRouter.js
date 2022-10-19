import express from "express";
import { liveHome, liveRoom } from "../controller/liveController";
const liveRouter = express.Router();

liveRouter.get(`/`, liveHome);
liveRouter.get(`/detail`, liveRoom);
export default liveRouter;
