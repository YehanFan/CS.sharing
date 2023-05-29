const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { jwtSecrets } = require("../config/config");

const User = require("../models/UserModel");

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      

      const decodedToken = jwt.verify(token, jwtSecrets.refresh);
      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      req.user = false;
      next();
    }
  } else if (!token) {
    req.user = false;
    next();
  }
});
