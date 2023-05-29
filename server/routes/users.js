const router = require("express").Router();
const { upload } = require("../storage/cloudinary");

const {
  getUser,
  getSuggestedUsers,
  updateUser,
  uploadAvatar,
} = require("../controllers/userController");

const { getPosts, createPost } = require("../controllers/postController");

const {
  getFollowers,
  addFollower,
  removeFollower,
} = require("../controllers/followController");

const {
  getReadingLists,
  createReadingList,
  deleteReadingList,
} = require("../controllers/readingListController");

const {
  getNotifications,
  getUnreadNotifications,
  readNotifications,
  readNotification,
} = require("../controllers/notificationController");

const authorization = require("../middleware/authorization");
const optionalAuthorization = require("../middleware/optionalAuthorization");
const { validations, validateRequest } = require("../utils/validations");
const { createPostSchema } = validations;
const { updateUserInfoSchema } = validations;


// users/suggested
router.route("/suggested").get(authorization, getSuggestedUsers);

// users/:username
router
  .route("/:username")
  .get(optionalAuthorization, getUser)
  .patch(authorization, validateRequest(updateUserInfoSchema), updateUser);

// users/:username/avatar
router
  .route("/:username/avatar")
  .post(authorization, upload.single("avatar"), uploadAvatar);

// users/:id/posts
router
  .route("/:id/posts")
  .get(getPosts)
  .post(
    authorization,
    upload.single("photo"),
    validateRequest(createPostSchema),
    createPost
  );

// ----------------
//    FOLLOWERS
// ----------------

// users/:userId/followers
router
  .route("/:userId/followers")
  .get(getFollowers)
  .post(authorization, addFollower);

// users/:userId/followers/:followerId
router
  .route("/:userId/followers/:followerId")
  .delete(authorization, removeFollower);

// ----------------
//  READING LISTS
// ----------------

// users/:username/reading-lists
router
  .route("/:username/reading-lists")
  .get(optionalAuthorization, getReadingLists)
  .post(authorization, createReadingList);

// users/:username/reading-lists/:readingListId
router
  .route("/:username/reading-lists/:readingListId")
  .get(optionalAuthorization, getReadingLists)
  .post(authorization, createReadingList)
  .delete(authorization, deleteReadingList);

// ----------------
//   NOTIFICATIONS
// ----------------

// users/:username/notifications
router.route("/:username/notifications").get(authorization, getNotifications);

// users/:username/notifications/unread
router
  .route("/:username/notifications/unread")
  .get(authorization, getUnreadNotifications);

// users/:username/notifications/read
router
  .route("/:username/notifications/read")
  .patch(authorization, readNotifications);

// users/:username/notifications/:notificationId/read
router
  .route("/:username/notifications/:notificationId/read")
  .patch(authorization, readNotification);

module.exports = router;
