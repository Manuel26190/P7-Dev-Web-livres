const Book = require('../models/Book');
const fs = require('fs');
const multer = require('multer');


async function getAllBooks(req, res, next) {//middleware get pour tous les livres
    try {
        const books = await Book.find({});
        //console.log('books', books);
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

// async function getAllBooks(req, res, next) {
//     try {
//         const books = await Book.find({});
//         const booksWithImageUrls = books.map(book => ({
//             ...book.toObject(),
//             imageUrl: `${req.protocol}://${req.get('host')}/images/${book.imageUrl}`
//         }));
//         return res.status(200).json(booksWithImageUrls);
//     } catch (error) {
//         return res.status(400).json({ error: error });
//     }
// };

async function getOneBook(req, res, next) {//middleware get pour un livre
    const id = req.params.bookId;//récupére le paramètre bookId d'une requête
    //console.log('req.params.bookId', id); 
        try {
            const book = await Book.findOne({ _id: id });
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' });
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

async function addNewBook (req, res, next) {//POST ajouter un nouveau livre.
   const bookObject = JSON.parse(req.body.book);//analyse de l'objet pour otbenir un objet utilisable.
   delete bookObject._id;//Supp de l'id et de l'userId par mesure de sécurité,
   delete bookObject._userId;//l'userId est remplacé en base de données par le _userId extrait du token par le middleware d'authentification. 
   //console.log('req.file.originalname', req.file.originalname);
   //console.log('req.file', req.file);
   //console.log('req.body', req.body);
   const book = new Book({
       ...bookObject,
       userId: req.auth.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.originalname}`//résolution de l'URL http://localhost:3000/images/"nom de fichier".
   }); 
   await book.save()//enregistrement de cet objet dans la base de données.  
   .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
   .catch(error => { res.status(400).json( { error })})
};

// async function updateBook(req, res) {
//     const { bookId } = req.params;
//     // Check if the bookId parameter is provided
//     if (!bookId) {
//           return res.status(404).json({ message: 'Livre non trouvé' });
//     }

//     try {
//           // Recherche du livre dans la base de données avec son bookId.
//           const book = await Book.findOne({ _id: bookId });
//           let imageUrl = book.imageUrl;
//           // Vérifier si une nouvelle image est chargée.
//           // Extraction des détails du livre de la requête body.
//           if (req.file) {
//                 // Suppression de l'ancien fichier image
//                 const oldImagePath = book.imageUrl.split('/').pop(); // Extraction de l'ancien fichier image de l'URL.
//                 fs.unlink(`images/${oldImagePath}`, (err) => {
//                       if (err) {
//                             console.error(
//                                   "Erreur de suppression de l'ancienne image:",
//                                   err
//                             );
//                       }
//                 });
//                 const imagePath =
//                       req.file.originalname.split('.')[0] + '.' + 'webp';
//                 imageUrl = `http://localhost:4000/books/images/${imagePath}`;
//           }
//           const { title, author, year, genre } = JSON.parse(req.body.book);
//           const bookUpdate = {
//                 title,
//                 author,
//                 year,
//                 genre,                
//           };
//           // Mise à jour du champ imageUrl si une nouvelle image est téléchargée.
//           if (imageUrl) {
//                 bookUpdate.imageUrl = imageUrl;
//           }
//           // Mise à jour et récupération document livre mis à jour.
//           const updatedBook = await Book.findByIdAndUpdate(
//                 bookId,
//                 bookUpdate,
//                 {
//                       new: true, // L'option dans Mongoose qui renvoie le document mis à jour en tant que résultat de findByIdAndUpdate().
//                       runValidators: true, // Active l'exécution des validateurs lors de la mise à jour.
//                 }
//           );
//           // Vérification si le livre n'est pas trouvé.
//           if (!updatedBook) {
//                 return res.status(404).json({ message: 'Livre non trouvé' });
//           }
//           // Renvoyer le document du livre mis à jour en tant que réponse.
//           return res.status(200).json(updatedBook);
//     } catch (error) {
//           // Gestion de toutes les erreurs survenues pendant le processus de mise à jour.
//           res.status(500).json({ message: error.message });
//     }
// }

async function updateBook (req, res) {//PUT modifier les informations d'un livre    
    const bookObject = req.file ? {//Vérification si il y a un champ file dans la requête.
        ...JSON.parse(req.body.book),//je récupère cet objet en parsant la chaine de caractère et en recréant l'URL de l'image.
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...(req.body) };//sinon je récupère l'objet dans le corps de la requête.
        delete bookObject._userId;
   Book.findOne({_id: req.params.bookId})//Vérification si c'est bien l'utilisateur a qui appartient cet objet qui cherche a le modifier.
        try {
            const book = await Book.findOne({_id:  req.params.bookId});
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé'});
            } else {                
                Book.updateOne({ _id: req.params.bookId}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
            if (req.file) {
                // Supprimer le fichier image associée.                
                //fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé.
                fs.unlink(`images/${imagePath}`, (err) => {
                    if (err) {
                        console.error('Erreur lors de la suppression du fichier image:', err);
                    } else {
                        console.log('');
                    }
                });
            }
            
        }
        catch (error) {
            res.status(400).json({ error });
        }
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
};

// async function rateBook(req, res) {
//     const id = req.params.bookId;
//     const { userId, rating } = req.body;
//     if (userId !== req.auth.userId) {
//           return res.status(401).json({ message: 'Unauthorized access' });
//     }
//     try {
//           // Validate rating range
//           if (rating < 1 || rating > 5) {
//                 return res.status(400).json({
//                       message: 'Invalid rating. Rating must be between 1 and 5',
//                 });
//           }
//           // Find the book by its ID
//           const book = await Book.findById(id);
//           // Check if the book exists
//           if (!book) {
//                 return res.status(404).json({ message: 'Book not found' });
//           }
//           // Check if the user has already rated the book
//           const existingRating = book.ratings.find(
//                 (r) => r.userId === userId
//           );
//           if (existingRating) {
//                 return res.status(400).json({
//                       message: 'User has already rated this book',
//                 });
//           }
//           // Add the new rating to the book's ratings array
//           book.ratings.push({ userId, grade: rating });
//           // Calculate the new average rating
//           const totalRatings = book.ratings.length;
//           const sumGrades = book.ratings.reduce((acc, r) => acc + r.grade, 0);
//           book.averageRating = (sumGrades / totalRatings).toFixed(1);
//           // Save the updated book
//           const updatedBook = await book.save();

//           return res.status(200).json(updatedBook);
//     } catch (error) {
//           return res.status(500).json({ message: error.message });
//     }
// }
async function rateBook (req, res) {//POST noter un livre
    try {
        res.json({message : "post rate book réussie"})
    } catch {
        res.status(400).json({ error: error });
    }
};
// async function addNewBook (req, res) {//POST un livre
//     try {
//         res.json({message : "post add book réussie"})
//     } catch {
//         res.status(400).json({ error: error });
//     }
// };
// async function updateBook (req, res) {//POST un livre
//     try {        
//         res.json({message : "put update book réussie"})
//     } catch {
//         res.status(400).json({ error: error });
//     }
// };


module.exports = {
    getAllBooks,
    addNewBook,
    getOneBook,
    updateBook,
    bestRatedBooks,
    deleteBook,
    rateBook,    
};