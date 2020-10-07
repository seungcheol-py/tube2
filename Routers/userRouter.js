import express from "express";
import { home } from "../Controllers/userController";
export const userRouter = express.Router();
import routes from "../routes";

userRouter.get(routes.home, home);
userRouter.get(routes.join, (req, res) => res.send("user join"));
userRouter.get(routes.login, (req, res) => res.send("user login"));
