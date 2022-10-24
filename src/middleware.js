import multer from "multer";

export const addProduct = multer({ dest: `uploads/products/` });
export const addStylist = multer({ dest: `uploads/stylists/` });
// export const addVideo = multer({ dest: `uploads/videos/` });
