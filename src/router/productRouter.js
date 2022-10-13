import express from "express";
import {
  getAddProduct,
  postAddProduct,
  detail,
  getEdit,
  postEdit,
  deleteProduct,
} from "../controller/productController";

const productRouter = express.Router();

productRouter.get(`/:id([0-9a-f]{24})`, detail);
productRouter.route(`/:id([0-9a-f]{24})/edit`).get(getEdit).post(postEdit);
productRouter.route(`/:id([0-9a-f]{24})/delete`).get(deleteProduct);
productRouter.route(`/add`).get(getAddProduct).post(postAddProduct);
export default productRouter;
