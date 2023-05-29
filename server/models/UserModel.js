const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 3,
      maxlength: 255,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    bio: {
      type: String,
      maxlength: 160,
      default: "",
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    avatar: {
      type: Object,
      default: {},
    },
    coverPhoto: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("user", UserSchema);
