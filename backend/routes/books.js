const router = require('express').Router();//Création d'un router dans express
const express = require('express');
const app = express();
//const Book = require('../models/Book');
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
router.get('/bestrating', bestRatedBooks);
router.get('/:bookId', getOneBook);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);
router.post('/', );
router.post('/', addNewBook);
router.post('/:bookId/rating', rateBook);

module.exports = router;