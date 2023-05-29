const { Schema, model } = require("mongoose");

const ReadingListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 160,
      default: "",
    },
    private: {
      type: Boolean,
      default: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    }
  },
  { timestamps: true }
);

module.exports = model("readingList", ReadingListSchema);
