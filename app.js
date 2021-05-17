// Importation de express / et body-parser / mongoose / path (donne axcés au chemin d'un systéme de fichier ?) / Helmet protége en configurant les en tête http de maniére appropriée
const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');
const helmet = require("helmet");
const session = require ('cookie-session');

// Importation du router
const saucesRoutes = require ('./routes/sauces');
const userRoutes = require('./routes/user');

// Variable environnement pour sécursé les informations de la DB
require ('dotenv').config();

// Connection à la base de donnée MangoDB
mongoose.connect('mongodb+srv://'+process.env.LOGIN+':'+process.env.PASSWORD+"@"+process.env.URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Rajout des header (sans route pour q'il soit appliqué a toute les requétes vers le serveur) 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');   
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Cookies en http-only
app.use(session ({
  secret : 's3Cur3',
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
  }
})
);

app.use(express.json());

// Multer, répondre aux requêtes envoyer à '/images/ et servir le dossier statique 'image'
app.use('/images', express.static(path.join(__dirname, 'images')));

// helmet
app.use(helmet());

// On enregistrer notre routeur pour toutes les demandes effectuées vers /api/sauces
app.use ('/api/sauces', saucesRoutes);
// Enregistrement route attendu par le frontend (auth => racine de tous ce qui est lié à l'authentification)
app.use('/api/auth', userRoutes);

// On exporte notre app pour pouvoir l'utiliser dans notre projet, notamment le serveur node
module.exports = app;