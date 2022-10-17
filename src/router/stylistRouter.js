import express from "express";
import { stylist } from "../controller/stylistController";
const stylistRouter = express.Router();

stylistRouter.get(`/`, stylist);
export default stylistRouter;
