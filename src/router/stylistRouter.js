import express from "express";
import {
  stylist,
  getAddStylist,
  postAddStylist,
  detailStylist,
  getEditStylist,
  postEditStylist,
  deleteStylist,
} from "../controller/stylistController";
import { addStylist, protectMiddleware } from "../middleware";
const stylistRouter = express.Router();

stylistRouter.get(`/`, stylist);
stylistRouter.get(`/:id([0-9a-f]{24})`, detailStylist);
stylistRouter
  .route(`/:id([0-9a-f]{24})/edit`)
  .all(protectMiddleware)
  .get(getEditStylist)
  .post(
    addStylist.fields([
      { name: `stylistImg`, maxcount: 1 },
      { name: `summaryImg`, maxcount: 1 },
    ]),
    postEditStylist
  );
stylistRouter
  .route(`/add`)
  .all(protectMiddleware)
  .get(getAddStylist)
  .post(
    addStylist.fields([
      { name: `stylistImg`, maxcount: 1 },
      { name: `summaryImg`, maxcount: 1 },
    ]),
    postAddStylist
  );
stylistRouter
  .all(protectMiddleware)
  .get(`/:id([0-9a-f]{24})/delete`, deleteStylist);
export default stylistRouter;
