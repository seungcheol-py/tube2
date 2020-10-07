import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./Routers/userRouter";

const app = express();
const PORT = 4000;

const handleHome = (req, res) => res.send("Hello from home");

const handleListening = () => console.log(`Listening on ${PORT}`);

const handleProfile = (req, res) => res.send("It's your profile");

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.set("view engine", "pug");
// respond with "hello world" when a GET request is made to the homepage
app.get("/", handleHome);

// middleware
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);

export default app;
