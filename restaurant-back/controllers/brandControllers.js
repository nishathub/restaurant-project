const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const menuCollection = () => getDB().collection("MENU"); // modified to a function and will be called later.
const reviewsCollection = () => getDB().collection("REVIEWS"); // modified to a function and will be called later.

const getAllMenu = async (req, res) => {
  try {
    const products = await menuCollection().find().toArray();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllReviews = async (req, res) => {
  try {
    const products = await reviewsCollection().find().toArray();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllMenu,
  getAllReviews,
};
