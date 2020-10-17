import routes from "./routes";
import multer from "multer";

// pug에서 사용하자
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  // fake information
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

// videos/에 upload한다.
const multerVideo = multer({ dest: "upload/videos/" });
// upload.pug input-name은 videoFile
export const multerSingleVideo = multerVideo.single("videoFile");
