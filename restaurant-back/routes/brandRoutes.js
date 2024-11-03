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
const jwt = require("jsonwebtoken");

// JWT MIDDLEWARE 
const verifyTokenJWT = (req, res, next) => {
  console.log('inside verify Token middleware : ', req.headers.authorization);
  if(!req.headers.authorization) {
    return res.status(401).send({message : 'forbidden access'})
  }
  const tokenJWT = req.headers.authorization;
  jwt.verify(tokenJWT, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).send({message : 'forbidden access'})
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
router.post("/jwt", generateTokenJWT);

module.exports = router;
