import { io } from "../server";

const URL_LIVE = `screens/live`;

export const liveHome = (req, res) => {
  return res.render(`screens/lives`);
};
export const getCreateRoom = (req, res) => {
  return res.render(`${URL_LIVE}/create`);
};
export const postCreateRoom = (req, res) => {
  const { roomName } = req.body;
  console.log(roomName);
  return res.redirect(`/live/room/${roomName}`);
};
export const liveRoom = (req, res) => {
  return res.render(`${URL_LIVE}/room`);
};
