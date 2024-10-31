const {
  getAllMenu,
  getAllReviews,
  createCartItem,
  getUserCartItems,
  removeCartItem,
  createUser,
} = require("../controllers/brandControllers");

const express = require("express");
const router = express.Router();


router.get("/allMenu", getAllMenu);
router.get("/allReviews", getAllReviews);
router.get("/allCartItems/:userEmail", getUserCartItems);
router.post("/allCartItems", createCartItem);
router.post("/allUsers", createUser);
router.delete("/allCartItems/:cartItemId", removeCartItem);

module.exports = router;
