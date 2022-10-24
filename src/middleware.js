import multer from "multer";

export const addProduct = multer({ dest: `uploads/products/` });
export const addStylist = multer({ dest: `uploads/stylists/` });
export const addLive = multer({ dest: `uploads/lives/` });
