const mongoose = require('mongoose');

module.exports = async (app) => {
    mongoose.connect('mongodb+srv://user:alluser@cluster0.rydbswv.mongodb.net/books',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

};





