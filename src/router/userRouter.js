import express from "express";
import {
  getAddAccount,
  postAddAccount,
  profile,
  getEdit,
  postEdit,
  getEditPassword,
  postEditPassword,
  deleteUser,
  startGithub,
  finishGithub,
  startNaver,
  finishNaver,
  startGoogle,
  finishGoogle,
} from "../controller/userController";
import { protectMiddleware } from "../middleware";
const userRouter = express.Router();

// Nation User
userRouter.route(`/add`).get(getAddAccount).post(postAddAccount);
userRouter.all(protectMiddleware).get(`/:id([0-9a-f]{24})/profile`, profile);
userRouter
  .route(`/:id([0-9a-f]{24})/edit`)
  .all(protectMiddleware)
  .get(getEdit)
  .post(postEdit);
userRouter
  .route(`/:id([0-9a-f]{24})/password`)
  .all(protectMiddleware)
  .get(getEditPassword)
  .post(postEditPassword);
userRouter.all(protectMiddleware).get(`/:id([0-9a-f]{24})/delete`, deleteUser);
//Social User
userRouter.get(`/github/request`, startGithub);
userRouter.get(`/github/callback`, finishGithub);

userRouter.get(`/naver/request`, startNaver);
userRouter.get(`/naver/callback`, finishNaver);

userRouter.get(`/google/request`, startGoogle);
userRouter.get(`/google/callback`, finishGoogle);

export default userRouter;
