// Mongoose
const mongoose = require ('mongoose');

// Mongoose schema
const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: { type: [String]},
  usersDisliked: { type: [String]} 
});

// Model exportation: arguments (name, schema)
module.exports = mongoose.model ('Sauces', saucesSchema);
