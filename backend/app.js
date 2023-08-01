const express = require('express');
const mongoose = require('mongoose');
const Book= require('./models/book');

const dbName = 'books';
const connectionString = `mongodb://127.0.0.1:27017/${dbName}`;

const app = express();//Création de l'applcation express en l'appelant sous forme de variable.

mongoose.connect('mongodb+srv://me7sud:emoroide26@cluster0.lhpisa8.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*
  Book.find()
  .then(books => {
    console.log(books);
  })
  .catch(err => {
    console.error('Error querying database', err);
  });  
*/
app.use((req, res, next) => {//middleware qui gère le CORS
    res.setHeader('Access-Control-Allow-Origin', '*');//permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();
  });  

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
  
    app.get('/api/books/:id', (req, res, next) => {
      Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
    });

  app.get('/api/books',(req, res, next) => {    
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));      
});

module.exports = app;

/*
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connected'))
.catch(err => {
  console.error('Error connecting to database', err);
  process.exit(1);
});
*/