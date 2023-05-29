const asyncHandler = require("express-async-handler");

const Post = require("../models/PostModel");


// @desc    Search posts by title
// @route   POST /api/search
// @access  Public
const searchPosts = asyncHandler(async (req, res) => {
    const {query} = req.query;

    
    if(!query){
        res.status(400)
        throw new Error("Query parameter is required.")
    }

    let results =   await Post.aggregate([
        {
          $match: {
            title: {
                $regex: query,
                $options: 'i'
            },
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


      res.status(200).json(results)

})

module.exports = {
    searchPosts
}