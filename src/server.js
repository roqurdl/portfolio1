import express from "express";
import morgan from "morgan";
//Router
import rootRouter from "./router/rootRouter";

const app = express();
const logger = morgan(`dev`);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);

app.use(`/`, rootRouter);

export default app;
