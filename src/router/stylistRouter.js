import express from "express";
import {
  stylist,
  getAddStylist,
  postAddStylist,
} from "../controller/stylistController";
const stylistRouter = express.Router();

stylistRouter.get(`/`, stylist);
stylistRouter.route(`/add`).get(getAddStylist).post(postAddStylist);
export default stylistRouter;
