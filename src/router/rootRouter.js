import express from "express";

const rootRouter = express.Router();

function home(req, res) {
  return res.render(`screens/home`);
}
function login(req, res) {
  return res.render(`screens/login`);
}

rootRouter.get("/", home);
rootRouter.get("/login", login);

export default rootRouter;
