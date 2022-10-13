import express from "express";
import {
  getAddProduct,
  postAddProduct,
  detail,
} from "../controller/productController";

const productRouter = express.Router();

productRouter.get(`/:id`, detail);
productRouter.route(`/add`).get(getAddProduct).post(postAddProduct);
export default productRouter;
