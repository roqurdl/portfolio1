import Stylist from "../models/Stylist";

const URL_STYLIST = `screens/stylist`;
export const stylist = async (req, res) => {
  return res.render(`screens/stylist`);
};
export const getAddStylist = (req, res) => {
  return res.render(`${URL_STYLIST}/add`);
};
export const postAddStylist = (req, res) => {
  return res.redirect(`/stylist`);
};

export const detailStylist = (req, res) => {};

export const getEditStylist = (req, res) => {};
export const postEditStylist = (req, res) => {};

export const deleteStylist = (req, res) => {};
