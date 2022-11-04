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
  console.log(_id);
  try {
    const newLive = await Live.create({
      liveTitle,
      liveUrl: liveFile,
      liveDescription,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.lives.push(newLive._id);
    await user.save();
    return res.redirect(`/live`);
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req, res) => {
  const { id } = req.params;
  const live = await Live.findById(id);
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
  await Live.findByIdAndDelete(id);
  return res.redirect(`/live`);
};
