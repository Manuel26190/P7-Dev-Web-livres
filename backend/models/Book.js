const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const bookSchema = mongoose.Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
      title: { type: String, required: true ,unique: true},
      author: { type: String, required: true },
      imageUrl: { type: String, required: true },
      year: { type: Number, required: true, min: 0 },
      genre: { type: String, required: true },
      ratings: [
            {
                  userId: { type: ObjectId, ref: 'User', required: true },
                  grade: { type: Number, required: false, min: 0, max: 5 },
            },
      ],
      averageRating: { type: Number, required: true },    
});

module.exports = mongoose.model('Book', bookSchema);
