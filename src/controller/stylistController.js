import Stylist from "../models/Stylist";

const URL_STYLIST = `screens/stylist`;
export const stylist = async (req, res) => {
  const stylists = await Stylist.find({});
  return res.render(`${URL_STYLIST}`, { stylists });
};
export const getAddStylist = (req, res) => {
  return res.render(`${URL_STYLIST}/add`);
};
export const postAddStylist = async (req, res) => {
  const {
    files: { stylistImg, summaryImg },
    body: { stylistName, stylistSummary },
  } = req;
  await Stylist.create({
    stylistName,
    stylistSummary,
    stylistImg: stylistImg[0].path,
    summaryImg: summaryImg[0].path,
  });
  return res.redirect(`/stylist`);
};

export const detailStylist = async (req, res) => {
  const { id } = req.params;
  const stylist = await Stylist.findById(id);
  return res.render(`${URL_STYLIST}/detail`, { stylist });
};

export const getEditStylist = async (req, res) => {
  const { id } = req.params;
  const stylist = await Stylist.findById(id);
  return res.render(`${URL_STYLIST}/edit`, { stylist });
};
export const postEditStylist = async (req, res) => {
  const { id } = req.params;
  const preImg = await Stylist.findById(id);
  const {
    files: { stylistImg, summaryImg },
    body: { stylistName, stylistSummary },
  } = req;
  await Stylist.findByIdAndUpdate(id, {
    stylistName,
    stylistSummary,
    stylistImg: req.files ? stylistImg[0].path : preImg.stylistImg,
    summaryImg: req.files ? summaryImg[0].path : preImg.summaryImg,
  });
  return res.redirect(`/stylist/${id}`);
};

export const deleteStylist = async (req, res) => {
  const { id } = req.params;
  await Stylist.findByIdAndDelete(id);
  return res.redirect(`/stylist`);
};
