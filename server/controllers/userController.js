const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");

const {uploadImage} = require("../storage/cloudinary");


const User = require("../models/UserModel");
const Follow = require("../models/FollowModel");

// @desc    Upload a user's avatar
// @route   POST /api/users/:username/avatar
// @access  Private
const uploadAvatar = asyncHandler(async (req, res) => {
  const file = req.file;

  if(!file){
    res.status(400)
    throw new Error("File is required.")
  }

  const image = await uploadImage(file, `${req.user.username}/avatar`)

  if(!image){
    res.status(400)
    throw new Error("File could not be uploaded.")
  }

  let user = await User.findByIdAndUpdate(req.user._id, {
    $set: {
      avatar: image
    }
  })
  

  res.status(200).json({id: user._id, username: user.username, bio: user.bio, avatar: image, token: req.user.token})
})

// @desc    Get user
// @route   GET /api/users/:username
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404);
    throw Error("User not found.");
  }

  const followDoc = await Follow.find({ user: req?.user.id });
  const requesterIsFollowing = followDoc.map((user) => user.following);

  const agg = await User.aggregate([
    {
      $match: {
        _id: Types.ObjectId(user.id),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "author",
        as: "posts",
        pipeline: [
          {
            $sort: {
              createdAt: -1
            }
          },
        ]
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "following",
        as: "followers",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "follower",
              foreignField: "_id",
              as: "followers.followers",
            },
          },
          {
            $unset: [
              "followers.followers.password",
              "followers.followers.email",
            ],
          },
        ],
      },
    },
    {
      $addFields: {
        followerCount: { $size: "$followers.followers.followers" },
      },
    },
    {
      $set: {
        followers: "$followers.followers",
      },
    },
    {
      $set: {
        followers: "$followers.followers",
      },
    },
    {
      $unwind: {
        path: "$followers",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "follower",
        as: "following",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "following",
              foreignField: "_id",
              as: "following.following",
            },
          },
          {
            $unset: [
              "following.following.password",
              "following.following.email",
            ],
          },
        ],
      },
    },
    {
      $addFields: {
        followingCount: { $size: "$following.following.following" },
      },
    },
    {
      $set: {
        following: "$following.following",
      },
    },
    {
      $set: {
        following: "$following.following",
      },
    },
    {
      $unwind: {
        path: "$following",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        isFollowing: { $in: ["$_id", requesterIsFollowing] },
        isOwnProfile: {
          $eq: ["$$CURRENT.username", req.user.username],
        },
      },
    },
    {
      $unset: ["password", "email"],
    },
  ]);

  res.status(200).json(agg[0]);
});

// @desc    Get suggested users
// @route   GET /api/users/suggested
// @access  Private
const getSuggestedUsers = asyncHandler( async (req, res) => {
      const offset = parseInt(req.query.offset) || 0;
      const skipParam = parseInt(req.query.skip) || 0;

      const limit = parseInt(req.query.limit) || 10;
      const skip = skipParam || offset * limit;

      const followersDoc = await Follow.find({ follower: req.user._id });
      const alreadyFollowing = followersDoc.map(user => user.following);

      const people = await User.aggregate([
          {
              $match: {
                  _id: {
                      $nin: [...alreadyFollowing, req.user._id]
                  }
              }
          },
          ...(limit < 10 ? ([{ $sample: { size: limit } }]) : []),
          { $skip: skip },
          { $limit: limit },
          {
              $addFields: {
                  isFollowing: false
              }
          },
          {
              $project: {
                  _id: 1,
                  username: '$username',
                  avatar: '$avatar',
                  isFollowing: 1
              }
          }
      ]);

      if (people.length === 0){
        res.status(404)
        throw new Error("No suggested people.")
      }

      res.status(200).json(people);
})

// @desc    Update user information
// @route   PATCH /api/users/:username
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { bio } = req.body;

  const info = {};

  if (bio) {
    info.bio = bio;
  }

  const user = await User.findByIdAndUpdate(req.user.id, { ...info });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json(user);
});

module.exports = {
  uploadAvatar,
  getUser,
  getSuggestedUsers,
  updateUser,
};
