const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateWebToken = require("../utils/generateWebToken");

const User = require("../models/UserModel");
const ReadingList = require("../models/ReadingListModel");

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const emailTaken = await User.findOne({ email });

  if (emailTaken !== null) {
    res.status(409);
    throw new Error("Email is unavailable.");
  }

  let usernameTaken;

  try {
    usernameTaken = await User.findOne({ username });
  } catch (error) {
    res.status(409);
    throw new Error("Username is unavailable.");
  }

  if (usernameTaken) {
    res.status(409);
    throw new Error("Username is unavailable.");
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  await ReadingList.create({
    name: "Reading List",
    isPrimary: true,
    author: user.id,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Email is invalid.");
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (user && passwordValid) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Password is invalid.");
  }
});

module.exports = {
  register,
  login,
};
