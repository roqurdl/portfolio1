import fs from "fs";
import { LiveComment } from "../models/Comment";
import Live from "../models/Live";
import User from "../models/User";

const URL_LIVE = `screens/live`;

export const liveHome = async (req, res) => {
  const lives = await Live.find({});
  return res.render(`screens/lives`, { lives });
};
export const getAddLive = (req, res) => {
  return res.render(`${URL_LIVE}/add`);
};
export const postAddLive = async (req, res) => {
  const {
    file: { path: liveFile },
    body: { liveTitle, liveDescription },
    session: { user: _id },
  } = req;
  const newLive = await Live.create({
    liveTitle,
    liveUrl: liveFile,
    liveDescription,
    owner: _id,
  });
  const user = await User.findById(_id);
  // 원인은 모르지만 save()가 작동을 안함.
  // user.lives.push(newLive._id);
  // await user.save();
  let lives = user.lives;
  lives.push(newLive._id);
  await User.findByIdAndUpdate(_id, {
    lives,
  });
  return res.redirect(`/live`);
};

export const detail = async (req, res) => {
  const { id } = req.params;
  const live = await Live.findById(id)
    .populate("owner")
    .populate(`liveComments`);
  return res.render(`${URL_LIVE}/detail`, { live });
};

export const getLiveEdit = async (req, res) => {
  const { id } = req.params;
  const live = await Live.findById(id);
  return res.render(`${URL_LIVE}/edit`, { live });
};

export const postLiveEdit = async (req, res) => {
  const {
    params: { id },
    body: { liveTitle, liveDescription },
  } = req;
  await Live.findByIdAndUpdate(id, {
    liveTitle,

    liveDescription,
  });
  return res.redirect(`/live/${id}`);
};

export const deleteLive = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.user;
  const live = await Live.findById(id);
  const user = await User.findById(_id);
  let list = user.products;
  const lives = list.filter((data) => {
    return String(live._id) !== String(data._id);
  });
  await User.findByIdAndUpdate(_id, {
    lives,
  });
  await Live.findByIdAndDelete(id);
  await LiveComment.deleteMany({ live: id });
  await fs.unlink(live.liveUrl, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.redirect(`/live`);
};

//Comment

export const createLiveComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const live = await Live.findById(id);
  if (!user) {
    return res.status(403).redirect(`/login`);
  }
  if (!live) {
    return res.sendStatus(404);
  }
  const liveComment = await LiveComment.create({
    text,
    owner: user._id,
    live: id,
  });
  live.liveComments.push(liveComment._id);
  live.save();
  return res.status(201).json({ newCommentId: liveComment._id });
};

export const deleteLiveComment = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    body: { liveId },
  } = req;
  const comment = await LiveComment.findById(id);
  const live = await Live.findById(liveId);
  if (!comment) {
    return res.sendStatus(403);
  }
  if (String(comment.owner) !== String(_id)) {
    return res.sendStatus(403);
  }
  live.liveComments.splice(live.liveComments.indexOf(id), 1);
  live.save();
  await LiveComment.findByIdAndDelete(id);
  return res.sendStatus(200);
};
