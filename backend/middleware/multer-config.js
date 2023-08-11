// const multer = require('multer');

// const storage = multer.memoryStorage(); // Use memory storage for handling file uploads
// // Filter function to check if the uploaded file is an image
// const filter = (req, file, callback) => {
//       if (file.mimetype.split('/')[0] === 'image') {
//             callback(null, true); // Accept the file if it's an image
//       } else {
//             callback(new Error('Only images allowed')); // Reject the file if it's not an image
//       }
// };

// const upload = multer({ storage: storage, fileFilter: filter }).single('image'); // Single file upload middleware, accepting only images

// module.exports = {
//       upload,
// };

const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

const storage = multer.diskStorage({//configure le chemin et le nom de fichier pour les fichiers entrants.
  destination: (req, file, callback) => {//enregistre les fichiers dans le dossier images.
    callback(null, 'images');
  },
  //la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores 
  //et d'ajouter un timestamp Date.now() comme nom de fichier. 
  //Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');//gestion uniquement des fichiers image.




