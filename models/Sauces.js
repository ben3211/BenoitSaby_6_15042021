// Importer mongoose
const mongoose = require ('mongoose');

// schema mongoose, informations dont nos données auront besoins
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

// Exportation de modele : c'est une methode du package mongoose pour utiliser les schemas
module.exports = mongoose.model ('Sauces', saucesSchema);
