const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]//récupération du token.
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//Décodage et vérification du token.
        const userId = decodedToken.userId;//Récupération du userId dans le token.
        req.auth = {//Création de l'objet auth avec un champ userId.
            userId: userId
        };
        //next();
    } catch(error) {
        res.status(401).json({error});
    }
}