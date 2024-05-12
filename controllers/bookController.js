const Book = require("../models/Book");

const bookController = {};

// Retrieves all books
bookController.findAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if (books.length > 0) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(books);
        } else {
            res.setHeader("Content-Type", "application/json");
            res.status(404).send({ message: "Could not find any books."});
        }
    } catch (err) {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ message: "Could not retrieve books from database" });
    }
};

// Retrieves a single book by id
bookController.findBook = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id).exec();
        if (book) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(book);
        } else {
            res.setHeader("Content-Type", "application/json");
            res.status(404).send({ message: "Could not find book. Id: " + id });
        }
    } catch (err) {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ message: "Could not retrieve book. Id: " + id });
    }
};

// Creates new book
bookController.createBook = async (req, res) => {
    const {
        title,
        author,
        description,
        genre,
        publishedDate,
        publishedLanguage,
        listPrice
    } = req.body;

    try {
        const book = await Book.create({
            title: title,
            author: author,
            description: description,
            genre: genre,
            publishedDate: publishedDate,
            publishedLanguage: publishedLanguage,
            listPrice: listPrice
        });
        res.setHeader("Content-Type", "application/json")
        res.status(201).send(book);
    } catch (err) {
        const extractedErrors = {};
        Object.keys(err.errors).forEach(key => extractedErrors[key] = `${err.errors[key].name} - ${err.errors[key].message}`);
        
        res.status(422).send(extractedErrors);
    }
};

// Updates a book by id
bookController.updateBook = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id).exec();
        Object.keys(req.body).forEach(key => book[key] = req.body[key]);
        await book.save();

        res.setHeader("Content-Type", "application/json");
        res.status(200).send({ message: "Updated book succesfully. Id: " + id });
    } catch (err) {
        const errors = {};
        if (err.errors) {
            Object.keys(err.errors).forEach(key => errors[key] = `${err.errors[key].name} - ${err.errors[key].message}`);
        } else {
            errors["message"] = "Not a valid id";
        }
        res.setHeader("Content-Type", "application/json");
        res.status(422).send({ message: "Could not update book. Id: " + id, errors });
    }
};

// Deletes a book by id
bookController.deleteBook = async (req, res) => {
    const id = req.params.id;

    try {
        await Book.findByIdAndDelete(id)
        res.setHeader("Content-Type", "application/json");
        res.status(200).send({ message: "Deleted book succesfully" });
    } catch (err) {
        res.setHeader("Content-Type", "application/json");
        res.status(422).send({ message: "Could not delete book. Id: " + id, error: "Not a valid id" });
    }
}


module.exports = bookController;