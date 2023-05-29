const router = require("express").Router();
const authorization = require("../middleware/authorization");

const {
  getReadingList,
  addReadingListItem,
  removeReadingListItem,
} = require("../controllers/readingListController");

// reading-lists/:readingListId/items
router
  .route("/:readingListId/items")
  .get(getReadingList)
  .post(authorization, addReadingListItem);

  // reading-lists/:readingListId/items/:itemId
router
  .route("/:readingListId/items/:itemId")
  .delete(authorization, removeReadingListItem);

module.exports = router;
