const Book = require('../models/Book');
const fs = require('fs');

async function getAllBooks(req, res) {
    try {
          const books = await Book.find({});
          //console.log('books', books);
          return res.status(200).json(books);
    } catch (error) {
          return res.status(400).json({ error: error });
    }
};

async function getOneBook(req, res) {
    const id = req.params.bookId;
    try {
          const book = await Book.findOne({ _id: id });
          if (!book) {
                return res.status(404).json({ message: 'Livre nno trouvé' });
          }
          return res.status(200).json(book);
    } catch (error) {
          return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    getAllBooks,
    //addNewBook,
    getOneBook,
    //updateBook,
    //bestRatedBooks,
    //deleteBook,
    //rateBook,
};