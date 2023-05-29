const jwt = require("jsonwebtoken");
const { jwtSecrets } = require("../config/config");

function generateWebToken(id, type) {
  type = type?.toLowerCase();

  id = id.toHexString();

  return jwt.sign({ id }, jwtSecrets.refresh, {
    expiresIn: "30d",
  });
}

module.exports = generateWebToken;
