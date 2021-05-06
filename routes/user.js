// Besoin de express
const express = require('express');
// Création du router
const router = express.Router();
// Le controleur pour associé les fonctions au différentes routes
const userCtrl = require('../controllers/user');

// Création de deux routes/ routes POST car le frontend envoi l'adresse mail et le mots de passe
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// On exporte le router
module.exports = router;