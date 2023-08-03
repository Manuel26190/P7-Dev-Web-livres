const router = require('express').Router();//Création d'un router dans express
const express = require('express');
const app = express();
const Book = require('../models/Book');
const {
    getAllBooks,
    getOneBook,
    addNewBook,
    updateBook,
    bestRatedBooks,
    deleteBook,
    rateBook,

} = require('../controllers/book');

router.get('/', getAllBooks);
router.get('/:bookId', getOneBook);

module.exports = router;