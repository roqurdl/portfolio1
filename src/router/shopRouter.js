import express from "express";
import { shop } from "../controller/shopController";

const shopRouter = express.Router();

shopRouter.get(`/`, shop);

export default shopRouter;
