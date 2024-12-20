const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");
const { response } = require("express");
// Collections
const menuCollection = () => getDB().collection("MENU"); // modified to a function and will be called later.
const reviewsCollection = () => getDB().collection("REVIEWS"); // modified to a function and will be called later.
const cartItemCollection = () => getDB().collection("CART_ITEMS"); // modified to a function and will be called later.
const userCollection = () => getDB().collection("USERS"); // modified to a function and will be called later.
const paymentCollection = () => getDB().collection("PAYMENT"); // modified to a function and will be called later.
// Functions
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await userCollection().estimatedDocumentCount();
    const totalMenuItems = await menuCollection().estimatedDocumentCount();
    const totalReviews = await reviewsCollection().estimatedDocumentCount();
    const totalOrders = await paymentCollection().estimatedDocumentCount();
    const aggregatePrice = await paymentCollection()
      .aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$price" },
          },
        },
      ])
      .toArray();
    const totalRevenue = aggregatePrice[0]?.total || 0;
    res.send({
      totalUsers,
      totalMenuItems,
      totalOrders,
      totalReviews,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getOrderStats = async (req, res) => {
  try {
    const aggregateMenuCategory = await paymentCollection().aggregate([
      {
        $unwind: "$menuItemsIds",
      },
      {
        $lookup: {
          from: "MENU",
          localField: "menuItemsIds",
          foreignField: "_id",
          as: "menuCategoryDetails",
        },
      },
      {
        $unwind: "$menuCategoryDetails",
      },
      {
        $group: {
          _id: "$menuCategoryDetails.category",
          totalQuantity: { $sum: 1 },
          totalRevenue: { $sum: "$menuCategoryDetails.price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
    ]).toArray();
    res.send(aggregateMenuCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};
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
    } else {
      // if we selected new image, we update it

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
// Payment History
const getPaymentHistory = async (req, res) => {
  try {
    const query = { userEmail: req.params.userEmail };
    // AUTHORIZATION CHECK
    if (req.params.userEmail !== req.decoded.userInfo.userEmail) {
      return res
        .status(403)
        .send({ message: "UnAuthorized Access: Invalid Token" });
    }
    const paymentHistory = await paymentCollection().find(query).toArray();
    res.send(paymentHistory);
  } catch (error) {
    res.status(500).send(error);
  }
};
const setPaymentHistory = async (req, res) => {
  try {
    const userPayment = req.body;
    // keep the payment history in database
    const paymentResult = await paymentCollection().insertOne(userPayment);
    // delete all cart items of the user
    const query = {
      _id: {
        $in: userPayment.cartItemsIds.map((id) => new ObjectId(id)),
      },
    };
    const emptyCartItems = await cartItemCollection().deleteMany(query);
    // send response
    res.send({ paymentResult, emptyCartItems });
  } catch (error) {
    res.status(500).send(error);
  }
};
// Stripe payment
const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);
const stripePaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    if (isNaN(amount)) {
      return res.status(400).send({ errorMessage: "invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAdminStats,
  getOrderStats,
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
  stripePaymentIntent,
  setPaymentHistory,
  getPaymentHistory,
};
