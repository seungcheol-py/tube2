import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import routes from "./routes";

import {
  githubLoginCallback,
  kakaoLoginCallback,
  naverLoginCallback,
} from "./Controllers/userController";

import User from "./models/User";

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: "http://localhost:4000/auth/github/callback",
    },
    githubLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KT_ID,
      clientSecret: process.env.KT_SECRET,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NV_ID,
      clientSecret: process.env.NV_SECRET,
      callbackURL: `http://localhost:4000${routes.naverCallback}`,
    },
    naverLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
