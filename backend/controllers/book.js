const Book = require('../models/Book');
const fs = require('fs');
const multer = require('multer');

async function getAllBooks(req, res) {//middleware get pour tous les livres
    try {
        const books = await Book.find({});
        //console.log('books', books);
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

async function getOneBook(req, res) {//middleware get pour un livre
    const id = req.params.bookId;//récupére le paramètre bookId d'une requête 
        try {
            const book = await Book.findOne({ _id: id });
            if (!book) {
                return res.status(404).json({ message: 'Livre nno trouvé' });
            }
            return res.status(200).json(book);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
};

async function bestRatedBooks(req, res) {//GET best rating    
    try {
        const topBooks = await Book.find({})
            .sort({ averageRating: -1 })//renvoi un tableau et trie dans l'ordre décroissant.
            .limit(3);//limite a 3 livres
        return res.status(200).json(topBooks);
    } catch (error) {
          res.status(400).json({ error: error });
    }
};

async function addNewBook (req, res) {//POST ajouter un nouveau livre.
   const bookObject = JSON.parse(req.body.book);//analyse de l'objet pour otbenir un objet utilisable.
   delete bookObject._id;//Supp de l'id et de l'userId par mesure de sécurité,
   delete bookObject._userId;//l'userId est remplacé en base de données par le _userId extrait du token par le middleware d'authentification. 
   const book = new Book({
       ...bookObject,
       userId: req.auth.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//résolution de l'URL http://localhost:3000/images/"nom de fichier".
   }); 
   book.save()//enregistrement de cet objet dans la base de données.  
   .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
   .catch(error => { res.status(400).json( { error })})
};

async function updateBook (req, res) {//PUT modifier les informations d'un livre
    const bookObject = req.file ? {//Vérification si il y a un champ file dans la requête.
        ...JSON.parse(req.body.book),//je récupère cet objet en parsant la chaine de caractère et en recréant l'URL de l'image.
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };//sinon je récupère l'objet dans le corps de la requête.
  
    delete bookObject._userId;
   Book.findOne({_id: req.params.id})//Vérification si c'est bien l'utilisateur a qui appartient cet objet qui cherche a le modifier.
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

async function deleteBook(req, res) {//DEL supprimer un livre
    // Extraction du bookId des paramètres de requête.
    const id = req.params.bookId;
    // Vérifier si le livre n'a pas été trouvé.
    if (!id) {
          return res.status(404).json({ message: 'livre non trouvé' });
    }
    try {
          // Trouver et supprimer le livre par son identifiant en utilisant Book.findByIdAndDelete()
          const bookToDelete = await Book.findByIdAndDelete(id);
          // Vérifier si le livre n'a pas été trouvé.
          if (!bookToDelete) {
                return res.status(404).json({ message: 'livre non trouvé' });
          }
          // Supprimer le fichier image associée.
          const imagePath = bookToDelete.imageUrl.split('/').pop(); // Extraire le nom du fichier image de l'URL de l'image.
          //fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé.
          fs.unlink(`images/${imagePath}`, (err) => {
                if (err) {
                      console.error('Erreur lors de la suppression du fichier image:', err);
                }
          });
          return res
                .status(200)
                .json({ message: 'Livre supprimé !' });
    } catch (error) {
          return res.status(500).json({ message: error.message });
    }
}

async function rateBook (req, res) {//POST noter un livre
    try {
        res.json({message : "post rate book réussie"})
    } catch {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    getAllBooks,
    addNewBook,
    getOneBook,
    updateBook,
    bestRatedBooks,
    deleteBook,
    rateBook,    
};