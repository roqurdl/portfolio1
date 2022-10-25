import express from "express";
import {
  getAddAccount,
  postAddAccount,
  profile,
  getEdit,
  postEdit,
} from "../controller/userController";
const userRouter = express.Router();

userRouter.route(`/add`).get(getAddAccount).post(postAddAccount);
userRouter.get(`/:id([0-9a-f]{24})/profile`, profile);
userRouter.route(`/:id([0-9a-f]{24})/edit`).get(getEdit).post(postEdit);

export default userRouter;
