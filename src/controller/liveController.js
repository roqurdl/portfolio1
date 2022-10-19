import { io } from "../server";
export const liveHome = (req, res) => {
  return res.render(`screens/lives`);
};

export const getCreateRoom = (req, res) => {};
export const postCreateRoom = (req, res) => {};
export const liveRoom = (req, res) => {
  return res.render(`screens/live/detail`);
};
