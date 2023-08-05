const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

//Function pour l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//Function pour crypter un mot de passe avec 10 tours.
    .then(hash => {
        const user = new User({//Création d'un nouvel utilisateur avec le mot de passe crypté
            email: req.body.email,
            password: hash
        });
        user.save()//Enregistrement dans la base de données du nouvel utilisateur
            .then(() => res.status(201).json({message: 'Utilisateur créé'}))
            .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};
// Fonction pour connecter des utilsateurs existants
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
//Vérification si l'utilisateur a bien été trouvé et si le mot de passe est le bon.
    .then(user => { 
        if (user === null) {
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
        } else {
            bcrypt.compare(req.body.password, user.password) 
            .then(valid => {
                if (!valid){
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( 
                            {userId: user._id},//Payload => données encodées dans le token.
                            'RANDOM_TOKEN_SECRET',//clé secrète pour l'encodage.
                            {expiresIn: '24h'}//Expiration du token => 24h
                        )
                    });
                }
            })
            .catch(error => {
                res.status(500).json({error})
            } )     
        }
    })
    .catch(error => {
        res.status(500).json({error});
    })
};
