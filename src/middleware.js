import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const addProduct = multer({ dest: `uploads/products/` });
export const addStylist = multer({ dest: `uploads/stylists/` });
export const addLive = multer({ dest: `uploads/lives/` });
