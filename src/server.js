require(`dotenv`).config();
import express from "express";
import session from "express-session";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import MongoStore from "connect-mongo";
//for Google login
// import passport, { use } from "passport";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
//
import "./db";
import "./models/Product";
import "./models/Stylist";
import { localMiddleware } from "./middleware";
//Router
import rootRouter from "./router/rootRouter";
import productRouter from "./router/productRouter";
import stylistRouter from "./router/stylistRouter";
import liveRouter from "./router/liveRouter";
import userRouter from "./router/userRouter";

//Mongo Schema
import User from "./models/User";

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

//-------------google with passport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//   console.log("serialize");
//   console.log(user);
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   console.log("deserialize");
//   console.log(user);
//   done(null, user);
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
//     },
//     /**
//      * About _json
//     sub: username,
//     name,
//     picture: Avatar url
//     email,
//     email_verified: true,
//     locale: 'ko'
//      */
//     async function (accessToken, refreshToken, profile, cb) {
//       const user = profile._json;
//       const exist = await User.findOne({ email: user.email });
//       try {
//         if (!exist) {
//           const newUser = await User.create({
//             username: user.sub,
//             email: user.email,
//             name: user.name,
//             social: true,
//             password: "",
//           });
//           return cb(null, newUser);
//         }
//       } catch (err) {
//         return cb(err);
//       }
//     }
//   )
// );

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     console.log(req);
//     res.redirect("/");
//   }
// );

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
