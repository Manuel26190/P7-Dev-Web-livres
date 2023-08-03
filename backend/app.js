const express = require('express');
const dataBaseConfig = require('./config/database');
const Book = require('./models/Book');
const expressconfig = require('./config/express');
const booksRoutes = require('./routes/books');

const app = express();//Création de l'applcation express en l'appelant sous forme de variable.

expressconfig(app);//Configuration du CORS
//dataBaseConfig(app);
/*
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
*/
//app.get('/api/books/', getAllBooks);
//app.get('/api/books/:id', getOneBook);

async function initializeServer() {
  try {
        await dataBaseConfig(app);//connexion à la base de données Mongodb

        //app.use('/books/images', express.static('images')); // Serve static files from the 'images' directory
        app.use('/api/books', booksRoutes); // Mount the books routes
        //app.use('/api/auth', userRoutes); // Mount the user routes
  } catch (error) {
        console.error('Error initializing server:', error);
        process.exit(1); // Terminate the application if unable to connect to the database
  }
};
initializeServer();

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