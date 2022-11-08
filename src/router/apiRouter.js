import express from "express";
import { createComment } from "../controller/productController";

const apiRouter = express.Router();

apiRouter.post("/products/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;
