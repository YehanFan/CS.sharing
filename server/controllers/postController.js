const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");

const { uploadImage, deleteImage } = require("../storage/cloudinary");

const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const Follow = require("../models/FollowModel");
const Like = require("../models/LikeModel");
const Comment = require("../models/CommentModel");
const Notification = require("../models/NotificationModel");
const Newsfeed = require("../models/NewsfeedModel");

// @desc    Create a post
// @route   POST /api/users/:id/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(422);
    throw new Error("Missing required field.");
  }

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const photo = await uploadImage(req.file, `${req.user.username}/posts`);

  const post = await Post.create({
    author: id,
    title,
    photo,
    content: JSON.parse(content),
  });

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  const followersDocuments = await Follow.find({ following: req.user._id });
  const followers = followersDocuments.map((user) => user.follower);

  const newsfeeds = followers
    .map((follower) => ({
      feedOwner: Types.ObjectId(follower._id),
      post: Types.ObjectId(post._id),
      createdAt: post.createdAt,
    }))
    .concat({
      // append own post on newsfeed
      feedOwner: Types.ObjectId(req.user._id),
      post: Types.ObjectId(post._id),
      createdAt: post.createdAt,
    });

  if (newsfeeds.length !== 0) {
    const feeds = await Newsfeed.insertMany(newsfeeds);
  }

  if (!post.private) {
    const io = req.app.get("io");
    followers.forEach((id) => {
      io.to(id.toString()).emit("newFeed", {
        ...post.toObject(),
        isOwnPost: false,
      });
    });
  }

  res.status(200).json(post.id);
});

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate("author");

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  if (post.author.equals(req.user._id)) {
    res.status(400);
    throw new Error("Cannot like own post.");
  }

  const query = {
    target: id,
    user: req.user._id,
    type: "post",
  };

  const likedPost = await Like.findOne(query);

  if (likedPost !== null) {
    res.status(409);
    throw new Error("Post already liked.");
  } else {
    const like = await Like.create({
      type: "post",
      target: post._id,
      author: req.user._id,
    });

    if (!post.author._id.equals(req.user._id)) {
      const io = req.app.get("io");
      const targetId = post.author._id;
      const newNotification = {
        type: "like",
        actor: req.user._id,
        target: targetId,
        link: `${post.author.username}/${post._id}`,
      };

      const notificationExists = await Notification.findOne(newNotification);

      if (!notificationExists) {
        let notification = await Notification.create(newNotification);

        notification = notification
          .populate({
            path: "actor target",
            select: "username avatar",
          })
          .execPopulate();

        const notifications = await Notification.find({
          target: post.author._id,
          unread: true,
        });

        const unreadNotifications = notifications.length;

        io.to(targetId).emit("notification", {
          count: unreadNotifications,
        });
      } else {
        await Notification.findOneAndUpdate(newNotification, {
          $set: { createdAt: Date.now() },
        });
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      $inc: { likeCount: 1 },
    });

    res.status(200).json({ isLiked: true, likeCount: updatedPost.likeCount });
  }
});

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate("author", "-password -email")
    .exec();

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  let isFollowing;
  if(req.user){
    const following = await Follow.findOne({follower: req.user.id, following: post.author})
    isFollowing = Boolean(following);
  }

  let isLiked;
  if (req.user) {
    const likedPost = await Like.findOne({ author: req.user.id, target: post._id });
    isLiked = Boolean(likedPost);
  } else {
    isLiked = false;
  }

  res.status(200).json({ ...post.toJSON(), isFollowing, isLiked });
});

// @desc    Get posts by author id
// @route   GET /api/users/:id/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const posts = await Post.find({ author: Types.ObjectId(id) })
    .populate("author", "-password -email")
    .exec();

  if (!posts) {
    res.status(404);
    throw new Error("Posts not found.");
  }

  res.status(200).json(posts);
});

// @desc    Update a post
// @route   PUT /api/users/:userId/posts/:postId
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const { userId, postId } = req.params;
  const { title, content } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (!postId) {
    res.status(404);
    throw new Error("Post not found.");
  }

  if (!title || !content) {
    res.status(422);
    throw new Error("Missing required field.");
  }

  const post = await Post.findByIdAndUpdate(postId, { title, content });

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  res.status(200).json(post.id);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findById(postId);

  if (!post.author.equals(req.user._id)) {
    res.status(401);
    throw new Error("Unauthorized to delete post.");
  }

  if (post.avatar) {
    const publicId = post.avatar;
    await deleteImage(publicId);
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  if (!deletedPost) {
    res.status(404);
    throw new Error("Post not found.");
  }
  
  const comments = Comment.find({post: Types.ObjectId(postId)})

  comments.forEach(async (comment) =>
    {await Like.deleteMany({target: comment._id})})

  await Newsfeed.deleteMany({ post: Types.ObjectId(postId) });
  await Like.deleteMany({ target: Types.ObjectId(postId)})
  await Comment.deleteMany({ post: Types.ObjectId(postId) })

  res.status(200).json(post.id);
});

// @desc    Remove a like from a post
// @route   DELETE /api/posts/:id/like
// @access  Private
const removeLikeFromPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found.");
  }

  if (post.author.equals(req.user._id)) {
    res.status(400);
    throw new Error("Cannot unlike own post.");
  }

  const query = {
    target: Types.ObjectId(id),
    author: req.user._id,
    type: "post",
  };


  const likedPost = await Like.findOne(query);

  if (!likedPost) {
    res.status(409);
    throw new Error("Post is already not liked.");
  } else {
    const deletedLike = await Like.findOneAndDelete(query);

    const updatedPost = await Post.findByIdAndUpdate(id, {
      $inc: { likeCount: -1 },
    });

    res.status(200).json({ isLiked: false, likeCount: updatedPost.likeCount });
  }
});

module.exports = {
  getPost,
  getPosts,
  createPost,
  likePost,
  deletePost,
  removeLikeFromPost,
  updatePost,
};
