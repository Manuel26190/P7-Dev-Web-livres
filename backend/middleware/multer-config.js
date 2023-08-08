const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({//configure le chemin et le nom de fichier pour les fichiers entrants.
  destination: (req, file, callback) => {//enregistre les fichiers dans le dossier images.
    callback(null, 'images');
  },
  //la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores 
  //et d'ajouter un timestamp Date.now() comme nom de fichier. 
  //Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');//gestion uniquement des fichiers image.
/*
// vérification supplémentaire pour vous assurer que le type MIME est correctement géré par votre application.
    if (extension) {
      callback(null, name + Date.now() + '.' + extension);
    } else {
      callback(new Error('Invalid file type'));
    }

    */