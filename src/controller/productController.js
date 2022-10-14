import Product from "../models/Product";

const URL_PRODUCT = `screens/product`;

export const home = (req, res) => {
  return res.render(`screens/home`);
};

export const shop = async (req, res) => {
  const products = await Product.find({});
  return res.render(`screens/shop`, { products });
};
export const getAddProduct = (req, res) => {
  return res.render(`screens/product/add`);
};
export const postAddProduct = async (req, res) => {
  const {
    files: { productImage, descriptionFile },
    body: { productName, price, productDescription },
  } = req;
  await Product.create({
    title: productName,
    price,
    description: productDescription,
    productImg: productImage[0].path,
    descriptImg: descriptionFile[0].path,
  });
  return res.redirect(`/`);
};

export const detail = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product.descriptImg);
  return res.render(`${URL_PRODUCT}/detail`, { product });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.render(`${URL_PRODUCT}/edit`, { product });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    files: { productImage, descriptionFile },
    body: { productName, price, productDescription },
  } = req;
  await Product.findByIdAndUpdate(id, {
    title: productName,
    price,
    description: productDescription,
    productImg: productImage[0].path,
    descriptImg: descriptionFile[0].path,
  });
  return res.redirect(`/product/${id}`);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  return res.redirect(`/shop`);
};
