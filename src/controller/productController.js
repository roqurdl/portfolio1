import Product from "../models/Product";
import User from "../models/User";

const URL_PRODUCT = `screens/product`;

export const home = async (req, res) => {
  const products = await Product.find({});
  return res.render(`screens/home`, { products });
};

export const shop = async (req, res) => {
  const products = await Product.find({});
  return res.render(`screens/shop`, { products });
};
export const getAddProduct = (req, res) => {
  return res.render(`${URL_PRODUCT}/add`);
};
export const postAddProduct = async (req, res) => {
  const {
    files: { productImg, descriptImg },
    body: { productName, price, description },
    session: { user: _id },
  } = req;
  try {
    const newProduct = await Product.create({
      title: productName,
      price,
      description,
      productImg: productImg[0].path,
      descriptImg: descriptImg[0].path,
      owner: _id,
    });
    const user = await User.findById(_id);
    // user.products.push(newProduct._id);
    // await user.save();
    let products = user.products;
    products.push(newProduct._id);
    await User.findByIdAndUpdate(_id, {
      products,
    });
    return res.redirect(`/`);
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("owner");
  return res.render(`${URL_PRODUCT}/detail`, { product });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.render(`${URL_PRODUCT}/edit`, { product });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const preImg = await Product.findById(id);
  /** 후에 session을 활용해서 대체 */
  const {
    files: { productImg, descriptImg },
    body: { productName, price, description },
  } = req;
  await Product.findByIdAndUpdate(id, {
    title: productName,
    price,
    description,
    productImg: req.files ? productImg[0].path : preImg.productImg,
    descriptImg: req.files ? descriptImg[0].path : preImg.descriptImg,
  });
  return res.redirect(`/product/${id}`);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.user;
  const product = await Product.findById(id);
  const user = await User.findById(_id);
  let list = user.products;
  const products = list.filter((data) => {
    return String(product._id) !== String(data._id);
  });
  await User.findByIdAndUpdate(_id, {
    products,
  });
  await Product.findByIdAndDelete(id);
  return res.redirect(`/shop`);
};

export const createComment = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  return res.end();
};
