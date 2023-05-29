const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { jwtSecrets } = require("../config/config");

const User = require("../models/UserModel");

module.exports = asyncHandler(async (req, res, next) => {
  let token; // Declare a variable to store the JWT token

  // Check if the request headers contain an authorization token that starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header

      // Verify the token using the secret key for refresh tokens
      const decodedToken = jwt.verify(token, jwtSecrets.refresh);

      // Find the user associated with the decoded token's ID, excluding the password field
      req.user = await User.findById(decodedToken.id).select("-password");
      req.user.token = token; // Attach the token to the user object in the request

      next(); // Call the next middleware
    } catch (error) {
      console.error(error);
      res.status(401); // Set response status code to 401 (Unauthorized)
      throw new Error("Not authorized"); // Throw an error indicating that the user is not authorized
    }
  } else if (!token) {
    res.status(401); // Set response status code to 401 (Unauthorized)
    throw new Error("Not authorized, no token"); // Throw an error indicating that the user is not authorized due to missing token
  }
});
