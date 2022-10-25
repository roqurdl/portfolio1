import express from "express";
import { home, shop } from "../controller/productController";
import { getLogin, postLogin, logout } from "../controller/userController";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/shop", shop);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get(`/logout`, logout);

export default rootRouter;
