const router = require("express").Router();
const authorization = require("../middleware/authorization");

const { getNewsfeed } = require("../controllers/newsfeedController");

// /newsfeed
router.route("/").get(authorization, getNewsfeed);

module.exports = router;