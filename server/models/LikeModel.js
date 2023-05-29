const { Schema, model } = require("mongoose");

const LikeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["post", "comment"],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    target: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
  },
  { timestamps: true }
);


module.exports = model("like", LikeSchema);
