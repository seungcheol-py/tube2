import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  getJoin,
  getLogin,
  githubLogin,
  kakaoLogin,
  logout,
  myProfile,
  naverLogin,
  postGithubLogin,
  postJoin,
  postKakaoLogin,
  postLogin,
  postNaverLogin,
} from "../Controllers/userController";
import { home, search } from "../Controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.me, onlyPrivate, myProfile);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.kakao, kakaoLogin);

globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect: "/login",
    successFlash: "Welcome",
  }),
  postKakaoLogin
);

globalRouter.get(routes.naver, naverLogin);

globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: "/login",
    successFlash: "Welcome",
  }),
  postNaverLogin
);

export default globalRouter;
