const { Schema, model } = require("mongoose");

const FollowSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    following: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = model("follow", FollowSchema);
