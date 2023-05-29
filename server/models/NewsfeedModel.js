const { Schema, model } = require("mongoose");

const NewsfeedSchema = new Schema({
    feedOwner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true
    },
}, {
    timestamps: true
})

module.exports = model("newsfeed", NewsfeedSchema);
