const {
  getAllMenu,
  getAllReviews,
  createCartItem,
  getUserCartItems,
  removeCartItem,
} = require("../controllers/brandControllers");

const express = require("express");
const router = express.Router();


router.get("/allMenu", getAllMenu);
router.get("/allReviews", getAllReviews);
router.get("/allCartItems/:userEmail", getUserCartItems);
router.post("/allCartItems", createCartItem);
router.delete("/allCartItems/:cartItemId", removeCartItem);

module.exports = router;
