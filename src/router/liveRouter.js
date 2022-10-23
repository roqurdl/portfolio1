import express from "express";
import { liveHome, getCreateRoom } from "../controller/liveController";
const liveRouter = express.Router();

liveRouter.get(`/`, liveHome);
liveRouter.get(`/room`, getCreateRoom);
export default liveRouter;
