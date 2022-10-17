import express from "express";
import morgan from "morgan";
//
import "./db";
import "./models/Product";
import "./models/Stylist";
//Router
import rootRouter from "./router/rootRouter";
import productRouter from "./router/productRouter";
import stylistRouter from "./router/stylistRouter";

const app = express();
const logger = morgan(`dev`);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(`/products`, express.static(`products`));
app.use(`/`, rootRouter);
app.use(`/product`, productRouter);
app.use(`/stylist`, stylistRouter);

export default app;
