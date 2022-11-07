import express from "express";
import {
  liveHome,
  getAddLive,
  postAddLive,
  detail,
  getLiveEdit,
  postLiveEdit,
  deleteLive,
} from "../controller/liveController";
import { addLive, protectMiddleware } from "../middleware";
const liveRouter = express.Router();

liveRouter.get(`/`, liveHome);
liveRouter
  .route(`/add`)
  .all(protectMiddleware)
  .get(getAddLive)
  .post(addLive.single(`liveFile`), postAddLive);
liveRouter.get(`/:id([0-9a-f]{24})`, detail);
liveRouter
  .route(`/:id([0-9a-f]{24})/edit`)
  .all(protectMiddleware)
  .get(getLiveEdit)
  .post(addLive.single(`liveFile`), postLiveEdit);
liveRouter.all(protectMiddleware).get(`/:id([0-9a-f]{24})/delete`, deleteLive);
export default liveRouter;
