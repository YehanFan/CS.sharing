const router = require("express").Router();
const {searchPosts} = require("../controllers/searchController");

// search
router.route("/").get(searchPosts)


module.exports = router;