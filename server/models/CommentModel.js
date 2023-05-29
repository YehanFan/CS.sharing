const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "post"
    },
    content: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


module.exports = model("comment", CommentSchema);
