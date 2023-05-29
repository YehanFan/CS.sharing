const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");

const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const Follow = require("../models/FollowModel");
const Notification = require("../models/NotificationModel");
const Newsfeed = require("../models/NewsfeedModel");

// @desc    Get a list of followers
// @route   GET /api/users/:userId/followers
// @access  Public
const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const peopleFollowingUser = Follow.find({ following: userId });

  if (peopleFollowingUser.length === 0) {
    res.status(404);
    throw new Error("No followers found for user.");
  }

  res.status(200).json(peopleFollowingUser);
});

// @desc    Add someone to a list of followers
// @route   POST /api/users/:userId/followers
// @access  Private
const addFollower = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { followerId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const alreadyFollowing = await Follow.findOne({
    follower: Types.ObjectId(followerId),
    following: Types.ObjectId(userId),
  });

  if (alreadyFollowing) {
    res.status(400);
    throw new Error("User is already following.");
  }

  const followRelationship = await Follow.create({
    follower: Types.ObjectId(followerId),
    following: Types.ObjectId(userId),
  });

  const io = req.app.get("io");
  const notificationDoc = await Notification.create({
    type: "follow",
    actor: followerId,
    target: Types.ObjectId(userId),
    link: `${req.user.username}`,
  });
  const notifications = await Notification.find({
    target: userId,
    unread: true,
  });
  const unreadNotifications = notifications.length;

  io.to(userId).emit("notification", { count: unreadNotifications });


  const subscribeToFeed = await Post.find({ author: Types.ObjectId(userId) }).sort({ createdAt: -1 })

  if (subscribeToFeed.length !== 0) {
    const feeds = subscribeToFeed.map((post) => {
      return {
        feedOwner: req.user._id,
        post: post.author,
      };
    });

    await Newsfeed.insertMany(feeds);
  }

  res.status(200).json(followRelationship);
});

// @desc    Remove a follower from a list of followers
// @route   DELETE /api/users/:userId/followers/:followerId
// @access  Private
const removeFollower = asyncHandler(async (req, res) => {
  const { userId, followerId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const followRelationship = await Follow.findOneAndDelete({
    follower: Types.ObjectId(followerId),
    following: Types.ObjectId(userId),
  });

  const unsubscribeToFeed = await Post.find({
    author: Types.ObjectId(followRelationship.following),
  })
    .sort({ createdAt: -1 })
    .limit(10);

  if (unsubscribeToFeed.length !== 0) {
    const feeds = unsubscribeToFeed.map((post) => {
      return {
        feedOwner: req.user._id,
        post: post.author,
      };
    });

    await Newsfeed.deleteMany(feeds);
  }

  res.status(200).json(followRelationship);
});

module.exports = {
  getFollowers,
  addFollower,
  removeFollower,
};
