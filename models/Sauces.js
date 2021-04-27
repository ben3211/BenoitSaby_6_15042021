// Importer mongoose
const mongoose = require ('mongoose');

// schema mongoose, informations dont nos données auront besoins
const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: String, required: true },
  usersDisliked: { type: String, required: true },
});

const userSchema = mongoose.Schema ({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

// Exportation de modele : c'est une methode du package mongoose pour utiliser les schemas
module.exports = mongoose.model ('Sauces', saucesSchema);
module.exports = mongoose.model ('Usuer', userSchema);
