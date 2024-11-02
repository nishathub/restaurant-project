const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const menuCollection = () => getDB().collection("MENU"); // modified to a function and will be called later.
const reviewsCollection = () => getDB().collection("REVIEWS"); // modified to a function and will be called later.
const cartItemCollection = () => getDB().collection("CART_ITEMS"); // modified to a function and will be called later.
const userCollection = () => getDB().collection("USERS"); // modified to a function and will be called later.

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
const getUserCartItems = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const query = { email: userEmail };
    const products = await cartItemCollection().find(query).toArray();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createCartItem = async (req, res) => {
  try {
    const newCartItem = req.body;
    const result = await cartItemCollection().insertOne(newCartItem);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const removeCartItem = async (req, res) => {
  try {
    const itemId = req.params.cartItemId;
    const query = { _id: new ObjectId(itemId) };
    const result = await cartItemCollection().deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createUser = async (req, res) => {
  try {
    const newUserInfo = req.body;
    const query = { userEmail: newUserInfo.userEmail };
    const userExist = await userCollection().findOne(query);
    if (userExist) {
      return res.send({ message: "user already exist", insertedId: null });
    }
    const result = await userCollection().insertOne(newUserInfo);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await userCollection().find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllMenu,
  getAllReviews,
  getUserCartItems,
  createCartItem,
  removeCartItem,
  createUser,
  getAllUsers,
};
