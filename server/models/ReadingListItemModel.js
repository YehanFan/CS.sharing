const { Schema, model } = require("mongoose");

const ReadingListItemSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
    list: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "readinglist",
    },
  },
  { timestamps: true }
);

module.exports = model("readingListItem", ReadingListItemSchema);
