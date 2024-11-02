const {
  getAllMenu,
  getAllReviews,
  createCartItem,
  getUserCartItems,
  removeCartItem,
  createUser,
  getAllUsers,
  removeUser,
  setUserRoll,
} = require("../controllers/brandControllers");

const express = require("express");
const router = express.Router();


router.get("/allMenu", getAllMenu);
router.get("/allReviews", getAllReviews);
router.get("/allCartItems/:userEmail", getUserCartItems);
router.post("/allCartItems", createCartItem);
router.delete("/allCartItems/:cartItemId", removeCartItem);
router.post("/allUsers", createUser);
router.get("/allUsers", getAllUsers);
router.patch("/allUsers/:userId", setUserRoll);
router.delete("/allUsers/:userId", removeUser);

module.exports = router;
