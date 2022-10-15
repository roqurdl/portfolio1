import express from "express";
import {
  getAddProduct,
  postAddProduct,
  detail,
  getEdit,
  postEdit,
  deleteProduct,
} from "../controller/productController";
import { addProduct } from "../middleware";
const productRouter = express.Router();

productRouter.get(`/:id([0-9a-f]{24})`, detail);
productRouter
  .route(`/:id([0-9a-f]{24})/edit`)
  .get(getEdit)
  .post(
    addProduct.fields([
      { name: `productImg`, maxcount: 1 },
      { name: `descriptImg`, maxcount: 1 },
    ]),
    postEdit
  );
productRouter.route(`/:id([0-9a-f]{24})/delete`).get(deleteProduct);
productRouter
  .route(`/add`)
  .get(getAddProduct)
  .post(
    addProduct.fields([
      { name: `productImg`, maxcount: 1 },
      { name: `descriptImg`, maxcount: 1 },
    ]),
    postAddProduct
  );
export default productRouter;
