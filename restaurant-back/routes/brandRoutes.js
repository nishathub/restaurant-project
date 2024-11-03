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
} = require("../controllers/brandControllers");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// JWT MIDDLEWARE 
const verifyTokenJWT = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).send({message : 'forbidden access: No token'})
  }
  const tokenJWT = req.headers.authorization;
  jwt.verify(tokenJWT, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).send({message : 'forbidden access: Invalid token'})
    }
    req.decoded = decoded;    
    next();
  })
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
router.get("/allReviews", getAllReviews);
router.get("/allCartItems/:userEmail", getUserCartItems);
router.post("/allCartItems", createCartItem);
router.delete("/allCartItems/:cartItemId", removeCartItem);
router.post("/allUsers", createUser);
router.get("/allUsers", verifyTokenJWT, getAllUsers);
router.patch("/allUsers/:userId", setUserRoll);
router.delete("/allUsers/:userId", removeUser);
// JWT
router.post("/jwt", generateTokenJWT);
router.get("/jwt/userRoll/:userEmail", verifyTokenJWT, getUserRoll);

module.exports = router;
