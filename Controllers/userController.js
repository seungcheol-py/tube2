import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      if (!user.avatarUrl) user.avatarUrl = avatar_url;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        avatarUrl: avatar_url,
        githubId: id,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: {
      id,
      properties: { nickname: name },
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        kakaoId: id,
      });
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (_, __, profile, done) => {
  const {
    displayName: name,
    _json: { id, email, profile_image: avatarUrl },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.save();
      return done(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        naverId: id,
      });
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const myProfile = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
