const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+[a-zA-Z\s0-9.-]*$/, "Please enter a valid title"]
    },
    author: {
        type: String,
        required: true,
        match: [/^[a-zA-Z]{2,}[a-zA-Z\s.-]*$/, "Please enter a valid author"]
    },
    description: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+[a-zA-Z\s0-9]*$/, "Please enter a valid description"]
    },
    genre: {
      type: String,
      default: "unknown"
    },
    publishedDate: {
        type: String,
        match: [/^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/\d{4}$/, "Please enter a date in the format mm/dd/yyyy"]
    },
    publishedLanguage: {
        type: String,
        default: "unknown",
        match: [/^[a-zA-Z]+$/, "Please insert a valid language"]
    },
    listPrice: {
        type: Number,
        required: true,
        min: 0
    }
})

const Book = model("Book", bookSchema);

module.exports = Book;