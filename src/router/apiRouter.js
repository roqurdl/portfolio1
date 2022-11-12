import express from "express";
import {
  createProductComment,
  deleteProductComment,
} from "../controller/productController";
import {
  createLiveComment,
  deleteLiveComment,
} from "../controller/liveController";

const apiRouter = express.Router();

apiRouter.post("/products/:id([0-9a-f]{24})/comment", createProductComment);
apiRouter.delete(
  `/productComments/:id([0-9a-f]{24})/delete`,
  deleteProductComment
);
apiRouter.post("/lives/:id([0-9a-f]{24})/comment", createLiveComment);
apiRouter.delete(`/liveComments/:id([0-9a-f]{24})/delete`, deleteLiveComment);

export default apiRouter;
