import express from "express";
import {
  liveHome,
  getCreateRoom,
  postCreateRoom,
  liveRoom,
} from "../controller/liveController";
const liveRouter = express.Router();

liveRouter.get(`/`, liveHome);
liveRouter.route(`/create`).get(getCreateRoom).post(postCreateRoom);
liveRouter.get(`/room/:id`, liveRoom);
export default liveRouter;
