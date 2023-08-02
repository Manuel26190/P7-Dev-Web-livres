const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();//Création de l'applcation express en l'appelant sous forme de variable.

mongoose.connect('mongodb+srv://user:alluser@cluster0.rydbswv.mongodb.net/books',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
//ce middleware intercepte toutes les requête qui ont un content type json 
//et nous met a disposition ce contenu sur l'objet requête dans req.body
app.use(express.json());

app.use((req, res, next) => {//middleware qui gère le CORS
    res.setHeader('Access-Control-Allow-Origin', '*');//permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();
  });    


    async function getAllBooks(req, res) {
      try {
            const books = await Book.find({});
            console.log('books', books);
            return res.status(200).json(books);
      } catch (error) {
            return res.status(400).json({ error: error });
      }
};

app.get('/api/books/', getAllBooks);

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