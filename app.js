import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import flash from "express-flash";

import { localsMiddleware } from "./middleware";
import routes from "./routes";
import userRouter from "./Routers/userRouter";
import globalRouter from "./Routers/globalRouter";
import videoRouter from "./Routers/videoRouter";

import "./passport";

const app = express();
const CookieStore = MongoStore(session);

app.use(morgan("dev"));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.use(routes.upload, express.static("upload"));
app.use("/static", express.static("static"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
