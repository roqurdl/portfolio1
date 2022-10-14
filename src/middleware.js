import multer from "multer";

export const addProduct = multer({ dest: `products/` });
