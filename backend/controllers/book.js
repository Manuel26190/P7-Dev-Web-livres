const Book = require('../models/Book');
const fs = require('fs');

async function getAllBooks(req, res) {//middleware get pour tous les livres
    try {
          const books = await Book.find({});
          //console.log('books', books);
          return res.status(200).json(books);
    } catch (error) {
          return res.status(400).json({ error: error });
    }
};

async function getOneBook(req, res) {//middleware get pour un livre
    const id = req.params.bookId;//récupére le paramètre bookId d'une requête 
    //console.log('bookId', id);
    try {
          const book = await Book.findOne({ _id: id });
          if (!book) {
                return res.status(404).json({ message: 'Livre nno trouvé' });
          }
          return res.status(200).json(book);
    } catch (error) {
          return res.status(404).json({ error: error.message });
    }
};
async function bestRatedBooks(req, res) {    
    try {
          const topBooks = await Book.find({})
                .sort({ averageRating: -1 })//renvoi un tableau et trie dans l'ordre décroissant.
                .limit(3);//limite a 3 livres

          return res.status(200).json(topBooks);
    } catch (error) {
          res.status(400).json({ error: error });
    }
}

module.exports = {
    getAllBooks,
    //addNewBook,
    getOneBook,
    //updateBook,
    bestRatedBooks,
    //deleteBook,
    //rateBook,
};