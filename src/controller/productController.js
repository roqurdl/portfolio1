import fs from "fs";
import Product from "../models/Product";
import Live from "../models/Live";
import User from "../models/User";
import { ProductComment } from "../models/Comment";

const URL_PRODUCT = `screens/product`;

export const home = async (req, res) => {
  const products = await Product.find({});
  const lives = await Live.find({});
  return res.render(`screens/home`, { products, lives });
};

export const shop = async (req, res) => {
  const { find } = req.query;
  console.log(find);
  const products = await Product.find({
    title: { $regex: new RegExp(`${find}`, "i") },
  });
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
  const product = await Product.findById(id)
    .populate("owner")
    .populate("productComments");
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
  await ProductComment.deleteMany({ product: id });
  if (product.descriptImg) {
    await fs.unlink(product.descriptImg, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  await fs.unlink(product.productImg, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.redirect(`/shop`);
};

//Comment

export const createProductComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const product = await Product.findById(id);
  if (!user) {
    return res.status(403).redirect(`/login`);
  }
  if (!product) {
    return res.sendStatus(404);
  }
  const productComment = await ProductComment.create({
    text,
    owner: user._id,
    product: id,
  });
  product.productComments.push(productComment._id);
  product.save();
  return res.status(201).json({ newCommentId: productComment._id });
};

export const deleteProductComment = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    body: { productId },
  } = req;
  const comment = await ProductComment.findById(id);
  const product = await Product.findById(productId);
  if (!comment) {
    return res.sendStatus(403);
  }
  if (String(comment.owner) !== String(_id)) {
    return res.sendStatus(403);
  }
  product.productComments.splice(product.productComments.indexOf(id), 1);
  product.save();
  await ProductComment.findByIdAndDelete(id);
  return res.sendStatus(200);
};
