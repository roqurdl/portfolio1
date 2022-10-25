import User from "../models/User";
import bcrypt from "bcrypt";

const URL_USER = `screens/user`;

export const getLogin = (req, res) => {
  return res.render(`screens/login`);
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const pageError = `There is no ${username}`;
    return res.render(`screens/login`, { pageError });
  }
  const pwCheck = await bcrypt.compare(password, user.password);
  if (!pwCheck) {
    const pageError = `Password is wrong`;
    return res.render(`screens/login`, { pageError });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getAddAccount = (req, res) => {
  return res.render(`${URL_USER}/add`);
};
export const postAddAccount = async (req, res) => {
  const { name, email, username, password, pwconfirm } = req.body;
  const exist = await User.findOne({ username });
  if (exist) {
    const pageError = `Username is already exist.`;
    return res.render(`${URL_USER}/add`, { pageError });
  }
  if (password === pwconfirm) {
    await User.create({
      name,
      email,
      username,
      password,
    });
  } else {
    const pageError = `Check confirm Password`;
    return res.render(`${URL_USER}/add`, { pageError });
  }
  return res.redirect(`/login`);
};

export const profile = (req, res) => {
  return res.render(`${URL_USER}/profile`);
};

export const getEdit = async (req, res) => {
  return res.render(`${URL_USER}/edit`);
};
export const postEdit = (req, res) => {
  return res.redirect(`/user/profile`);
};
