import express from "express";
import { home, shop } from "../controller/productController";
import { login } from "../controller/userController";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/shop", shop);
rootRouter.get("/login", login);

export default rootRouter;
