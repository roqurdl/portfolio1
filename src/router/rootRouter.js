import express from "express";

const rootRouter = express.Router();

function home(req, res) {
  return res.render(`home`);
}

rootRouter.get("/", home);

export default rootRouter;
