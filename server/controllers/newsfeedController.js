const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");

const Post = require("../models/PostModel");
const Newsfeed = require("../models/NewsfeedModel");

// @desc    Get a user's newsfeed
// @route   GET /api/users/:username/newsfeed
// @access  Private
const getNewsfeed = asyncHandler(async (req, res) => {
  let newsfeed;

  newsfeed = await Newsfeed.aggregate([
    { $match: { feedOwner: req.user._id } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "post",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "author",
              foreignField: "_id",
              as: "author",
            },
          },
        ],
      },
    },
    {
      $project: {
        post: { $first: "$post" },
      },
    },
    {
      $limit: 20
    },
    {
      $addFields: {
        isOwnPost: { $eq: ["$$CURRENT._author_id", req.user?._id] },
      },
    },
    {
      $project: {
        _id: "$post._id",
        private: "$post.private",
        title: "$post.title",
        content: "$post.content",
        photo: "$post.photo",
        author: "$post.author",
        createdAt: "$post.createdAt",
        updatedAt: "$post.updatedAt",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $unset: [
        "author.password",
        "author.email",
        "author.createdAt",
        "author.updatedAt",
      ],
    },
  ]);
  
  const filteredPosts = [];

  newsfeed.forEach((post) => {
    if (post.isOwnPost || !post.private) {
      filteredPosts.push(post);
    }
  });

  newsfeed = filteredPosts;

  if (newsfeed.length > 0) {
    res.status(200).json(newsfeed);
  } else {
    const posts = await Post.aggregate([
      {
        $match: {
          private: false,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "users",
          let: { authorId: "$author" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$authorId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                avatar: 1,
                username: 1,
              },
            },
          ],
          as: "author",
        },
      },
      {
        $project: {
          _id: 1,
          private: 1,
          photo: 1,
          title: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          author: { $first: "$author" },

        },
      },
    ]);

    res.status(200).json(posts)
  }
});

module.exports = {
  getNewsfeed,
};
