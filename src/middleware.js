import multer from "multer";

export const addProduct = multer({ dest: `products/` });
export const addStylist = multer({ dest: `stylists/` });
