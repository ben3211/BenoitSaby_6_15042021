// Création du router
// Besoin de express
// Le controleur pour associé les fonctions au différentes routes
const express = require ('express');
const router = express.Router ();
const userCtrl = require ('../controllers/user');
const authLimiter = require ('../middleware/authLimiter')

const passwordVerification = require ('../middleware/passwordVerification');
const emailValidator = require ('../middleware/emailValidator');

// Création de deux routes signup et login, ainsi que les middlewares de sécurité
router.post('/signup', emailValidator, passwordVerification, userCtrl.signup);
router.post('/login', authLimiter, userCtrl.login);

// On exporte le router
module.exports = router;