const bcrypt = require('bcrypt');
const User = require('../models/Users');


console.log(User)
//Function pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//Function pour crypter un mot de passe avec 10 tours.
    try {
        
    } catch (error) {
        
    }

};
// Fonction pour connecter des utilsateurs existants
exports.login = (req, res, next) => {

};