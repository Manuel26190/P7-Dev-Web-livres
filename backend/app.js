const express = require('express');
const dataBaseConfig = require('./config/database');
const expressconfig = require('./config/express');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();//Création de l'applcation express en l'appelant sous forme de variable.

expressconfig(app);//Configuration du CORS

async function initializeServer() {
  try {
        await dataBaseConfig(app);//connexion à la base de données Mongodb
      app.use('/images', express.static(path.join(__dirname, 'images')));
        //app.use('/books/images', express.static('images'));//Sert des fichiers statiques à partir du repertoire images.
        app.use('/api/books', booksRoutes); // Routes books.
        app.use('/api/auth', userRoutes); // Routes user.
  } catch (error) {
        console.error("Erreur d'initialisation du serveur:", error);
        process.exit(1); // Arrête l'application si on ne se connecte pas à la base de données.
  }
};
initializeServer();

module.exports = app;


