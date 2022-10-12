import express from "express";
import morgan from "morgan";
//
import "./db";
//Router
import rootRouter from "./router/rootRouter";
import shopRouter from "./router/shopRouter";

const app = express();
const logger = morgan(`dev`);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);

app.use(`/`, rootRouter);
app.use(`/shop`, shopRouter);

export default app;
