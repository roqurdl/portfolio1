import User from "../models/User";
import axios from "axios";
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

//Social Login
export function startGithub(req, res) {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
}
export async function finishGithub(req, res) {
  const token = await axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token`,
    headers: { Accept: "application/json" },
    params: {
      client_id: process.env.GH_ID,
      client_secret: process.env.GH_SECRET,
      code: req.query.code,
    },
  });
  if ("access_token" in token.data) {
    const { access_token } = token.data;
    const userData = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(userData.data);
  }
}

//
export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.render(`${URL_USER}/profile`, { user });
};

export const getEdit = (req, res) => {
  return res.render(`${URL_USER}/edit`);
};
export const postEdit = async (req, res) => {
  const {
    body: { name, email, username },
    params: { id },
  } = req;
  const user = await User.findById(id);
  if (!user) {
    const pageError = `Wrong User`;
    return res.render(`${URL_USER}/edit`, { pageError });
  }
  if (user.id !== id) {
    const pageError = `Wrong User`;
    return res.render(`${URL_USER}/edit`, { pageError });
  }
  const updateUser = await User.findByIdAndUpdate(id, {
    name,
    email,
    username,
  });
  req.session.user = updateUser;
  return res.redirect(`/user/${id}/profile`);
};

export const getEditPassword = (req, res) => {
  return res.render(`${URL_USER}/edit-password`);
};
export const postEditPassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPw, newPw, confirmNewPw },
  } = req;
  const user = await User.findById(_id);
  const check = await bcrypt.compare(oldPw, user.password);
  if (!check) {
    const pageError = `Current password is incorrect`;
    return res.render(`${URL_USER}/edit-password`, { pageError });
  }
  if (oldPw === newPw) {
    const pageError = `New password have to different from old one.`;
    return res.render(`${URL_USER}/edit-password`, { pageError });
  }
  if (newPw !== confirmNewPw) {
    const pageError = `Confirmation of Password is not passed`;
    return res.render(`${URL_USER}/edit-password`, { pageError });
  }
  user.password = newPw;
  await user.save();
  req.session.destroy();
  return res.redirect(`/login`);
};

export const deleteUser = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  await User.findByIdAndDelete(_id);
  return res.redirect(`/`);
};
