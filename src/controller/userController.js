import User from "../models/User";
import axios from "axios";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
//-------------Github with Axios
export async function startGithub(req, res) {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_ID,
    allow_signup: false,
    scope: "user:email read:user",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
}
export async function finishGithub(req, res) {
  const githubToken = await axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token`,
    headers: { Accept: "application/json" },
    params: {
      client_id: process.env.GH_ID,
      client_secret: process.env.GH_SECRET,
      code: req.query.code,
    },
  });
  if ("access_token" in githubToken.data) {
    const { access_token } = githubToken.data;
    /**
     * login: 'roqurdl'
     * id: 103472276,
     * avatar_url: 'https://avatars.githubusercontent.com/u/103472276?v=4'
     * name: 'roqurdl'
     * email: null,
     */
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    /**
     * data:[{
      email: 'uyhnri@gmail.com',
      primary: true,
      verified: true,
      visibility: 'private'
    },]
     */
    const githubEmailData = await axios({
      method: "get",
      url: `https://api.github.com/user/emails`,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const githubEmail = githubEmailData.data.find(
      (emailData) => emailData.primary === true && emailData.verified === true
    );
    if (!githubEmail) {
      return res.redirect(`/login`);
    }
    let user = await User.findOne({ email: githubEmail.email });
    if (!user) {
      user = await User.create({
        email: githubEmail.email,
        username: data.id,
        name: data.name,
        social: true,
        password: "",
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect(`/`);
    } else {
      return res.redirect(`/login`);
    }
  }
}
//-------------naver with Fetch
export async function startNaver(req, res) {
  const baseUrl = `https://nid.naver.com/oauth2.0/authorize`;
  const config = {
    response_type: "code",
    client_id: process.env.NAVER_ID,
    redirect_uri: process.env.NAVER_REDIRECT_URL,
    state: process.env.NAVER_STATE,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
}
export async function finishNaver(req, res) {
  const baseUrl = `https://nid.naver.com/oauth2.0/token`;
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.NAVER_ID,
    client_secret: process.env.NAVER_SECRET,
    code: req.query.code,
    state: req.query.state,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const naverToken = await (
    await fetch(finalUrl, {
      method: `post`,
      headers: {
        client_id: process.env.NAVER_ID,
        client_secret: process.env.NAVER_SECRET,
      },
    })
  ).json();
  const { access_token } = naverToken;
  /**
   * resultcode: '00',
    message: 'success',
    response: {
    id: 'c1b_agcX8BCAx5b1r_f5oWYeQkiAJ8Y5UbOB5Y4h6xM',
    profile_image: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    email: 'uyhn@jr.naver.com',
    name: '김민석'
  }
   */
  const { response } = await (
    await fetch(`https://openapi.naver.com/v1/nid/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
  ).json();
  let user = await User.findOne({ email: response.email });
  if (!user) {
    user = await User.create({
      email: response.email,
      username: response.id,
      name: response.name,
      social: true,
      password: "",
    });
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect(`/`);
  } else {
    return res.redirect(`/login`);
  }
}
//------------google
export async function startGoogle(req, res) {
  const baseUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  const config = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    client_id: process.env.GOOGLE_ID,
    response_type: `code`,
    prompt: "consent",
    scope: `https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
}
export async function finishGoogle(req, res) {
  const { code } = req.query;
  const {
    data: { access_token, id_token },
  } = await axios.post(`https://oauth2.googleapis.com/token`, {
    grant_type: `authorization_code`,
    code,
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  /**
   * id: username,
    email,
    verified_email: true,
    name: '김민석',
    picture: avatarUrl,
    locale: 'ko'
   */
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    { headers: { Authorization: `Bearer ${id_token}` } }
  );
  let user = await User.findOne({ email: data.email });
  if (!user) {
    if (data.verified_email === true) {
      user = await User.create({
        email: data.email,
        username: data.id,
        name: data.name,
        social: true,
        password: "",
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect(`/`);
    } else {
      return res.redirect(`/login`);
    }
  } else {
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect(`/`);
  }
}
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
