const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
    photo: {
      type: Object,
      default: {},
    },
    private: {
      type: Boolean,
      default: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false}
);

module.exports = model("post", PostSchema);
