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
} from "../controller/userController";
const userRouter = express.Router();

// Nation User
userRouter.route(`/add`).get(getAddAccount).post(postAddAccount);
userRouter.get(`/:id([0-9a-f]{24})/profile`, profile);
userRouter.route(`/:id([0-9a-f]{24})/edit`).get(getEdit).post(postEdit);
userRouter
  .route(`/:id([0-9a-f]{24})/password`)
  .get(getEditPassword)
  .post(postEditPassword);
userRouter.get(`/:id([0-9a-f]{24})/delete`, deleteUser);
//Social User

export default userRouter;
