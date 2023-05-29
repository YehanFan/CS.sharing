const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");

const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");
const Like = require("../models/LikeModel");
const Notification = require("../models/NotificationModel");

// @desc    Post a comment
// @route   POST /api/posts/:postId/comments
// @access  Private
const postComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  const { content } = req.body;

  const post = await Post.findById(postId)   .populate("author", "-password -email")
  .exec();

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  const comment = await Comment.create({ author: id, post: postId, content });

  const postedComment = await Comment.findById(comment._id)
    .populate("author", "-password -email")
    .exec();

  if (!comment.author._id.equals(post.author._id)) {
    const io = req.app.get("io");
    const notification = await Notification.create({
      type: "comment",
      actor: Types.ObjectId(id),
      target: Types.ObjectId(post.author._id),
      link: `${post.author.username}/${post._id}`,
    })

    const notifications = await Notification.find({
      target: post.author._id,
      unread: true,
    });
    const unreadNotifications = notifications.length;
    io.to(post.author._id.toString()).emit("notification", {
      count: unreadNotifications,
    });
  }

  postedComment.isOwnComment = true;

  res.status(200).send(postedComment);
});

// @desc    Get comments from post
// @route   GET /api/posts/:postId/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  const agg = await Comment.aggregate([
    {
      $match: {
        post: Types.ObjectId(postId),
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        author: {
          id: "$author._id",
          username: "$author.username",
          avatar: "$author.avatar",
        },
        post: "$post",
        content: "$content",
        createdAt: "$createdAt",
        updatedAt: "$updatedAt",
        likeCount: "$likeCount",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "target",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesUserIds: {
          $map: {
            input: "$likes",
            as: "commentLike",
            in: "$$commentLike.author",
          },
        },
      },
    },
    {
      $addFields: {
        isOwnComment: {
          $eq: ["$author.id", Types.ObjectId(req.user?._id)],
        },
        isLiked: {
          $in: [req.user?._id, "$likesUserIds"],
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        author: 1,
        post: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        isOwnComment: 1,
        isLiked: 1,
        likeCount: 1,
        likesUserIds: 1,
      },
    },
  ]);

  if (agg.length === 0) {
    res.status(404);
    throw new Error("No comments found.");
  }

  res.status(200).send(agg);
});

// @desc    Update a comment
// @route   PATCH /api/posts/:postId/comments/:commentId
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const { postId, commentId, content } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  const comment = await Comment.findByIdAndUpdate(commentId, { content })
    .populate({
      path: "author",
      select: "username avatar",
    })
    .exec();

  comment.isOwnComment = true;

  res.status(200).send(comment);
});

// @desc    Like a comment
// @route   POST /api/comments/:commentId/like
// @access  Private
const likeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId).populate("author");

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found.");
  }

  if (comment.author.equals(req.user._id)) {
    res.status(400);
    throw new Error("Cannot like own comment.");
  }

  const query = {
    target: commentId,
    author: req.user._id,
    type: "comment",
  };

  const likedComment = await Like.findOne(query);

  if (likedComment !== null) {
    res.status(409);
    throw new Error("Comment already liked.");
  } else {
    const like = await Like.create({
      type: "comment",
      target: comment._id,
      author: req.user._id,
    });


    const updatedComment = await Comment.findByIdAndUpdate(commentId, {
      $inc: { likeCount: 1 },
    });

    res
      .status(200)
      .json({ isLiked: true, likeCount: updatedComment.likeCount });
  }
});

// @desc    Delete a comment
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  const comment = await Comment.findByIdAndDelete(commentId);
  await Like.deleteMany({target: commentId})

  res.sendStatus(200);
});

// @desc    Unlike a comment
// @route   DELETE /api/comments/:commentId/like
// @access  Private
const removeLikeFromComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found.");
  }

  if (comment.author.equals(req.user._id)) {
    res.status(400);
    throw new Error("Cannot unlike own comment.");
  }

  const query = {
    target: comment._id,
    author: req.user._id,
    type: "comment",
  };

  const likedComment = await Like.findOne(query);


  if (!likedComment) {
    res.status(409);
    throw new Error("Comment is already not liked.");
  } else {
    await Like.findOneAndDelete(query);
    const updatedComment = await Comment.findByIdAndUpdate(comment._id, {
      $inc: { likeCount: -1 },
    });

    res
      .status(200)
      .json({ isLiked: false, likeCount: updatedComment.likeCount });
  }
});

module.exports = {
  postComment,
  likeComment,
  getComments,
  updateComment,
  deleteComment,
  removeLikeFromComment,
};
