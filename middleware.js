import routes from "./routes";
import multer from "multer";

// pug에서 사용하자
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

// videos/에 upload한다.
const multerVideo = multer({ dest: "upload/videos/" });
// upload.pug input-name은 videoFile
export const multerSingleVideo = multerVideo.single("videoFile");
