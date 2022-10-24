const URL_LIVE = `screens/live`;

export const liveHome = (req, res) => {
  return res.render(`screens/lives`);
};
export const getAddLive = (req, res) => {
  return res.render(`${URL_LIVE}/add`);
};
export const postAddLive = (req, res) => {
  return res.redirect(`/live`);
};
