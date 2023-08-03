const express = require('express');
const mongoose = require('mongoose');
const dataBaseConfig = require('./config/database');
const Book = require('./models/Book');
const expressconfig = require('./config/express');

const app = express();//Création de l'applcation express en l'appelant sous forme de variable.

expressconfig(app);//
dataBaseConfig(app);//connexion à la base de données Mongodb

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
      try {
            const book = await Book.findOne({_id: req.params.id});
            //console.log('book', book);
            return res.status(200).json(book);
      } catch (error) {
            return res.status(400).json({ error: error });
      }
};

app.get('/api/books/', getAllBooks);
app.get('/api/books/:id', getOneBook);

module.exports = app; 

/*
app.post('/api/books', (req, res, next) => {
  console.log(req.body); 
  delete req.body._id;    
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));                      
  });
  */