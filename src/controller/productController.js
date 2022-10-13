import Product from "../models/Product";

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
  const { productName, price, productDescription } = req.body;
  await Product.create({
    title: productName,
    price,
    description: productDescription,
  });
  return res.redirect(`/`);
};

export const detail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  return res.render(`screens/product/detail`);
};
