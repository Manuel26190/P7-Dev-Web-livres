const mongoose = require('mongoose');

//la fonction Schema de mongoose qui permet de passer un objet avec les différents champs dont notre book a besoin 
const bookSchema = mongoose.Schema({
    title: { type: String, required: true},
    imageUrl: { type: String, required: true},
    tags: { type: String, required: true},
    userId: { type: String, required: true } 
});

module.exports = mongoose.model('Book', bookSchema);