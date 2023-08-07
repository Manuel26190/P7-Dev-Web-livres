const router = require('express').Router();//Création d'un router dans express
const express = require('express');
const app = express();
const {
    getAllBooks,
    getOneBook,
    addNewBook,
    updateBook,
    bestRatedBooks,
    deleteBook,
    rateBook,
} = require('../controllers/book');
const authentificationToken = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', getAllBooks);
router.get('/bestrating', bestRatedBooks);
router.get('/:bookId', getOneBook);
router.post('/', authentificationToken, multer, addNewBook);
router.put('/:bookId', authentificationToken, multer, updateBook);
router.delete('/:bookId', authentificationToken, deleteBook);
router.post('/:bookId/rating', /*authentificationToken,*/ rateBook);

module.exports = router;