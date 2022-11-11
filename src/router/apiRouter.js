import express from "express";
import { createComment, deleteComment } from "../controller/productController";

const apiRouter = express.Router();

apiRouter.post("/products/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete(`/comments/:id([0-9a-f]{24})/delete`, deleteComment);

export default apiRouter;
