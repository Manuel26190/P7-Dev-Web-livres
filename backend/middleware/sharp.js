const sharp = require('sharp');
const resizeImage = async (req, res, next) => {
      if (!req.file) {
            return next(); // Si aucun fichier n'est téléchargé, passez au prochain middleware.
      }
      try {
            const imagePath = req.file.buffer; // Obtenir le tampon du fichier téléchargé.
            const name = req.file.originalname.split('.')[0]; // Obtenir le nom de fichier d'origine sans l'extension.
            const sharpFile = await sharp(imagePath) // Utiliser la bibliothèque Sharp pour redimensionner l'image à une largeur et une hauteur spécifiques et la convertir au format WebP.
                  .resize({ width: 206, height: 260, fit: sharp.fit.fill })
                  .webp({ quality: 100 })
                  .toFile(`images/${name}.webp`);
      } catch (error) {
            return res.status(500).json({ message: "Erreur de redimensionnement de l'image" });
      }

      next();
};

module.exports = { resizeImage };
