const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");

const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const ReadingList = require("../models/ReadingListModel");
const ReadingListItem = require("../models/ReadingListItemModel");

// @desc    Add a reading list item
// @route   POST /api/reading-lists/:readingListId/items
// @access  Private
const addReadingListItem = asyncHandler(async (req, res) => {
  const { readingListId } = req.params;
  const { postId } = req.body;

  const readingList = await ReadingList.findById(readingListId);

  const existingReadingListItem = await ReadingListItem.find({
    list: readingListId,
    post: postId,
  });

  if (existingReadingListItem[0]) {
    res.status(400);
    throw new Error("Item already exists.");
  }

  if (!readingList) {
    res.status(404);
    throw new Error("Reading list not found.");
  }

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  await ReadingListItem.create({ post: postId, list: readingListId });

  res.sendStatus(200);
});

// @desc    Create a reading list
// @route   POST /api/users/:username/reading-lists/
// @access  Private
const createReadingList = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is a required field.");
  }

  const user = await User.find({ username });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const newReadingList = await ReadingList.create({
    name,
    description,
    author: req.user._id,
  });

  await newReadingList.populate("author", "-password -email");

  newReadingList._doc.posts = [];

  res.status(200).json(newReadingList);
});

// @desc    Get reading list
// @route   GET /api/reading-lists/:readingListId/items
// @access  Public
const getReadingList = asyncHandler(async (req, res) => {
  const { readingListId } = req.params;

  const readingList = await ReadingList.aggregate([
    {
      $match: {
        _id: Types.ObjectId(readingListId),
      },
    },
    {
      $lookup: {
        from: "readinglistitems",
        localField: "_id",
        foreignField: "list",
        as: "items",
        pipeline: [
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
                    as: "author"
                  }
                },
                {
                  $unwind: "$author"
                }
              ]
            },
          },
          {
            $unwind: "$post"
          }
        ],
      },
    },
    {
      $addFields: {
        items: {
          $map: {
            input: "$items",
            as: "posts",
            in: "$$posts.post",
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              bio: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$author" },
  ]);


  res.status(200).json(readingList[0]);
});

// @desc    Get reading lists
// @route   GET /api/users/:username/reading-lists/
// @access  Public
const getReadingLists = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (!user._id.equals(req.user._id)) {
    res.status(401);
    throw new Error("Not authorized.");
  }

  const agg = await ReadingList.aggregate([
    {
      $match: {
        author: Types.ObjectId(user._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              bio: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$author" },
    {
      $lookup: {
        from: "readinglistitems",
        localField: "_id",
        foreignField: "list",
        as: "posts",
      },
    },
  ]);

  if (agg.length === 0) {
    res.status(404);
    throw new Error("Reading lists not found.");
  }

  res.status(200).json(agg);
});

// @desc    Remove a reading list item
// @route   POST /api/reading-lists/:readingListId/items/:itemId
// @access  Private
const removeReadingListItem = asyncHandler(async (req, res) => {
  const { readingListId, itemId } = req.params;

  const readingList = await ReadingList.findById(readingListId);

  if (!readingList) {
    res.status(404);
    throw new Error("Reading list not found.");
  }

  const readingListItem = await ReadingListItem.findByIdAndDelete(itemId);

  if (!readingListItem) {
    res.status(404);
    throw new Error("Reading list relation not found.");
  }

  res.sendStatus(200);
});

// @desc    Delete a reading list
// @route   DELETE /api/users/:username/reading-lists/:readingListId
// @access  Private
const deleteReadingList = asyncHandler(async (req, res) => {
  const { readingListId } = req.params;

  const readingList = await ReadingList.findById(readingListId);

  if (readingList.isPrimary) {
    res.status(400);
    throw new Error("Primary list cannot be deleted.");
  }

  if (!readingList.author.equals(req.user._id)) {
    res.status(401);
    throw new Error("Unauthorized to delete reading list.");
  }

  await ReadingListItem.deleteMany({ list: readingList._id });
  const deletedReadingList = await ReadingList.findByIdAndDelete(readingListId);

  res.status(200).json(deletedReadingList._id);
});

module.exports = {
  addReadingListItem,
  createReadingList,
  getReadingList,
  getReadingLists,
  removeReadingListItem,
  deleteReadingList,
};
