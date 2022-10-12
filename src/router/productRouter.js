import express from "express";
import { getAddProduct } from "../controller/productController";

const productRouter = express.Router();

productRouter.route(`/add`).get(getAddProduct);
export default productRouter;
