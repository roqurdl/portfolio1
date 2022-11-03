import http from "http";
import express from "express";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middleware";
//Router
import rootRouter from "./router/rootRouter";
import productRouter from "./router/productRouter";
import stylistRouter from "./router/stylistRouter";
import liveRouter from "./router/liveRouter";
import userRouter from "./router/userRouter";

//logger
import morgan from "morgan";

const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer);
const logger = morgan(`dev`);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(`/public`, express.static(__dirname + "/public"));
app.use(`/uploads`, express.static(`uploads`));

app.use(localMiddleware);
app.use(`/`, rootRouter);
app.use(`/product`, productRouter);
app.use(`/stylist`, stylistRouter);
app.use(`/live`, liveRouter);
app.use(`/user`, userRouter);

// Socket IO

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on(`join_room`, (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit(`start`);
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});
export default httpServer;
