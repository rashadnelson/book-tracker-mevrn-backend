const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please add a text value"]
    },
    title: {
        type: String,
        required: [true, "Please add a text value"]
    },
    author: {
        type: String,
        required: [true, "Please add a text value"]
    },

}, {
    timestamps: true
}
)

module.exports = mongoose.model("books", bookSchema)