const router = require("express").Router();
const authorization = require("../middleware/authorization");
const optionalAuthorization = require("../middleware/optionalAuthorization");

const {
  getPost,
  likePost,
  deletePost,
  removeLikeFromPost,
} = require("../controllers/postController");

const {
  postComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

// posts/:id
router.route("/:id").get(optionalAuthorization, getPost).delete(authorization, deletePost);

// posts/:id/like
router
  .route("/:id/like")
  .post(authorization, likePost)
  .delete(authorization, removeLikeFromPost);

// posts/:postId/comments
router
  .route("/:postId/comments/")
  .get(optionalAuthorization, getComments)
  .post(authorization, postComment);

// posts/:postId/comments/:commentId
router
  .route("/:postId/comments/:commentId")
  .put(authorization, updateComment)
  .delete(authorization, deleteComment);

module.exports = router;
