const multer = require('multer');

const storage = multer.memoryStorage(); // Utilise le stockage en mémoire pour gérer les téléchargements de fichiers.
// Fonction de filtrage pour vérifier si le fichier téléchargé est une image.
const filter = (req, file, callback) => {
      if (file.mimetype.split('/')[0] === 'image') {
            callback(null, true); // Accepter le fichier s'il s'agit d'une image
      } else {
            callback(new Error('Seulement les images sont autorisées')); // Refuse le fichier s'il n'est pas une image
      }
};

const upload = multer({ storage: storage, fileFilter: filter }).single('image'); // Middleware de téléchargement de fichier unique, n'acceptant que les images.

module.exports = {
      upload,
};