import Live from "../models/Live";
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
  } = req;
  await Live.create({
    liveTitle,
    liveUrl: liveFile,
    liveDescription,
  });
  return res.redirect(`/live`);
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
  const preLive = await Live.findById(id);
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
