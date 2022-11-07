import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

/**
 * For only User logged in
 */
export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect(`/login`);
  }
};
/**
 * For Public User
 */
export const publicMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect(`/`);
  }
};

export const addProduct = multer({ dest: `uploads/products/` });
export const addStylist = multer({ dest: `uploads/stylists/` });
export const addLive = multer({ dest: `uploads/lives/` });
