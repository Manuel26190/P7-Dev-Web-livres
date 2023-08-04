const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

module.exports = async (app) => {
    mongoose.connect(mongoUri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
};





