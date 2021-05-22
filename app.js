// Importation express / mongoose / path (access and interact with the file system) / Helmet (security)
const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');
const helmet = require("helmet");
const session = require ('cookie-session');

// Router importation 
const saucesRoutes = require ('./routes/sauces');
const userRoutes = require('./routes/user');

// Environment variables
require ('dotenv').config();

// MangoDB data base connexion
mongoose.connect('mongodb+srv://'+process.env.LOGIN+':'+process.env.PASSWORD+"@"+process.env.URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');   
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Cookies http-only
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

// Multer
app.use('/images', express.static(path.join(__dirname, 'images')));

// Helmet
app.use(helmet());

// Save sauces router
app.use ('/api/sauces', saucesRoutes);
// Save auth router
app.use('/api/auth', userRoutes);

// App exportation
module.exports = app;