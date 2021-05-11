// Besoin de express
const express = require('express');
// Création du router
const router = express.Router();
// Le controleur pour associé les fonctions au différentes routes
const userCtrl = require('../controllers/user');

// Création de deux routes signup et login, ainsi que les middlewares de sécurité
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// On exporte le router
module.exports = router;