const router = require("express").Router();
const authorization = require("../middleware/authorization");

const {
  likeComment,
  removeLikeFromComment,
} = require("../controllers/commentController");


// api/comments/:commentId/like
router
  .route("/:commentId/like")
  .post(authorization, likeComment)
  .delete(authorization, removeLikeFromComment);

  module.exports = router;
