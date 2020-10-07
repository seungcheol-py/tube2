import routes from "./routes";

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
