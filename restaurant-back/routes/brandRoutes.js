const {
  getAllMenu,
  getAllReviews,
  createCartItem,
  getUserCartItems,
} = require("../controllers/brandControllers");

const express = require("express");
const router = express.Router();


router.get("/allMenu", getAllMenu);
router.get("/allReviews", getAllReviews);
router.get("/allCartItems/:userEmail", getUserCartItems);
router.post("/allCartItems", createCartItem);

module.exports = router;
