import express from "express";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
//
import "./db";
import "./models/Product";
import "./models/Stylist";
//Router
import rootRouter from "./router/rootRouter";
import productRouter from "./router/productRouter";
import stylistRouter from "./router/stylistRouter";
import liveRouter from "./router/liveRouter";

const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer);
const logger = morgan(`dev`);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(`/public`, express.static(__dirname + "/public"));
app.use(`/products`, express.static(`products`));
app.use(`/stylists`, express.static(`stylists`));

app.use(`/`, rootRouter);
app.use(`/product`, productRouter);
app.use(`/stylist`, stylistRouter);
app.use(`/live`, liveRouter);

// Socket IO

io.on("connection", (socket) => {
  console.log("a user connected");
});
export default httpServer;
