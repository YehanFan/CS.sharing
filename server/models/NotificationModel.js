const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['follow', 'like', 'like-comment', 'comment']
    },
    actor: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    unread: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("notification", NotificationSchema);
