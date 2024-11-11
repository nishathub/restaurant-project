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
  getUserRoll,
  userCollection,
  AddMenuItem,
  removeMenuItem,
  updateMenuItem,
  stripePaymentIntent,
  setPaymentHistory,
  getPaymentHistory,
} = require("../controllers/brandControllers");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// JWT MIDDLEWARE 
const verifyTokenJWT = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).send({message : 'forbidden access: No Token'})
  }
  const tokenJWT = req.headers.authorization.split(" ")[1];  
  jwt.verify(tokenJWT, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(403).send({message : 'forbidden access: Invalid Token'})
    }
    req.decoded = decoded;    
    next();
  })
}
// Verify Admin
const verifyAdmin = async(req, res, next) => {
  const decodeEmail = req.decoded.userInfo.userEmail;
  const query = {userEmail : decodeEmail};
  const user = await userCollection().findOne(query);
  const isAdmin = user?.userRoll === "Admin";
  if(!isAdmin){
    return res.status(403).send({message : 'forbidden access: Invalid Token'})
  }
  next();
}
// JWT GENERATE AND SEND TO FRONT
const generateTokenJWT = async (req, res) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign({ userInfo }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({token});
  } catch (error) {
    res.status(500).send(error)
  }
};

router.get("/allMenu", getAllMenu);
router.post("/allMenu", verifyTokenJWT, verifyAdmin, AddMenuItem);
router.patch("/allMenu/:menuItemId",verifyTokenJWT, verifyAdmin, updateMenuItem);
router.delete("/allMenu/:menuItemId",verifyTokenJWT, verifyAdmin, removeMenuItem);
router.get("/allReviews", getAllReviews);
router.get("/allCartItems/:userEmail", getUserCartItems);
router.post("/allCartItems", createCartItem);
router.delete("/allCartItems/:cartItemId",verifyTokenJWT, removeCartItem);
router.post("/allUsers", createUser);
router.get("/allUsers", verifyTokenJWT, getAllUsers);
router.patch("/allUsers/:userId", verifyTokenJWT, verifyAdmin, setUserRoll);
router.delete("/allUsers/:userId", verifyTokenJWT, verifyAdmin, removeUser);
// JWT
router.post("/jwt", generateTokenJWT);
router.get("/jwt/userRoll/:userEmail", verifyTokenJWT, getUserRoll);
//STRIPE PAYMENT
router.post("/create-payment-intent", stripePaymentIntent);
// PaymentHistory
router.post("/userPaymentHistory", setPaymentHistory);
router.get("/userPaymentHistory/:userEmail",verifyTokenJWT, getPaymentHistory);


module.exports = router;
