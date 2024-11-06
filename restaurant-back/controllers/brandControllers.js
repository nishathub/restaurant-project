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
const AddMenuItem = async (req, res) => {
  try {
    const newMenuItem = req.body;
    const result = await menuCollection().insertOne(newMenuItem);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateMenuItem = async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.params.menuItemId) };
    const options = { upsert: false };
    let updateDoc = {};
    // if we do not select any image, we do not update this field, it will remain unchanged.
    if (req.body.recipeImage === "") {
      updateDoc = {
        $set: {
          name: req.body.recipeName,
          recipe: req.body.recipeDetails,
          category: req.body.recipeCategory,
          price: req.body.recipePrice,
        },
      };
    } else { // if we selected new image, we update it
      
      updateDoc = {
        $set: {
          name: req.body.recipeName,
          recipe: req.body.recipeDetails,
          image: req.body.recipeImage,
          category: req.body.recipeCategory,
          price: req.body.recipePrice,
        },
      };
    }    
    const result = await menuCollection().updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const removeMenuItem = async (req, res) => {
  try {
    const itemId = req.params.menuItemId;
    const query = { _id: new ObjectId(itemId) };
    const result = await menuCollection().deleteOne(query);
    res.send(result);
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
const setUserRoll = async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.params.userId) };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        userRoll: req.body.userRoll,
      },
    };
    const result = await userCollection().updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
// VERIFY USER ROLE
const getUserRoll = async (req, res) => {
  const userEmail = req.params.userEmail;
  const decodeEmail = req.decoded.userInfo.userEmail;
  if (userEmail !== decodeEmail) {
    return res
      .status(403)
      .send({ message: "UnAuthorized Access: Invalid Token" });
  }
  const query = { userEmail: userEmail };
  const user = await userCollection().findOne(query);
  let userRoll = null;
  if (user) {
    userRoll = user?.userRoll;
  }

  res.send(userRoll);
};
const removeUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = { _id: new ObjectId(userId) };
    const result = await userCollection().deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  userCollection,
  getAllMenu,
  AddMenuItem,
  updateMenuItem,
  removeMenuItem,
  getAllReviews,
  getUserCartItems,
  createCartItem,
  removeCartItem,
  createUser,
  getAllUsers,
  removeUser,
  setUserRoll,
  getUserRoll,
};
